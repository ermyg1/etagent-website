# Deployment

This is the authoritative deployment guide for the E.T Agent Website.

## Local Development

Install dependencies:

```sh
npm install
```

Start the local development server:

```sh
npm run dev
```

Run lint checks:

```sh
npm run lint
```

Build the production package:

```sh
npm run build
```

## Production Deployment

Production deployments use the generated contents of `dist/`.

Every production deployment requires `dist/` to include:

- `index.html`
- `assets/`
- `.htaccess`
- `release-manifest.json`

Do not upload the repository root, source files, `src/`, `node_modules/`, or
configuration files to production hosting. Only the built deployment package is
uploaded.

## Deploying to Hostinger

Use the manual **Deploy Production** workflow on `main`. Its default
verification-only mode checks SSH and the target directory. Selecting
`verification_only=false` builds and uploads the site. The workflow reports
success after rsync uploads the build, SSH confirms the remote index exists,
and one verification pass matches the public manifest byte for byte, the homepage,
and every public build file against the local build. This includes lazy-loaded
bundles, images, bundled fonts, robots.txt and sitemap.xml. The manifest lists
paths in sorted order and omits itself. The server configuration file
`.htaccess` is uploaded but excluded from public checks. Unexpected file types,
development paths and symbolic links stop manifest generation before upload.

**A post-upload verification failure does not automatically roll back production.**
The uploaded files may already be serving traffic. Use the deployment summary to
identify which check failed, then inspect the reported path, hosting target and CDN
before deciding whether an authorised retry or recovery is needed.

For an authorised manual upload, start with a clean checkout of the approved
`main` commit and a fresh build directory.

1. Build production and generate the manifest:

   ```sh
   npm ci
   npm run build
   python3 scripts/release.py generate "$(git rev-parse HEAD)"
   ```

2. Open `dist/`.
3. Verify `dist/` contains:
   - `index.html`
   - `assets/`
   - `.htaccess`
   - `release-manifest.json`
4. Delete the old `assets/` folder from Hostinger.
5. Upload the new `assets/` folder.
6. Replace `index.html`.
7. Upload all remaining files and directories from the build, including `robots.txt`,
   `sitemap.xml`, `.htaccess` and `release-manifest.json`, preserving their paths.
8. Clear Hostinger Cache.
9. From the same checkout and build, run
   `python3 scripts/release.py verify "$(git rev-parse HEAD)"`. Resolve any
   verification failure before declaring the release complete. Verify these routes:
   - `/`
   - `/governance-model`
   - `/governance-demo`
   - `/trust`
10. Verify Desktop.
11. Verify Mobile.
12. Deployment complete.
