# Code Quality Audit Tool

## Overview

The Code Quality Audit Tool (`scripts/code_quality_audit.py`) is an automated "subagent" that performs comprehensive code quality checks on the codebase. It helps maintain code quality throughout development by identifying:

- **Code duplication** - Duplicate functions, components, and scripts
- **Missing documentation** - Functions and components without JSDoc/TSDoc/docstrings
- **Redundant files** - City-specific scripts that can be consolidated
- **Potential bugs** - Common coding errors and anti-patterns
- **Inconsistent patterns** - Code that doesn't follow project conventions

## Usage

### Basic Usage

```bash
# Run audit and show summary
python scripts/code_quality_audit.py

# Show all issues including info level
python scripts/code_quality_audit.py --verbose

# Auto-fix simple issues (not yet implemented)
python scripts/code_quality_audit.py --fix
```

### Integration with Development Workflow

**Recommended:** Run the audit tool before committing code:

```bash
# Pre-commit check
python scripts/code_quality_audit.py

# If errors found, fix them before committing
# Exit code 1 = errors found, 0 = no errors
```

**Git Hook Example:**
Add to `.git/hooks/pre-commit`:
```bash
#!/bin/bash
python scripts/code_quality_audit.py
if [ $? -ne 0 ]; then
    echo "Code quality issues found. Please fix before committing."
    exit 1
fi
```

## Output

The tool generates:

1. **Console Report** - Summary of issues grouped by severity:
   - `[ERROR]` - Critical issues that must be fixed
   - `[WARN]` - Issues that should be fixed
   - `[INFO]` - Nice-to-have improvements

2. **JSON Report** - Detailed report saved to `docs/code_quality_report.json`

## Checks Performed

### 1. Duplicate Scripts
Identifies city-specific scripts that are nearly identical:
- `gym_data_cleaner_*.py` (6 files)
- `bulk_import_*_gyms.py` (6 files)
- `generate_*_gym_descriptions.py` (6 files)

**Recommendation:** Consolidate into parameterized scripts.

### 2. Missing Documentation
Checks for:
- **TypeScript/TSX:** Missing JSDoc comments on exported functions and React components
- **Python:** Missing docstrings on public functions

### 3. Potential Bugs
Detects:
- Async functions called without `await`
- `console.log` statements in production code
- Hardcoded file paths (should use `PROJECT_ROOT`)

### 4. Duplicate Code
Identifies:
- Duplicate function signatures across files
- Repeated code patterns that could be extracted

## Exit Codes

- `0` - No critical errors found
- `1` - Critical errors found (should fix before committing)

## Configuration

The tool analyzes files in:
- `lib/`
- `components/`
- `app/`
- `scripts/`

It ignores:
- `node_modules/`
- `.next/`
- `dist/`
- `build/`
- `__pycache__/`
- `.git/`

## Example Output

```
[*] Running code quality audit...
[*] Project root: /path/to/project
[*] Found 80 code files
[*] Checking for issues...
[*] Audit complete!

================================================================================
CODE QUALITY AUDIT REPORT
================================================================================
Timestamp: 2025-11-23T10:54:19.250283
Files analyzed: 80
Total lines: 15892

[ERROR] Errors: 1
[WARN]  Warnings: 20
[INFO]  Info: 64

================================================================================
ERRORS (Must Fix)
================================================================================
[ERROR] lib/utils/search.ts:13
        getAllGyms() called without await - will return Promise instead of array
        Suggestion: Add 'await' keyword or make function async

================================================================================
SUMMARY
================================================================================
Redundant files: 4
Undocumented functions: 51
Duplicate code blocks: 19

[*] Full report saved to: docs/code_quality_report.json

[ERROR] Found 1 critical errors. Please fix before committing.
```

## Extending the Tool

To add new checks, modify `CodeQualityAuditor` class in `scripts/code_quality_audit.py`:

1. Add a new check method (e.g., `check_custom_pattern()`)
2. Call it in `run_audit()`
3. Add issues to `self.issues` list

Example:
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

## Best Practices

1. **Run regularly** - Before each commit or PR
2. **Fix errors first** - Address `[ERROR]` level issues immediately
3. **Address warnings** - Fix `[WARN]` issues in the same sprint
4. **Review info** - `[INFO]` issues can be addressed during refactoring
5. **Use verbose mode** - When doing comprehensive code reviews

## Related Documentation

- `docs/CODEBASE_AUDIT.md` - Comprehensive manual audit report
- `README.md` - Project overview
- `DEVELOPMENT_STATUS.md` - Current project status

