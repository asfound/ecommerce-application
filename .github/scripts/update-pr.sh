#!/bin/bash
set -e

CURRENT_BODY=$(curl -s \
 -H "Authorization: token ${GH_TOKEN}" \
 -H "Accept: application/vnd.github.v3+json" \
 "https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}" \
 | jq -r '.body // ""' \
 | sed '/### CI\/CD Status/,$d' \
 | sed -z 's/\n*$//')

curl -s -X PATCH \
 -H "Authorization: token ${GH_TOKEN}" \
 -H "Accept: application/vnd.github.v3+json" \
 "https://api.github.com/repos/${REPO}/pulls/${PR_NUMBER}" \
 -d "$(jq -n --arg body "${CURRENT_BODY}"$'\n\n'"${BODY_UPDATE}" '{body: $body}')"
