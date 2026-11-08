# Colibri Life / Colibri Atlas

This repository publishes the approved Stage 5 Colibri Atlas application at https://colibrilife.pro/.

## Product and domain boundaries

- Colibri Life / Colibri Atlas: https://colibrilife.pro/ (this repository).
- ColibriOS operating system and its independent checkout: https://colibrios.pro/ (a separate product and repository).
- Existing legacy ColibriOS routes remain archived here. The four root compatibility redirects target https://colibrios.pro/; they do not loop back to this host.
- Atlas account data, prices, entitlements, and checkout readiness remain independent. Atlas checkout remains fail-closed until every verified readiness flag is true.

## Production export

The root index.html, assets/, notices/, and service-worker.js come from the current app/dist production build in the Arcana Sanctum Mobile workspace. Preserve CNAME=colibrilife.pro and unrelated legacy files when synchronizing the export. Remove only obsolete hashed Vite JavaScript/CSS chunks absent from the fresh build.

The approved interface, themes, seven complete decks (546 front cards), four GLB talismans, and eight luxury gift concepts are preserved. Localization is unchanged except for the public Atlas host. The fresh production JavaScript uses Unicode escapes and contains no literal Cyrillic characters; unrelated historical legacy files are retained unchanged.

## Verification

- Shared tests, app tests, formatting, lint, and typechecks must pass before publication.
- status.json and healthz identify this host and the distinct ColibriOS destination.
- Verify the pushed main commit and successful GitHub Pages build, then read back https://colibrilife.pro/, status.json, and the production entry asset over HTTPS.
- The authoring workspace retains the production command, test evidence, asset-preservation fingerprints, and deployment receipt.
