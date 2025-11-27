#!/usr/bin/env python3
"""
Code Quality Audit Tool (Subagent)
===================================

This tool performs automated code quality checks to identify:
- Code duplication
- Missing documentation
- Redundant files
- Potential bugs
- Unused imports
- Inconsistent patterns

Run regularly during development to maintain code quality.

Usage:
    python scripts/code_quality_audit.py
    python scripts/code_quality_audit.py --fix  # Auto-fix simple issues
    python scripts/code_quality_audit.py --verbose
"""

import os
import re
import json
import argparse
from pathlib import Path
from typing import List, Dict, Set, Tuple
from collections import defaultdict
from dataclasses import dataclass, asdict
from datetime import datetime

# Project root
PROJECT_ROOT = Path(__file__).parent.parent

# Directories to analyze
CODE_DIRS = [
    "lib",
    "components",
    "app",
    "scripts",
]

# File patterns
TS_FILES = ["*.ts", "*.tsx"]
PY_FILES = ["*.py"]
ALL_CODE_FILES = TS_FILES + PY_FILES

# Ignore patterns
IGNORE_PATTERNS = [
    "node_modules",
    ".next",
    "dist",
    "build",
    "__pycache__",
    "*.pyc",
    ".git",
]


@dataclass
class AuditIssue:
    """Represents a code quality issue"""
    severity: str  # "error", "warning", "info"
    category: str  # "duplication", "documentation", "redundancy", "bug", "style"
    file: str
    line: int
    message: str
    suggestion: str = ""


@dataclass
class AuditReport:
    """Complete audit report"""
    timestamp: str
    total_files: int
    total_lines: int
    issues: List[AuditIssue]
    duplicates: Dict[str, List[str]]
    undocumented_functions: List[str]
    redundant_files: List[str]


