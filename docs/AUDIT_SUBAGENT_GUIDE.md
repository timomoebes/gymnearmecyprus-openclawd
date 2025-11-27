# Code Quality Audit Subagent Guide

## Overview

The **Code Quality Audit Subagent** is an automated tool that continuously monitors code quality throughout development. It identifies redundancies, documentation gaps, potential bugs, and code duplication.

## Quick Start

```bash
# Run basic audit
python scripts/code_quality_audit.py

# Show all issues (including info level)
python scripts/code_quality_audit.py --verbose

# Check specific directory
python scripts/code_quality_audit.py --dir lib
```

## What It Checks

### 1. Code Duplication
- **Duplicate scripts**: Identifies city-specific scripts that can be consolidated
- **Duplicate functions**: Finds identical function signatures across files
- **Duplicate code blocks**: Detects repeated code patterns

### 2. Missing Documentation
- **TypeScript/TSX**: Checks for missing JSDoc comments on exported functions and components
- **Python**: Checks for missing docstrings on public functions

### 3. Potential Bugs
- **Async/await issues**: Detects async functions called without `await`
- **Console.log statements**: Flags debug code in production files
- **Hardcoded paths**: Identifies non-portable file paths

### 4. Redundant Files
- **City-specific scripts**: Identifies scripts that differ only by city name
- **Unused files**: Flags potentially unused code files

## Integration with Development Workflow

### Pre-Commit Hook

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
python scripts/code_quality_audit.py
if [ $? -ne 0 ]; then
    echo "❌ Code quality issues found. Please fix before committing."
    exit 1
fi
```

### CI/CD Pipeline

Add to your CI/CD configuration:

```yaml
# Example GitHub Actions
- name: Run Code Quality Audit
  run: python scripts/code_quality_audit.py
```

### Regular Checks

**Recommended schedule:**
- **Before each commit** - Quick check for critical errors
- **Weekly** - Full audit with verbose output
- **Before major releases** - Comprehensive review

## Understanding the Output

### Severity Levels

- **`[ERROR]`** - Critical issues that must be fixed
  - Example: Async function called without await
  - Action: Fix immediately before committing

- **`[WARN]`** - Issues that should be fixed
  - Example: Duplicate code blocks
  - Action: Address in current sprint

- **`[INFO]`** - Nice-to-have improvements
  - Example: Missing documentation
  - Action: Address during refactoring

### Report Files

The tool generates:
1. **Console output** - Summary with top issues
2. **JSON report** - `docs/code_quality_report.json` - Full detailed report

## Common Issues and Fixes

### Issue: Duplicate Scripts

**Problem:**
```
[WARN] Duplicate gym_data_cleaner scripts found: 6 files
```

**Fix:**
Consolidate city-specific scripts into parameterized versions:
```bash
# Instead of 6 separate files, use:
python scripts/gym_data_cleaner.py --city limassol
python scripts/gym_data_cleaner.py --city nicosia
```

### Issue: Missing Documentation

**Problem:**
```
[INFO] Exported function 'getCyprusTime' lacks JSDoc documentation
```

**Fix:**
Add JSDoc comment:
```typescript
/**
 * Gets the current time in Cyprus timezone (Europe/Nicosia).
 * 
 * @returns Object containing day, hours, minutes, and time in minutes
 */
function getCyprusTime() { ... }
```

### Issue: Async Function Without Await

**Problem:**
```
[ERROR] getAllGyms() called without await - will return Promise instead of array
```

**Fix:**
Add `await` keyword:
```typescript
// Before
const gyms = getAllGyms();

// After
const gyms = await getAllGyms();
```

## Customizing the Audit

### Adding New Checks

Edit `scripts/code_quality_audit.py`:

```python
def check_custom_pattern(self):
    """Check for custom code patterns"""
    for file_path_str, lines in self.file_contents.items():
        for i, line in enumerate(lines, 1):
            if 'CUSTOM_PATTERN' in line:
                self.issues.append(AuditIssue(
                    severity="warning",
                    category="style",
                    file=file_path_str,
                    line=i,
                    message="Custom pattern found",
                    suggestion="Consider refactoring"
                ))
```

Then add to `run_audit()`:
```python
self.check_custom_pattern()
```

### Excluding Files/Directories

Modify `IGNORE_PATTERNS` in the script:
```python
IGNORE_PATTERNS = [
    "node_modules",
    ".next",
    "dist",
    "build",
    "__pycache__",
    "*.pyc",
    ".git",
    "scripts/archive",  # Add custom exclusions
]
```

## Best Practices

1. **Run regularly** - Don't let issues accumulate
2. **Fix errors first** - Address `[ERROR]` level issues immediately
3. **Address warnings** - Fix `[WARN]` issues in the same sprint
4. **Review info** - `[INFO]` issues can be addressed during refactoring
5. **Use verbose mode** - When doing comprehensive code reviews
6. **Track progress** - Compare reports over time to measure improvement

## Metrics Tracking

The tool tracks:
- Total files analyzed
- Total lines of code
- Number of issues by severity
- Number of redundant files
- Number of undocumented functions
- Number of duplicate code blocks

Compare these metrics over time to measure code quality improvements.

## Exit Codes

- **`0`** - No critical errors found (safe to commit)
- **`1`** - Critical errors found (should fix before committing)

## Related Documentation

- `docs/CODEBASE_AUDIT_2025.md` - Comprehensive audit report
- `docs/CODE_QUALITY_TOOL.md` - Detailed tool documentation
- `README.md` - Project overview

## Getting Help

If you encounter issues with the audit tool:

1. Check the error message for specific file/line
2. Review `docs/code_quality_report.json` for full details
3. Run with `--verbose` flag for more information
4. Review the audit report in `docs/CODEBASE_AUDIT_2025.md`

---

**Remember:** The audit tool is a helper, not a replacement for code reviews. Use it to catch issues early, but always review code changes manually as well.

