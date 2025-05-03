#!/bin/bash
set -e

escape_md2() {
  sed -E 's/([_*\[\]\(\)~`>#+=|{}\.\!\-])/\\\1/g' <<< "$1"
}

SAFE_MESSAGE=$(escape_md2 "${MESSAGE}")

curl -s -X POST https://api.telegram.org/bot"${TG_BOT_TOKEN}"/sendMessage \
  -d chat_id="${TG_CHAT_ID}" \
  -d text="${SAFE_MESSAGE}" \
  -d parse_mode="MarkdownV2"