class CodeQualityAuditor:
    """Main auditor class"""
    
    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.issues: List[AuditIssue] = []
        self.duplicates: Dict[str, List[str]] = defaultdict(list)
        self.undocumented_functions: List[str] = []
        self.redundant_files: List[str] = []
        self.file_contents: Dict[str, List[str]] = {}
        
    def find_code_files(self) -> List[Path]:
        """Find all code files to analyze"""
        files = []
        for code_dir in CODE_DIRS:
            dir_path = self.project_root / code_dir
            if not dir_path.exists():
                continue
                
            for pattern in ALL_CODE_FILES:
                for file_path in dir_path.rglob(pattern):
                    # Check ignore patterns
                    if any(ignore in str(file_path) for ignore in IGNORE_PATTERNS):
                        continue
                    files.append(file_path)
        return files
    
    def read_file(self, file_path: Path) -> List[str]:
        """Read file and cache contents"""
        if str(file_path) not in self.file_contents:
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    self.file_contents[str(file_path)] = f.readlines()
            except Exception as e:
                print(f"Warning: Could not read {file_path}: {e}")
                return []
        return self.file_contents[str(file_path)]
    
    def check_duplicate_scripts(self):
        """Check for duplicate city-specific scripts"""
        scripts_dir = self.project_root / "scripts"
        if not scripts_dir.exists():
            return
        
        # Pattern: gym_data_cleaner_*.py, bulk_import_*_gyms.py, generate_*_gym_descriptions.py
        patterns = {
            "gym_data_cleaner": "gym_data_cleaner_*.py",
            "bulk_import": "bulk_import_*_gyms.py",
            "generate_descriptions": "generate_*_gym_descriptions.py",
        }
        
        for pattern_name, pattern in patterns.items():
            files = list(scripts_dir.glob(pattern))
            if len(files) > 1:
                # Check if files are similar
                file_contents = {}
                for file_path in files:
                    content = self.read_file(file_path)
                    # Normalize content (remove city-specific strings)
                    normalized = self._normalize_content(content)
                    file_contents[str(file_path)] = normalized
                
                # Find duplicates
                content_to_files = defaultdict(list)
                for file_path, content in file_contents.items():
                    content_hash = hash(''.join(content[:50]))  # First 50 lines
                    content_to_files[content_hash].append(file_path)
                
                for files_list in content_to_files.values():
                    if len(files_list) > 1:
                        self.redundant_files.extend(files_list)
                        self.issues.append(AuditIssue(
                            severity="warning",
                            category="redundancy",
                            file=files_list[0],
                            line=1,
                            message=f"Duplicate {pattern_name} scripts found: {len(files_list)} files",
                            suggestion=f"Consider consolidating into a single parameterized script"
                        ))
    
    def _normalize_content(self, lines: List[str]) -> List[str]:
        """Normalize content for comparison (remove city-specific strings)"""
        normalized = []
        city_names = ["limassol", "nicosia", "larnaca", "paphos", "ayia_napa", "protaras"]
        for line in lines:
            normalized_line = line.lower()
            for city in city_names:
                normalized_line = normalized_line.replace(city, "CITY")
            normalized.append(normalized_line)
        return normalized
    
    def check_missing_documentation(self):
        """Check for missing JSDoc/TSDoc and Python docstrings"""
        for file_path_str, lines in self.file_contents.items():
            file_path = Path(file_path_str)
            
            if file_path.suffix in ['.ts', '.tsx']:
                self._check_ts_documentation(file_path, lines)
            elif file_path.suffix == '.py':
                self._check_py_documentation(file_path, lines)
    
    def _check_ts_documentation(self, file_path: Path, lines: List[str]):
        """Check TypeScript/TSX documentation"""
        in_export = False
        function_name = None
        
        for i, line in enumerate(lines, 1):
            # Check for exported functions
            if re.search(r'^export\s+(async\s+)?function\s+(\w+)', line):
                match = re.search(r'function\s+(\w+)', line)
                if match:
                    function_name = match.group(1)
                    in_export = True
                    # Check if previous lines have JSDoc
                    has_doc = False
                    for j in range(max(0, i-5), i-1):
                        if j < len(lines) and '/**' in lines[j]:
                            has_doc = True
                            break
                    
                    if not has_doc:
                        self.undocumented_functions.append(f"{file_path}:{i}:{function_name}")
                        self.issues.append(AuditIssue(
                            severity="info",
                            category="documentation",
                            file=str(file_path),
                            line=i,
                            message=f"Exported function '{function_name}' lacks JSDoc documentation",
                            suggestion="Add JSDoc comment above function"
                        ))
            
            # Check for exported React components
            if re.search(r'^export\s+(const|function)\s+(\w+).*React\.FC|React\.Component', line):
                match = re.search(r'(\w+).*[:=]', line)
                if match:
                    component_name = match.group(1)
                    has_doc = False
                    for j in range(max(0, i-5), i-1):
                        if j < len(lines) and '/**' in lines[j]:
                            has_doc = True
                            break
                    
                    if not has_doc:
                        self.issues.append(AuditIssue(
                            severity="info",
                            category="documentation",
                            file=str(file_path),
                            line=i,
                            message=f"React component '{component_name}' lacks JSDoc documentation",
                            suggestion="Add JSDoc comment describing component props and usage"
                        ))
    
    def _check_py_documentation(self, file_path: Path, lines: List[str]):
        """Check Python documentation"""
        for i, line in enumerate(lines, 1):
            # Check for function definitions
            if re.search(r'^def\s+(\w+)', line):
                match = re.search(r'def\s+(\w+)', line)
                if match:
                    function_name = match.group(1)
                    # Check if next line has docstring
                    has_doc = False
                    if i < len(lines):
                        next_line = lines[i].strip()
                        if next_line.startswith('"""') or next_line.startswith("'''"):
                            has_doc = True
                    
                    if not has_doc and not function_name.startswith('_'):
                        self.undocumented_functions.append(f"{file_path}:{i}:{function_name}")
                        self.issues.append(AuditIssue(
                            severity="info",
                            category="documentation",
                            file=str(file_path),
                            line=i,
                            message=f"Function '{function_name}' lacks docstring",
                            suggestion="Add docstring describing function parameters and return value"
                        ))
    
    def check_potential_bugs(self):
        """Check for common bugs"""
        for file_path_str, lines in self.file_contents.items():
            file_path = Path(file_path_str)
            
            if file_path.suffix in ['.ts', '.tsx']:
                self._check_ts_bugs(file_path, lines)
            elif file_path.suffix == '.py':
                self._check_py_bugs(file_path, lines)
    
    def _check_ts_bugs(self, file_path: Path, lines: List[str]):
        """Check for TypeScript bugs"""
        for i, line in enumerate(lines, 1):
            # Check for async function called without await
            if re.search(r'getAllGyms\(\)', line) and 'await' not in line:
                # Check if we're in an async function
                context_lines = lines[max(0, i-20):i]
                is_async = any('async' in l for l in context_lines)
                if not is_async:
                    self.issues.append(AuditIssue(
                        severity="error",
                        category="bug",
                        file=str(file_path),
                        line=i,
                        message="getAllGyms() called without await - will return Promise instead of array",
                        suggestion="Add 'await' keyword or make function async"
                    ))
            
            # Check for console.log in production code (info level)
            if 'console.log' in line and 'scripts' not in str(file_path):
                self.issues.append(AuditIssue(
                    severity="info",
                    category="style",
                    file=str(file_path),
                    line=i,
                    message="console.log found - consider removing for production",
                    suggestion="Use proper logging or remove debug statements"
                ))
    
    def _check_py_bugs(self, file_path: Path, lines: List[str]):
        """Check for Python bugs"""
        for i, line in enumerate(lines, 1):
            # Check for hardcoded paths
            if re.search(r'["\']/.*["\']', line) and 'PROJECT_ROOT' not in line:
                if 'path' in line.lower() or 'file' in line.lower():
                    self.issues.append(AuditIssue(
                        severity="warning",
                        category="style",
                        file=str(file_path),
                        line=i,
                        message="Hardcoded path found - use PROJECT_ROOT for portability",
                        suggestion="Replace with Path(PROJECT_ROOT / 'relative/path')"
                    ))
    
    def check_duplicate_code(self):
        """Check for duplicate code blocks"""
        # Group files by type
        ts_files = {f: c for f, c in self.file_contents.items() if Path(f).suffix in ['.ts', '.tsx']}
        py_files = {f: c for f, c in self.file_contents.items() if Path(f).suffix == '.py'}
        
        # Check for duplicate functions/components
        for file_group, files in [("TypeScript", ts_files), ("Python", py_files)]:
            function_signatures = defaultdict(list)
            
            for file_path, lines in files.items():
                for i, line in enumerate(lines, 1):
                    # Extract function signatures
                    if file_group == "TypeScript":
                        match = re.search(r'(export\s+)?(async\s+)?function\s+(\w+)', line)
                        if match:
                            sig = line.strip()
                            function_signatures[sig].append(f"{file_path}:{i}")
                    else:  # Python
                        match = re.search(r'def\s+(\w+)', line)
                        if match:
                            sig = line.strip()
                            function_signatures[sig].append(f"{file_path}:{i}")
            
            # Report duplicates
            for sig, locations in function_signatures.items():
                if len(locations) > 1:
                    self.duplicates[sig] = locations
                    # Parse first location (format: "file:line")
                    first_loc = locations[0]
                    # Handle Windows paths with colons (e.g., "C:\path\to\file.tsx:123")
                    if ':' in first_loc:
                        # Split from the right to handle Windows drive letters
                        parts = first_loc.rsplit(':', 1)
                        file_path = parts[0]
                        line_num = int(parts[1]) if len(parts) > 1 else 1
                    else:
                        file_path = first_loc
                        line_num = 1
                    
                    self.issues.append(AuditIssue(
                        severity="warning",
                        category="duplication",
                        file=file_path,
                        line=line_num,
                        message=f"Duplicate function signature found in {len(locations)} locations",
                        suggestion="Consider extracting to shared utility"
                    ))
    
    def generate_report(self) -> AuditReport:
        """Generate complete audit report"""
        files = self.find_code_files()
        total_lines = sum(len(self.read_file(f)) for f in files)
        
        return AuditReport(
            timestamp=datetime.now().isoformat(),
            total_files=len(files),
            total_lines=total_lines,
            issues=self.issues,
            duplicates=dict(self.duplicates),
            undocumented_functions=self.undocumented_functions,
            redundant_files=list(set(self.redundant_files))
        )
    
    def run_audit(self):
        """Run all audit checks"""
        print("[*] Running code quality audit...")
        print(f"[*] Project root: {self.project_root}")
        print()
        
        # Load all files first
        files = self.find_code_files()
        print(f"[*] Found {len(files)} code files")
        
        for file_path in files:
            self.read_file(file_path)
        
        print("[*] Checking for issues...")
        print()
        
        # Run checks
        self.check_duplicate_scripts()
        self.check_missing_documentation()
        self.check_potential_bugs()
        self.check_duplicate_code()
        
        print("[*] Audit complete!")
        print()
    
    def print_report(self, verbose: bool = False):
        """Print audit report"""
        report = self.generate_report()
        
        print("=" * 80)
        print("CODE QUALITY AUDIT REPORT")
        print("=" * 80)
        print(f"Timestamp: {report.timestamp}")
        print(f"Files analyzed: {report.total_files}")
        print(f"Total lines: {report.total_lines}")
        print()
        
        # Group issues by severity
        errors = [i for i in report.issues if i.severity == "error"]
        warnings = [i for i in report.issues if i.severity == "warning"]
        infos = [i for i in report.issues if i.severity == "info"]
        
        print(f"[ERROR] Errors: {len(errors)}")
        print(f"[WARN]  Warnings: {len(warnings)}")
        print(f"[INFO]  Info: {len(infos)}")
        print()
        
        # Print errors first
        if errors:
            print("=" * 80)
            print("ERRORS (Must Fix)")
            print("=" * 80)
            for issue in errors:
                print(f"[ERROR] {issue.file}:{issue.line}")
                print(f"        {issue.message}")
                if issue.suggestion:
                    print(f"        Suggestion: {issue.suggestion}")
                print()
        
        # Print warnings
        if warnings:
            print("=" * 80)
            print("WARNINGS (Should Fix)")
            print("=" * 80)
            for issue in warnings[:20] if not verbose else warnings:
                print(f"[WARN]  {issue.file}:{issue.line}")
                print(f"        {issue.message}")
                if issue.suggestion:
                    print(f"        Suggestion: {issue.suggestion}")
                print()
            if len(warnings) > 20 and not verbose:
                print(f"... and {len(warnings) - 20} more warnings (use --verbose to see all)")
                print()
        
        # Print info (only if verbose)
        if verbose and infos:
            print("=" * 80)
            print("INFO (Nice to Have)")
            print("=" * 80)
            for issue in infos[:10]:
                print(f"[INFO]  {issue.file}:{issue.line}")
                print(f"        {issue.message}")
                print()
        
        # Summary statistics
        print("=" * 80)
        print("SUMMARY")
        print("=" * 80)
        print(f"Redundant files: {len(report.redundant_files)}")
        print(f"Undocumented functions: {len(report.undocumented_functions)}")
        print(f"Duplicate code blocks: {len(report.duplicates)}")
        print()
        
        # Save report to file
        report_file = self.project_root / "docs" / "code_quality_report.json"
        report_file.parent.mkdir(exist_ok=True)
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(asdict(report), f, indent=2)
        print(f"[*] Full report saved to: {report_file}")


def main():
    parser = argparse.ArgumentParser(description="Code Quality Audit Tool")
    parser.add_argument("--verbose", "-v", action="store_true", help="Show all issues including info level")
    parser.add_argument("--fix", action="store_true", help="Auto-fix simple issues (not implemented yet)")
    args = parser.parse_args()
    
    auditor = CodeQualityAuditor(PROJECT_ROOT)
    auditor.run_audit()
    auditor.print_report(verbose=args.verbose)
    
    # Exit with error code if there are critical issues
    report = auditor.generate_report()
    errors = [i for i in report.issues if i.severity == "error"]
    if errors:
        print(f"\n[ERROR] Found {len(errors)} critical errors. Please fix before committing.")
        exit(1)
    else:
        print("\n[OK] No critical errors found!")
        exit(0)


if __name__ == "__main__":
    main()

