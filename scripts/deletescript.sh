#!/bin/bash

# Check if branch name is provided
if [ -z "$1" ]; then
  echo "Usage: ./deletescript.sh feature-branch-name"
  exit 1
fi

BRANCH=$1

# Switch to main and pull latest
echo "Switching to main branch and pulling latest..."
git checkout main
git pull origin main

# Delete the local branch
echo "Deleting local branch: $BRANCH"
git branch -d $BRANCH

# Delete the remote branch
echo "Deleting remote branch: $BRANCH"
git push origin --delete $BRANCH

echo "Branch '$BRANCH' has been deleted locally and remotely."
