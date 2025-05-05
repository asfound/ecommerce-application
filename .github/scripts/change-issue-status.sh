#!/bin/bash
set -e

ISSUE_ID=$(echo "$BRANCH_NAME" | cut -d/ -f2 | grep -oE 'RSS-ECOMM-[0-9_]+')

echo "Looking for issue with ID: $ISSUE_ID"

ISSUE_NUMBER=$(gh issue list --search "$ISSUE_ID" --repo "$REPO" --json number,title -q '.[0].number')

if [ -z "$ISSUE_NUMBER" ]; then
  echo "Issue not found for ID: $ISSUE_ID"
  exit 1
fi

echo "Found issue number: $ISSUE_NUMBER"

echo "issueNumber=$ISSUE_NUMBER" >> "$GITHUB_OUTPUT"

ISSUE_ITEM_ID=$(curl -s -H "Authorization: Bearer $GH_PAT_PROJECT" \
     -H "Content-Type: application/json" \
     -X POST https://api.github.com/graphql \
     -d "{
  \"query\": \"query { repository(owner: \\\"asfound\\\", name: \\\"ecommerce-application\\\") { issue(number: ${ISSUE_NUMBER}) { title projectItems(first: 10) { nodes { id project { id title } } } } } }\"
}" | jq -r '.data.repository.issue.projectItems.nodes[0].id')

echo "Found issue item ID: $ISSUE_ITEM_ID"

curl -H "Authorization: Bearer $GH_PAT_PROJECT" \
     -H "Content-Type: application/json" \
     -X POST https://api.github.com/graphql \
     -d @- <<EOF
{
  "query": "mutation {
    updateProjectV2ItemFieldValue(
      input: {
        projectId: \"${PROJECT_ID}\",
        itemId: \"${ISSUE_ITEM_ID}\",
        fieldId: \"${STATUS_FIELD_ID}\",
        value: { singleSelectOptionId: \"${STATUS_ID_IN_REVIEW}\" }
      }
    ) { projectV2Item { id } }
  }"
}
EOF
