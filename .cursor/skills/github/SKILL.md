---
name: github
description: Work with GitHub repositories, pull requests, issues, and commits using GitHub CLI (gh) and git commands. Use when the user shares GitHub URLs, asks about PRs/issues, wants to review code changes, or needs to interact with GitHub repositories.
---

# GitHub

This skill guides effective use of GitHub-aware tools to interact with repositories, pull requests, issues, and commits.

## When to Use GitHub Tools

Use GitHub tools (via `Shell` with `gh` and `git` commands) when:

- The user shares a **GitHub URL**:
  - Repository: `https://github.com/owner/repo`
  - Pull Request: `https://github.com/owner/repo/pull/123`
  - Issue: `https://github.com/owner/repo/issues/456`
  - Commit: `https://github.com/owner/repo/commit/abcdef`
- The user asks about:
  - "Review this PR" or "Summarize these changes"
  - "List open issues" or "Check CI status"
  - "What changed between commits?"
  - "Create a PR" or "Create an issue"
- The task involves the **local repository** that corresponds to a GitHub remote.

**Prefer GitHub tools over `WebFetch`** for GitHub URLs because:
- `gh` provides structured JSON output.
- `git` gives access to full commit history and diffs.
- Better integration with local repository state.

**Fall back to `WebFetch`** only when:
- `gh` CLI is not available or not authenticated.
- You only need to read a simple README or file.
- The GitHub URL is from a different repository than the local one.

## GitHub CLI (gh) Commands

All `gh` commands are executed via the `Shell` tool. Do **not** include `sudo` or interactive flags.

### Repository Information

**View repository details:**
```bash
gh repo view --json description,homepageUrl,license,defaultBranch
```

**View repository in browser:**
```bash
gh repo view --web
```
(Note: This opens the browser; mention this to the user)

**Clone a repository:**
```bash
gh repo clone owner/repo
```

### Pull Requests

**View PR details:**
```bash
gh pr view <number> --json title,body,author,mergeStateStatus,headRefName,baseRefName,state
```

**View PR diff:**
```bash
gh pr diff <number>
```

**List PRs:**
```bash
gh pr list --limit 20 --json number,title,author,state
```

**Create a PR:**
```bash
gh pr create --title "Title" --body "Description"
```

**Check PR status:**
```bash
gh pr checks <number>
```

### Issues

**View issue details:**
```bash
gh issue view <number> --json title,body,author,state,labels
```

**List issues:**
```bash
gh issue list --limit 20 --json number,title,state,labels
```

**Create an issue:**
```bash
gh issue create --title "Title" --body "Description"
```

### Releases

**List releases:**
```bash
gh release list --limit 10
```

**View release details:**
```bash
gh release view <tag> --json name,body,publishedAt
```

## Git Commands

Use `git` commands via `Shell` for local repository operations:

### Repository Status

**Check status:**
```bash
git status
```

**View recent commits:**
```bash
git log --oneline -10
```

**View commit details:**
```bash
git show <commit-hash>
```

### Diffs

**View unstaged changes:**
```bash
git diff
```

**View staged changes:**
```bash
git diff --staged
```

**Compare commits:**
```bash
git diff <commit1> <commit2>
```

**View changes in a PR (if checked out locally):**
```bash
git diff main...feature-branch
```

### Branch Operations

**List branches:**
```bash
git branch -a
```

**View current branch:**
```bash
git branch --show-current
```

**Checkout a branch:**
```bash
git checkout <branch-name>
```

## Common Workflows

### Reviewing a Pull Request

**User**: "Review this PR" (provides GitHub PR URL)

**Workflow**:
1. Extract PR number and repository from URL.
2. Use `gh pr view <number>` to get PR metadata.
3. Use `gh pr diff <number>` to see code changes.
4. Analyze:
   - High-level intent and purpose.
   - Key code changes and patterns.
   - Potential bugs or edge cases.
   - Breaking changes or API modifications.
   - Missing tests or documentation.
5. Provide structured feedback.

**Example output format:**
```
## PR Summary: [Title]

**Author**: [author]
**Status**: [state]
**Branch**: [headRefName] → [baseRefName]

### Key Changes
- [Main change 1]
- [Main change 2]

### Review Notes
- ✅ [Positive observation]
- ⚠️ [Suggestion or concern]
- 🔴 [Critical issue if any]
```

### Summarizing Repository Changes

**User**: "What changed in this commit?" (provides commit URL)

**Workflow**:
1. Extract commit hash from URL.
2. If local repo matches, use `git show <hash>`.
3. Otherwise, use `gh api repos/owner/repo/commits/<hash>` or `WebFetch`.
4. Summarize:
   - Files changed.
   - Type of changes (features, fixes, refactoring).
   - Impact assessment.

### Listing Issues

**User**: "List open issues in this repo"

**Workflow**:
1. Use `gh issue list --state open --limit 20`.
2. Format as a table or list.
3. Include issue number, title, author, and labels.

### Creating Pull Requests

**User**: "Create a PR for my changes"

**Workflow**:
1. Check current branch: `git branch --show-current`.
2. Check status: `git status`.
3. If changes are committed, use `gh pr create`.
4. Provide title and body based on commit messages or user input.

## Examples

### Example 1: PR Review

**User**: "Review this PR: https://github.com/owner/repo/pull/42"

**Agent**:
- Extracts PR #42 from URL.
- Runs: `gh pr view 42 --json title,body,author,mergeStateStatus`
- Runs: `gh pr diff 42`
- Analyzes changes:
  - Identifies new feature: "Adds user authentication"
  - Notes: "Uses JWT tokens, includes middleware"
  - Suggests: "Consider adding rate limiting"
- Provides structured review feedback.

### Example 2: Commit Analysis

**User**: "What changed in commit abc123?"

**Agent**:
- Checks if local repo matches.
- Runs: `git show abc123`
- Summarizes:
  - Files modified: `src/auth.ts`, `tests/auth.test.ts`
  - Changes: "Added JWT token validation"
  - Impact: "Affects all authenticated routes"

### Example 3: Issue Summary

**User**: "List open issues"

**Agent**:
- Runs: `gh issue list --state open --limit 20 --json number,title,state,labels`
- Formats as a readable list:
  ```
  #42 - Bug: Login fails on Safari (bug, high-priority)
  #45 - Feature: Add dark mode (enhancement)
  #48 - Question: How to configure CORS? (question)
  ```

## Best Practices

### 1. Prefer Structured Output

Use `--json` flags with `gh` to get structured data:
- ✅ `gh pr view 42 --json title,body,author`
- ❌ `gh pr view 42` (less parseable)

### 2. Handle Authentication

If `gh` commands fail due to authentication:
- Explain that GitHub CLI authentication is needed.
- Suggest: `gh auth login`
- Fall back to `WebFetch` if necessary.

### 3. Match Repository Context

When working with GitHub URLs:
- Check if the local repository matches the GitHub repo.
- Use local `git` commands when appropriate.
- Use `gh` for cross-repository operations.

### 4. Provide Actionable Feedback

When reviewing PRs or issues:
- Focus on **high-level intent** and **key changes**.
- Call out **breaking changes**, **API changes**, and **migration steps**.
- Suggest **specific improvements** rather than vague comments.

## Summary

Use GitHub tools to:
- **Review pull requests** and analyze code changes.
- **Inspect issues** and repository information.
- **Work with commits** and repository history.
- **Create PRs and issues** programmatically.

Prefer `gh` CLI and `git` commands over `WebFetch` for GitHub URLs to get structured data and better integration with local repositories.
