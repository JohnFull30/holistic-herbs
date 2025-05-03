#!/bin/bash

# Check for correct usage
if [ -z "$1" ]; then
  echo "Usage: ./branchscript.sh feature-branch-name"
  exit 1
fi

# Define the feature branch name
FEATURE_BRANCH=$1

# Switch to main and update
echo "Switching to main branch and pulling latest changes..."
git checkout main
git pull origin main

# Create new feature branch and switch to it
echo "Creating and switching to new branch: $FEATURE_BRANCH"
git checkout -b $FEATURE_BRANCH

# Confirm
if [ $? -eq 0 ]; then
  echo "Branch '$FEATURE_BRANCH' created and ready for development."
else
  echo "Failed to create branch."
fi
