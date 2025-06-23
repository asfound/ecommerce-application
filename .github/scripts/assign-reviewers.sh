#!/bin/bash
set -e

github_list=()
telegram_list=()
readonly PAIR_SEPARATOR='='
readonly GITHUB_SEPARATOR=','
readonly TELEGRAM_SEPARATOR=' '

decoded_json=$(echo "$GITHUB_REVIEWERS_MAP" | base64 --decode)


while IFS="${PAIR_SEPARATOR}" read -r github_username telegram_username; do
  if [[ "$GITHUB_ACTOR" != "$github_username" ]]; then
    github_list+=("\"$github_username\"")
    telegram_list+=("${telegram_username}")
  fi
done < <(echo "$decoded_json" | jq -r 'to_entries[] | "\(.key)=\(.value)"')

github_json="$(IFS="${GITHUB_SEPARATOR}"; echo "[${github_list[*]}]")"
telegram_string="$(IFS="${TELEGRAM_SEPARATOR}"; echo "${telegram_list[*]}")"

echo "github_reviewers=${github_json}" >> "$GITHUB_OUTPUT"
echo "telegram_reviewers=${telegram_string}" >> "$GITHUB_OUTPUT"
