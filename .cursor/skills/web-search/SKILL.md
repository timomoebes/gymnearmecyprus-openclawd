---
name: web-search
description: Search the web for current information, latest APIs, breaking changes, and up-to-date documentation. Use when the user asks about current information, recent changes, version-specific details, or when you need to verify time-sensitive information that may have changed since training data.
---

# Web Search

This skill guides effective use of web search to find current, accurate information.

## When to Use Web Search

Use `WebSearch` when:

- The user asks about **current information** (libraries, APIs, docs, news, tooling, versions).
- You need to verify **latest APIs** or **breaking changes** in frameworks or libraries.
- The user asks about **best practices** that may have evolved recently.
- You need to compare **multiple approaches** or libraries.
- The user mentions **recent bugs** or **GitHub issues** in open source projects.
- Information is **version-specific** or **time-sensitive**.

**Do NOT use** `WebSearch` when:
- The answer is stable and well-documented in your training data.
- The user provides a specific URL (use `WebFetch` instead).
- The question is about general programming concepts that don't change.

## Effective Search Strategies

### 1. Be Specific in Search Terms

Include relevant details:
- **Technology name and version**: `"Next.js 15 app router"`
- **Year or timeframe**: `"React 19 hooks 2026"`
- **Specific feature or API**: `"Supabase RLS policies 2026"`
- **Problem context**: `"TypeScript 5.5 decorator metadata error"`

**Good examples:**
- `"Next.js 15 server actions best practices 2026"`
- `"Python async context managers performance"`
- `"Tailwind CSS v4 migration guide"`

**Bad examples:**
- `"Next.js"` (too broad)
- `"how to use React"` (too general, likely in training data)

### 2. Explain Why You're Searching

Always provide a brief `explanation` when calling `WebSearch`:

- ✅ `"Verify current Next.js 15 server actions API and any recent breaking changes."`
- ✅ `"Check latest Supabase pricing model and free tier limits as of 2026."`
- ✅ `"Find recent solutions for TypeScript decorator metadata issues."`

### 3. Synthesize Multiple Sources

After receiving search results:

- **Prefer official documentation** over blog posts or tutorials.
- **Cross-reference** multiple sources to verify accuracy.
- **Note dates and versions** if they affect the answer.
- **Identify patterns** across sources rather than repeating one source.

### 4. Focus on What Changed

When searching for version-specific information:

- Highlight **breaking changes** vs previous versions.
- Note **new features** or **deprecated APIs**.
- Provide **migration guidance** if relevant.

## Common Use Cases

### Library or Framework Updates

**User**: "What changed in React 19?"

**Approach**:
1. Search: `"React 19 release notes breaking changes"`
2. Synthesize from official React blog and release notes.
3. Focus on breaking changes, new features, and migration steps.

### Best Practices

**User**: "What's the recommended way to handle authentication in Next.js 15?"

**Approach**:
1. Search: `"Next.js 15 authentication best practices 2026"`
2. Compare official docs with recent community discussions.
3. Recommend the current standard approach.

### Troubleshooting

**User**: "I'm getting an error with TypeScript decorators"

**Approach**:
1. Search: `"TypeScript decorator metadata error solution"`
2. Look for recent GitHub issues or Stack Overflow answers.
3. Provide the most current solution.

## Examples

### Example 1: Version-Specific Question

**User**: "How do I use the new Next.js 15 server actions?"

**Agent**:
- Calls `WebSearch` with: `"Next.js 15 server actions API documentation"`
- Explanation: `"Verify current server actions API syntax and limitations in Next.js 15."`
- Synthesizes from official Next.js docs and recent guides.
- Provides code examples using the current API.

### Example 2: Current Best Practices

**User**: "What's the best state management solution for React in 2026?"

**Agent**:
- Calls `WebSearch` with: `"React state management libraries comparison 2026"`
- Explanation: `"Compare current state management solutions and their adoption in 2026."`
- Compares multiple sources (official docs, community discussions, benchmarks).
- Recommends based on current ecosystem trends.

### Example 3: Breaking Changes

**User**: "My code broke after updating to Tailwind CSS v4"

**Agent**:
- Calls `WebSearch` with: `"Tailwind CSS v4 migration breaking changes"`
- Explanation: `"Find breaking changes and migration guide for Tailwind CSS v4."`
- Identifies specific breaking changes and provides migration steps.

## Summary

Use `WebSearch` to:
- Find **current, accurate information** that may have changed.
- Verify **version-specific** details and **breaking changes**.
- Compare **multiple approaches** or libraries.
- Stay up-to-date with **latest best practices**.

Always be specific in search terms, explain why you're searching, and synthesize results from multiple authoritative sources.
