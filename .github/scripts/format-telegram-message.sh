#!/bin/bash
set -e

if [ "$BUILD_RESULT" = "success" ]; then
  MSG="✅ Deploy succeed [link](${DEPLOY_URL})
  [View PR](${PR_URL})"
else
  MSG="❌ Deploy failed
  [View PR](${PR_URL})
  [View logs](${SERVER_URL}/${REPOSITORY}/actions/runs/${RUN_ID})"
fi

  echo "textMessage<<EOF" >> $GITHUB_OUTPUT
  echo "$MSG" >> $GITHUB_OUTPUT
  echo "EOF" >> $GITHUB_OUTPUT
