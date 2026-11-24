#!/usr/bin/env bash
# Owner-run only. Each value goes directly to the macOS clipboard, never stdout.
set -euo pipefail
keys_dir="${PETROCASH_KEYS_DIR:-$HOME/PetroCASH-keys}"
store="$keys_dir/petrocash-development.p12"
pass_file="$keys_dir/petrocash-keystore.txt"
test -f "$store" && test -f "$pass_file"
command -v pbcopy >/dev/null
copy_secret() {
  local name="$1"
  printf '\nType the secret NAME by hand in GitHub: %s\n' "$name"
  read -r -p 'Press Return only when the GitHub value field is ready: ' _
  case "$name" in
    PETROCASH_KEYSTORE_B64) base64 < "$store" | tr -d '\n' | pbcopy ;;
    PETROCASH_KEYSTORE_PASSWORD|PETROCASH_KEY_PASSWORD) tr -d '\r\n' < "$pass_file" | pbcopy ;;
    PETROCASH_KEY_ALIAS) printf '%s' 'petrocash-development' | pbcopy ;;
  esac
  printf 'Value copied. Paste and save it in GitHub; do not paste into chat.\n'
  read -r -p 'Press Return after saving, before copying the next value: ' _
}
for secret_name in PETROCASH_KEYSTORE_B64 PETROCASH_KEYSTORE_PASSWORD PETROCASH_KEY_ALIAS PETROCASH_KEY_PASSWORD; do
  copy_secret "$secret_name"
done
printf '\nClipboard will be cleared. These are development keys; create an owner-controlled production key before release.\n'
printf '' | pbcopy
