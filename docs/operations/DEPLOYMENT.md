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

Do not upload the repository root, source files, `src/`, `node_modules/`, or
configuration files to production hosting. Only the built deployment package is
uploaded.

## Deploying to Hostinger

1. Build production:

   ```sh
   npm run build
   ```

2. Open `dist/`.
3. Verify `dist/` contains:
   - `index.html`
   - `assets/`
   - `.htaccess`
4. Delete the old `assets/` folder from Hostinger.
5. Upload the new `assets/` folder.
6. Replace `index.html`.
7. Upload `.htaccess`.
8. Clear Hostinger Cache.
9. Verify these routes:
   - `/`
   - `/governance-model`
   - `/governance-demo`
   - `/trust`
10. Verify Desktop.
11. Verify Mobile.
12. Deployment complete.
