#!/usr/bin/env bash
# Private draft assets only. Never create a public release or upload credentials.
set -euo pipefail
: "${GH_TOKEN:?GitHub job token is required}"
: "${GH_REPO:?Repository is required}"
: "${GITHUB_SHA:?Source SHA is required}"
: "${GITHUB_RUN_ID:?Run ID is required}"
source_commit="$(git rev-parse HEAD)"
if [ "$source_commit" != "$GITHUB_SHA" ]; then
  echo 'Refusing mismatched build/workflow commit; use a push that builds its own SHA.' >&2
  exit 2
fi
delivery_dir="${1:-build/petrocash}"
draft_tag="study-${GITHUB_RUN_ID}-${GITHUB_SHA:0:12}"
draft_label="$(node -p 'const b = require("./brand/brand.config.json"); `${b.name} ${b.versionName} TEST - study build`')"
mkdir -p build/petro
if gh release view "$draft_tag" --json isDraft --jq .isDraft > build/petro/draft-state.txt 2>/dev/null; then
  if [ "$(cat build/petro/draft-state.txt)" != true ]; then
    echo 'Refusing to modify a published release.' >&2
    exit 1
  fi
else
  gh release create "$draft_tag" --draft --target "$GITHUB_SHA" --title "$draft_label" --notes-file MORNING-REPORT.md
fi
if [ "$(gh release view "$draft_tag" --json targetCommitish --jq .targetCommitish)" != "$GITHUB_SHA" ]; then
  echo 'Refusing a draft whose target does not match the built source.' >&2
  exit 2
fi
files=()
for candidate in "$delivery_dir"/*; do
  if [ -f "$candidate" ]; then files+=("$candidate"); fi
done
if [ "${#files[@]}" -eq 0 ]; then
  echo 'No delivery files; refusing an empty upload.' >&2
  exit 1
fi
gh release upload "$draft_tag" "${files[@]}" --clobber
gh release view "$draft_tag" --json url --jq .url > build/petro/draft-url.txt
echo 'Verified delivery uploaded to an unpublished draft; no public Actions APK/AAB artifact.'
