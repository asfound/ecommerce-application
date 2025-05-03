#!/bin/bash
set -e

echo "${MESSAGE}"

curl -s -X POST https://api.telegram.org/bot"${TG_BOT_TOKEN}"/sendMessage \
  -d chat_id="${TG_CHAT_ID}" \
  -d text="${MESSAGE}" \
  -d parse_mode="MarkdownV2"
