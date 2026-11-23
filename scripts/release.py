"""Generate and verify provenance for the public files in a Vite production build."""

import argparse
import hashlib
import json
import re
import sys
import time
from html.parser import HTMLParser
from http.client import HTTPException
from pathlib import Path
from urllib.parse import quote
from urllib.request import HTTPRedirectHandler, build_opener

ORIGIN = "https://etagent.io"
MANIFEST = "/release-manifest.json"

# Unexpected files must stop generation because rsync uploads the entire build.
PUBLIC_SUFFIXES = frozenset("""
    .html .css .js .mjs .json .webmanifest .txt .xml .wasm
    .avif .bmp .gif .ico .jpeg .jpg .png .svg .webp
    .eot .otf .ttf .woff .woff2 .mp3 .mp4 .ogg .webm .pdf
""".split())
DEVELOPMENT_DIRS = {"src", "node_modules", "scripts", "tests", "__pycache__"}


class EntryAssets(HTMLParser):
    """Collect same-origin bundle references from the generated root page."""

    def __init__(self):
        super().__init__()
        self.paths = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        rel = (attrs.get("rel") or "").lower().split()
        if tag == "base":
            raise ValueError("Unsupported base URL in built HTML")
        if tag == "script" and "src" in attrs:
            path = attrs["src"]
        elif tag == "link" and (
            "stylesheet" in rel or "modulepreload" in rel
            or ("preload" in rel and attrs.get("as") in ("script", "style"))
        ):
            path = attrs.get("href")
        else:
            return
        if not re.fullmatch(r"/assets/(?:[\w-]+/)*[\w.-]+\.(?:m?js|css)", path or "", re.ASCII):
            raise ValueError("Unexpected bundle reference in built HTML")
        self.paths.add(path)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def build_manifest(directory, commit):
    if not re.fullmatch("[0-9a-f]{40}", commit):
        raise ValueError("Expected a complete Git commit SHA")
    html = (directory / "index.html").read_bytes()
    assets = EntryAssets()
    assets.feed(html.decode("utf-8"))
    assets.close()
    if not (any(p.endswith((".js", ".mjs")) for p in assets.paths)
            and any(p.endswith(".css") for p in assets.paths)):
        raise ValueError("Expected JavaScript and CSS references in built HTML")
    files = {}
    for item in sorted(directory.rglob("*"), key=lambda p: p.as_posix()):
        relative = item.relative_to(directory)
        path = "/" + relative.as_posix()
        if item.is_symlink():
            raise ValueError(f"Unexpected symbolic link in build: {path}")
        if path in (MANIFEST, "/.htaccess"):
            if not item.is_file():
                raise ValueError(f"Expected a regular file: {path}")
            continue
        if any(part.startswith(".") or part in DEVELOPMENT_DIRS for part in relative.parts):
            raise ValueError(f"Unexpected development path in build: {path}")
        if item.is_dir():
            continue
        if not item.is_file() or item.suffix.lower() not in PUBLIC_SUFFIXES:
            raise ValueError(f"Unexpected file in build: {path}")
        files[path] = digest(item.read_bytes())
    for path in sorted(assets.paths - files.keys()):
        raise FileNotFoundError(f"Missing entry bundle: {path}")
    return {"commit": commit, "sha256": files}


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


def fetch_public(path):
    with build_opener(NoRedirect()).open(ORIGIN + quote(path), timeout=10) as response:
        if response.status != 200:
            raise ValueError(f"HTTP {response.status}")
        return response.read()


def verify(manifest, encoded, fetch=fetch_public, attempts=8, delay=15):
    expected = {"/": manifest["sha256"]["/index.html"],
                **manifest["sha256"]}
    for attempt in range(1, attempts + 1):
        for path in (MANIFEST, *expected):
            try:
                data = fetch(path)
                if path == MANIFEST:
                    if data != encoded:
                        raise ValueError("Manifest bytes differ")
                elif digest(data) != expected[path]:
                    raise ValueError("SHA-256 mismatch")
            except (ValueError, OSError, HTTPException) as error:
                message = f"Attempt {attempt}/{attempts}, {path}: {error}"
                if attempt == attempts:
                    raise RuntimeError(message) from error
                print(message, file=sys.stderr, flush=True)
                time.sleep(delay)
                break
        else:
            return


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mode", choices=["generate", "verify"])
    parser.add_argument("commit")
    parser.add_argument("--directory", type=Path, default=Path("dist"))
    args = parser.parse_args()
    manifest = build_manifest(args.directory, args.commit)
    encoded = (json.dumps(manifest, indent=2) + "\n").encode()
    if args.mode == "generate":
        (args.directory / MANIFEST[1:]).write_bytes(encoded)
    else:
        verify(manifest, encoded)
        print(f"Verified public release {args.commit}")


if __name__ == "__main__":
    main()
