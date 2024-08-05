#!/bin/bash

# Define the files
version_file="VERSION"
release_notes_file="CHANGELOG.md"

# Read the version from the VERSION file
current_version=$(cat "$version_file")

# Extract the corresponding release content, excluding the URL and separator
awk -v version="Version ${current_version#V}" '
$0 ~ version {
    found=1;
    next;
}
found && /^Version [0-9]+\.[0-9]+\.[0-9]+$/ { exit }
found && !/^https:\/\/github.com\/.*$/ && !/^-+$/ {
    print
}
' "$release_notes_file"
