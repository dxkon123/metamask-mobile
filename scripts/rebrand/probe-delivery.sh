#!/usr/bin/env bash
# No service secrets, wallet data, APK or app dependencies in this capability test.
set -euo pipefail
: "${GH_TOKEN:?Job token is required}"
: "${GH_REPO:?Repository is required}"
: "${GITHUB_SHA:?Commit is required}"
: "${GITHUB_RUN_ID:?Run is required}"
probe_tag="petrocash-delivery-probe-${GITHUB_RUN_ID}-${GITHUB_RUN_ATTEMPT:-1}"
mkdir -p build/delivery-probe
printf 'PetroCASH delivery channel test; contains no wallet data.\n' > build/delivery-probe/probe.txt
sha256sum build/delivery-probe/probe.txt > build/delivery-probe/SHA256SUMS.txt
cleanup() {
  # Unique per-run name, and only an unpublished draft may ever be removed.
  if [ "$(gh release view "$probe_tag" --json isDraft --jq .isDraft 2>/dev/null)" = true ]; then
    gh release delete "$probe_tag" --yes
  fi
}
trap cleanup EXIT
gh release create "$probe_tag" --draft --target "$GITHUB_SHA" \
  --title 'PetroCASH temporary delivery probe' \
  --notes 'Temporary harmless-file upload test. This draft is removed by this run.'
test "$(gh release view "$probe_tag" --json isDraft --jq .isDraft)" = true
gh release upload "$probe_tag" build/delivery-probe/probe.txt
mkdir -p build/probe-download
gh release download "$probe_tag" --pattern probe.txt --dir build/probe-download
cmp build/delivery-probe/probe.txt build/probe-download/probe.txt
printf 'Draft upload and byte-for-byte download verified.\n' > build/delivery-probe/draft-result.txt
cleanup
trap - EXIT
