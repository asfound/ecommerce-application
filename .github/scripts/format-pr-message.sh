#!/bin/bash
set -e

LINT_ICON=$( [ "$LINT_RESULT" = "success" ] && echo "✅" || echo "❌" )
FORMAT_ICON=$( [ "$FORMAT_RESULT" = "success" ] && echo "✅" || echo "❌" )
TEST_ICON=$( [ "$TEST_RESULT" = "success" ] && echo "✅" || echo "❌" )
BUILD_ICON=$( [ "$BUILD_RESULT" = "success" ] && echo "✅" || echo "❌" )

DEPLOY_LINE=$([ "$BUILD_RESULT" = "success" ] && echo "🚀 [Deploy preview](${DEPLOY_URL})" || echo "")

COVERAGE_PERCENT=$(echo "$TEST_COVERAGE" | grep -o '[0-9]\+')

TEST_LINE=$(
  if [ "$TEST_RESULT" = "success" ]; then
    if [ "$COVERAGE_PERCENT" -lt 30 ]; then
      echo -e "${TEST_COVERAGE}\n${COVERAGE_TABLE}"
    else
      echo "$TEST_COVERAGE"
    fi
  else
    echo ""
  fi
)


SUMMARY="### CI/CD Status
- ${LINT_ICON} Linter
- ${FORMAT_ICON} Formatter
- ${TEST_ICON} Tests
- ${BUILD_ICON} Build

${DEPLOY_LINE}
${TEST_LINE}
"

echo "prMessage<<EOF" >> $GITHUB_OUTPUT
echo "$SUMMARY" >> $GITHUB_OUTPUT
echo "EOF" >> $GITHUB_OUTPUT
