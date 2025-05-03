#!/bin/bash
set -e

if [ "$BUILD_RESULT" = "success" ]; then
  MSG="✅ Deploy succeed [link](${DEPLOY_URL})
  message: ${PR_TITLE}"
else
  MSG="❌ Deploy failed
  [PR **${PR_TITLE}**](${PR_URL})
  [View logs](${SERVER_URL}/${REPOSITORY}/actions/runs/${RUN_ID})"
fi

  echo "textMessage<<EOF" >> $GITHUB_OUTPUT
  echo "$MSG" >> $GITHUB_OUTPUT
  echo "EOF" >> $GITHUB_OUTPUT
