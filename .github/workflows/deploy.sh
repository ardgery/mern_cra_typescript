#!/bin/bash
set -e
user="ubuntu"

rm -rf .git
rm -rf .gitignore
git config --global user.email "ardinegery@gmail.com"
git config --global user.name "ardgery"
mv .gitignore_cicd .gitignore
git init .
git add .
git commit -m "Deploying"
git remote add production ssh://$user@$AWS_HOST/~/ardgery/mern_cra_typescript
git push --force production master