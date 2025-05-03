#!/bin/bash
set -e

summary_file="coverage/coverage-summary.json"
coverage_file="coverage/coverage-final.json"
coverage_threshold=80


coverage_table="| File | Lines | Covered | Uncovered Lines | Coverage |
|------|-------|---------|----------------|----------|"

while IFS= read -r line; do
  coverage_table+=$'\n'"$line"
done < <(jq -r --argjson threshold "$coverage_threshold" '
  to_entries[] |
  . as $root |
  (.value.s | to_entries) as $statements |
  {
    file: (.key | capture(".*/src/(?<path>.*)").path),
    total: ($statements | length),
    covered: ($statements | map(select(.value > 0)) | length),
    uncovered_lines: ($statements | map(select(.value == 0)) | map($root.value.statementMap[.key].start.line) | sort | unique)
  } |
  . as $data |
  ($data.uncovered_lines | length) as $len |
  if $len == 0 then
    . * {"uncovered": ""}
  elif $len == 1 then
    . * {"uncovered": ($data.uncovered_lines[0] | tostring)}
  else
    . * {"uncovered": "\($data.uncovered_lines[0])-\($data.uncovered_lines[-1])"}
  end |
  . * {"coverage": (($data.covered / $data.total * 100) | floor)} |
  select(.coverage < $threshold) |
  "| \(.file) | \(.total) | \(.covered) | \(.uncovered) | \(.coverage)% |"
' "$coverage_file")

total_coverage=$(jq -r '.total.lines.pct' "$summary_file")

echo "coverage=📄 **Test Coverage**: ${total_coverage}%" >> "$GITHUB_OUTPUT"
echo "coverage_table<<EOF" >> "$GITHUB_OUTPUT"
echo "$coverage_table" >> "$GITHUB_OUTPUT"
echo "EOF" >> "$GITHUB_OUTPUT"

