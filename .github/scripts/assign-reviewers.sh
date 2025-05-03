#!/bin/bash
set -e

github_list=()
readonly PAIR_SEPARATOR='='
readonly GITHUB_SEPARATOR=','

decoded_json=$(echo "$GITHUB_REVIEWERS_MAP" | base64 --decode)


while IFS="${PAIR_SEPARATOR}" read -r github_username _; do
  if [[ "$GITHUB_ACTOR" != "$github_username" ]]; then
    github_list+=("\"$github_username\"")
  fi
done < <(echo "$decoded_json" | jq -r 'to_entries[] | "\(.key)=\(.value)"')

github_json="$(IFS="${GITHUB_SEPARATOR}"; echo "[${github_list[*]}]")"

echo "github_reviewers=${github_json}" >> "$GITHUB_OUTPUT"

