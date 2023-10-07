#!/bin/bash
# Usage: ./generate_app_version.sh <version> 
# Example: ./generate_app_version.sh 1.0.0
# This script will generate the app_version.json file with the app version passed in the parameter 
# and get the git last commit id.

set -u
set -e
set -o pipefail

app_version=$1
git_commit_id=`git log --format="%H" -n 1`
branch_name=`git rev-parse --abbrev-ref HEAD`

echo "{\"app_version\": \"${app_version}\", \"git_commit_id\": \"${git_commit_id}\", \"branch_name\": \"${branch_name}\"}" > source/app_version.json