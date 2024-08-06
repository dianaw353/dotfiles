#!/bin/bash

# Read the current version from the VERSION file and create the header
VERSION=$(sed 's/^V//' VERSION)
VERSION_HEADER="Version $VERSION"

# Define the path to the CHANGELOG.md file
CHANGELOG_FILE="CHANGELOG.md"

# Get the remote origin URL from git
REMOTE_URL=$(git config --get remote.origin.url)

# Parse the website, owner, and repo from the remote URL
website=$(echo "$REMOTE_URL" | sed -n 's|.*\(https://[^/]*\).*|\1|p')
owner=$(echo "$REMOTE_URL" | sed -n 's|.*/\([^/]*\)/[^/]*\.git$|\1|p')
repo=$(echo "$REMOTE_URL" | sed -n 's|.*/[^/]*/\([^/]*\)\.git$|\1|p')

# Find the previous version by looking for the first version header that comes before the current version header
PREV_VERSION=$(awk -v header="$VERSION_HEADER" '
  BEGIN {found=0}
  $0 == header {found=1; next}
  /^Version/ && found {print; exit}
' "$CHANGELOG_FILE" | sed 's/^Version //')

# Extract the content between the specified version and the next version, excluding the release URL and dashes
awk -v header="$VERSION_HEADER" -v website="$website" -v owner="$owner" -v repo="$repo" '
  BEGIN {found=0}
  $0 == header {found=1; next}
  /^Version/ && found {exit}
  found && !($0 ~ website "/" owner "/" repo "/releases/tag/V" && $0 ~ /[0-9]+\.[0-9]+/) && !/^-----/ {print}
' "$CHANGELOG_FILE"

# Add the "Full Changelog" line comparing the previous version with the current one only if a previous version exists
if [[ -n "$PREV_VERSION" ]]; then
  echo "**Full Changelog**: $website/$owner/$repo/compare/V$PREV_VERSION...V$VERSION"
fi
