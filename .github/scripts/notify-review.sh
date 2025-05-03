#!/bin/bash
set -e

readonly PAIR_SEPARATOR='='

decoded_json=$(echo "$GITHUB_REVIEWERS_MAP" | base64 --decode)
telegram_username=''

while IFS="${PAIR_SEPARATOR}" read -r github_username telegram; do
  if [[ "${LOGIN_INPUT}" == "${github_username}" ]]; then
    telegram_username="${telegram}"
    break
  fi
done < <(echo "${decoded_json}" | jq -r 'to_entries[] | "\(.key)=\(.value)"')

echo "telegram_username=${telegram_username}" >> "$GITHUB_OUTPUT"
