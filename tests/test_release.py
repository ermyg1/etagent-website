import hashlib
import json
import subprocess
import sys
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import Mock
from urllib.error import HTTPError

from scripts import release


class ReleaseTests(unittest.TestCase):
    def setUp(self):
        temp = TemporaryDirectory()
        self.addCleanup(temp.cleanup)
        self.root = Path(temp.name)
        self.commit = "ab" * 20
        self.html = b"""<script type="module" src="/assets/app.js"></script>
            <link href="/assets/app.css" rel="stylesheet">
            <link rel="modulepreload" href="/assets/dep.js">
            <link rel="icon" href="/logo.jpg">"""
        self.web = {"/index.html": self.html, "/assets/app.js": b"app",
                    "/assets/dep.js": b"dep", "/assets/app.css": b"css",
                    "/assets/lazy.js": b"lazy", "/logo.jpg": b"image",
                    "/assets/fonts/body.woff2": b"font", "/robots.txt": b"robots",
                    "/sitemap.xml": b"sitemap"}
        (self.root / "assets/fonts").mkdir(parents=True)
        (self.root / "empty.png").mkdir()
        (self.root / ".htaccess").write_bytes(b"server config")
        for path, data in self.web.items():
            (self.root / path[1:]).write_bytes(data)
        self.manifest = release.build_manifest(self.root, self.commit)
        self.encoded = (json.dumps(self.manifest, indent=2) + "\n").encode()
        self.web.update({"/": self.html, release.MANIFEST: self.encoded})

    def test_generated_file_records_all_public_files_in_stable_order(self):
        command = [sys.executable, "scripts/release.py", "generate", self.commit,
                   "--directory", str(self.root)]
        for _ in range(2):
            subprocess.run(command, check=True)
            data = (self.root / release.MANIFEST[1:]).read_bytes()
            hashes = {p: hashlib.sha256(b).hexdigest() for p, b in self.web.items()
                      if p not in ("/", release.MANIFEST)}
            self.assertEqual(json.loads(data), {"commit": self.commit, "sha256": hashes})
            self.assertEqual(list(json.loads(data)["sha256"]), sorted(hashes))
            self.assertEqual(data, self.encoded)
            # Recreate a file to vary directory enumeration order on the second run.
            logo = self.root / "logo.jpg"
            logo.unlink()
            logo.write_bytes(self.web["/logo.jpg"])

    def test_incomplete_or_unsafe_build(self):
        with self.assertRaises(ValueError):
            release.build_manifest(self.root, "abc123")
        for html in (b"", self.html.replace(b"/assets/app.js", b"https://other/app.js"),
                     self.html.replace(b"/assets/app.css", b"/assets/../app.css")):
            (self.root / "index.html").write_bytes(html)
            with self.assertRaises(ValueError):
                release.build_manifest(self.root, self.commit)
        (self.root / "index.html").write_bytes(self.html)
        (self.root / "assets/app.css").unlink()
        with self.assertRaises(FileNotFoundError):
            release.build_manifest(self.root, self.commit)

    def test_every_public_file_must_match_in_one_pass(self):
        for path in self.web:
            with self.subTest(path=path):
                responses = dict(self.web)
                responses[path] = b"stale or fallback"
                with self.assertRaisesRegex(RuntimeError, "Manifest bytes differ|SHA-256 mismatch"):
                    release.verify(self.manifest, self.encoded, responses.__getitem__, 2, 0)

    def test_missing_public_image_and_font(self):
        for missing in ("/logo.jpg", "/assets/fonts/body.woff2"):
            def fetch(path):
                if path == missing:
                    raise HTTPError(path, 404, "missing", {}, None)
                return self.web[path]

            with self.subTest(missing=missing), self.assertRaisesRegex(RuntimeError, missing):
                release.verify(self.manifest, self.encoded, fetch, 1, 0)

    def test_unexpected_development_files_block_generation(self):
        for name in (".env", "assets/app.js.map", "src/config.json"):
            item = self.root / name
            item.parent.mkdir(exist_ok=True)
            item.touch()
            with self.subTest(name=name), self.assertRaises(ValueError):
                release.build_manifest(self.root, self.commit)
            item.unlink()
            if name.startswith("src/"):
                item.parent.rmdir()

    def test_symlinks_block_generation(self):
        (self.root / "linked.jpg").symlink_to(self.root / "logo.jpg")
        with self.assertRaisesRegex(ValueError, "symbolic link"):
            release.build_manifest(self.root, self.commit)

    def test_rechecks_manifest_after_stale_asset(self):
        paths = []

        def fetch(path):
            paths.append(path)
            if path == "/assets/dep.js" and paths.count(path) == 1:
                return b"old"
            return self.web[path]

        release.verify(self.manifest, self.encoded, fetch, 2, 0)
        self.assertEqual(paths.count(release.MANIFEST), 2)
        self.assertEqual(set(paths), set(self.web))

    def test_http_failures_and_timeouts_exhaust_retries(self):
        for error in (TimeoutError(), HTTPError("url", 302, "redirect", {}, None),
                      HTTPError("url", 404, "missing", {}, None)):
            fetch = Mock(side_effect=error)
            with self.assertRaises(RuntimeError):
                release.verify(self.manifest, self.encoded, fetch, 2, 0)
            self.assertEqual(fetch.call_count, 2)
