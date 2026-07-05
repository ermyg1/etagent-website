# Deployment Troubleshooting

Use this guide to diagnose common E.T Agent Website deployment issues.

## 404 After Refreshing Page

Cause:
Missing `.htaccess`.

Resolution:
Upload `.htaccess`.

## Homepage Works but Routes Fail

Cause:
SPA routing missing.

Resolution:
Verify `.htaccess`.

## Blank Page

Cause:
Incorrect assets uploaded.

Resolution:
Upload the matching `assets/` folder from the same build.

## Old Version Still Showing

Cause:
Cache.

Resolution:
Clear Hostinger cache.

## Missing CSS

Cause:
Old `assets/` folder.

Resolution:
Delete old assets completely before uploading the new build.

## Broken JavaScript

Cause:
`index.html` references asset hashes that do not exist.

Resolution:
Always upload `index.html` and `assets/` together.
