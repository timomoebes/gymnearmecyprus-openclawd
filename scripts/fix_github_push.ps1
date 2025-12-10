# Script to fix GitHub push issues
Write-Host "=== Checking Git Configuration ===" -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "ERROR: Not in a git repository!" -ForegroundColor Red
    exit 1
}

# Check remote configuration
Write-Host "`n=== Remote Configuration ===" -ForegroundColor Cyan
git remote -v

# Check current branch
Write-Host "`n=== Current Branch ===" -ForegroundColor Cyan
git branch --show-current

# Check for uncommitted changes
Write-Host "`n=== Uncommitted Changes ===" -ForegroundColor Cyan
$modified = git diff --name-only
$staged = git diff --cached --name-only

if ($modified) {
    Write-Host "Modified files:" -ForegroundColor Yellow
    $modified | ForEach-Object { Write-Host "  $_" }
}

if ($staged) {
    Write-Host "Staged files:" -ForegroundColor Yellow
    $staged | ForEach-Object { Write-Host "  $_" }
}

if (-not $modified -and -not $staged) {
    Write-Host "No uncommitted changes" -ForegroundColor Green
}

# Check for unpushed commits
Write-Host "`n=== Unpushed Commits ===" -ForegroundColor Cyan
$unpushed = git log origin/main..HEAD --oneline
if ($unpushed) {
    Write-Host "Commits not pushed:" -ForegroundColor Yellow
    $unpushed | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "All commits are pushed" -ForegroundColor Green
}

# Set remote URL
Write-Host "`n=== Setting Remote URL ===" -ForegroundColor Cyan
git remote set-url origin https://github.com/timomoebes/gymnearmecyprus.git
Write-Host "Remote URL set to: https://github.com/timomoebes/gymnearmecyprus.git" -ForegroundColor Green

# Stage all changes
Write-Host "`n=== Staging All Changes ===" -ForegroundColor Cyan
git add -A
$stagedAfter = git diff --cached --name-only
if ($stagedAfter) {
    Write-Host "Staged files:" -ForegroundColor Yellow
    $stagedAfter | ForEach-Object { Write-Host "  $_" }
} else {
    Write-Host "No changes to stage" -ForegroundColor Green
}

# Commit if there are staged changes
if ($stagedAfter) {
    Write-Host "`n=== Committing Changes ===" -ForegroundColor Cyan
    $commitMessage = "feat: Update gym data, fix specialty filtering, add slug redirects, and improve opening hours display"
    git commit -m $commitMessage
    Write-Host "Changes committed" -ForegroundColor Green
}

# Push to GitHub
Write-Host "`n=== Pushing to GitHub ===" -ForegroundColor Cyan
Write-Host "Attempting to push to origin/main..." -ForegroundColor Yellow

try {
    git push origin main
    Write-Host "`nSUCCESS: Changes pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "`nERROR: Push failed. You may need to:" -ForegroundColor Red
    Write-Host "1. Set up a personal access token" -ForegroundColor Yellow
    Write-Host "2. Use: git remote set-url origin https://YOUR_TOKEN@github.com/timomoebes/gymnearmecyprus.git" -ForegroundColor Yellow
    Write-Host "3. Or configure Git Credential Manager" -ForegroundColor Yellow
}

Write-Host "`n=== Done ===" -ForegroundColor Cyan


