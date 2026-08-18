# Zulu production deployment

This package preserves the approved Zulu website exactly and adapts it to the
existing source-build deployment contract.

## Build

```bash
npm run build
```

Publish the generated `out/` directory.

The build has no package dependencies. It copies the approved static production
site from `site/` into `out/` without transforming the website files.
