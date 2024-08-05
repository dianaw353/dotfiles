#!/bin/bash

# Read the version from the VERSION file and create the header
VERSION=$(sed 's/^V//' VERSION)
VERSION_HEADER="Version $VERSION"

# Define the path to the CHANGELOG.md file
CHANGELOG_FILE="CHANGELOG.md"

# Extract the website, owner, and repo from the first matching URL in the file
website=$(grep -Eo 'https?://[^/"]+' "$CHANGELOG_FILE" | head -n 1)
owner=$(grep -Eo 'https?://[^/]+/([^/]+)/' "$CHANGELOG_FILE" | sed 's|https\?://[^/]\+/||; s|/.*||' | head -n 1)
repo=$(grep -Eo 'https?://[^/]+/[^/]+/([^/]+)' "$CHANGELOG_FILE" | sed 's|https\?://[^/]\+/[^/]\+/||; s|/.*||' | head -n 1)

# Extract the content between the specified version and the next version
awk -v header="$VERSION_HEADER" -v website="$website" -v owner="$owner" -v repo="$repo" '
  BEGIN {found=0}
  $0 == header {found=1; next}
  /^Version/ && found {exit}
  found && !($0 ~ website "/" owner "/" repo "/releases/tag/V" && $0 ~ /[0-9]+\.[0-9]+/) && !/^-----/ {print}
' "$CHANGELOG_FILE"
