#!/bin/bash

#
# CONFIGURE THE $REPO VARIABLE TO MATCH YOUR GIT REPOSITORY
#
REPO="git@github.com:davidonlaptop/davidonlaptop.github.io.git"
#REPO="git@github.com:spencerlyon2/hugo_gh_blog.git"


echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Build the project.
hugo

# Add changes to git.
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
git subtree push --prefix=public $REPO gh-pages

