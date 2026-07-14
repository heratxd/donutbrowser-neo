$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
  throw "Run this script from the root of an existing Git clone."
}

$origin = "https://github.com/paracosm17/donutbrowser-neo.git"
$upstream = "https://github.com/zhom/donutbrowser.git"

$remotes = git remote
if ($remotes -contains "origin") {
  git remote set-url origin $origin
} else {
  git remote add origin $origin
}

if ($remotes -contains "upstream") {
  git remote set-url upstream $upstream
} else {
  git remote add upstream $upstream
}

git config rerere.enabled true
git remote -v
Write-Host "Configured origin, upstream, and repository-local rerere." -ForegroundColor Green
