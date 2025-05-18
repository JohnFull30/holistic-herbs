#!/usr/bin/env bash

# scripts/choose-script.sh

# 1️⃣ Ensure we’re in a Git repo
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
  echo "🚫 You are not inside a Git repository. Aborting."
  exit 1
fi

echo "📍 Detected Git project: $(basename "$(git rev-parse --show-toplevel)")"
echo ""
echo "What would you like to do?"
echo "1) 🚀 Deploy Project"
echo "2) 🌱 Create New Branch"
echo "3) 🗑️ Delete Branch"
echo "4) ❌ Cancel"
echo ""

read -rp "Choose an option [1-4]: " choice
case $choice in
  1)
    bash "$(dirname "$0")/deploy.sh"
    ;;
  2)
    read -rp "Enter new branch name: " branch
    bash "$(dirname "$0")/branchscript.sh" "$branch"
    ;;
  3)
    read -rp "Enter branch name to delete: " branch
    bash "$(dirname "$0")/deletescript.sh" "$branch"
    ;;
  4)
    echo "❌ Cancelled."
    ;;
  *)
    echo "⚠️ Invalid choice."
    ;;
esac
