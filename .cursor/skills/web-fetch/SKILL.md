---
name: web-fetch
description: Fetch and analyze content from specific URLs. Use when the user provides a URL and wants the contents summarized, explained, or analyzed, or when you need to read detailed documentation from a specific webpage.
---

# Web Fetch

This skill guides effective use of web fetching to read and analyze content from specific URLs.

## When to Use Web Fetch

Use `WebFetch` (or `mcp_web_fetch`) when:

- The user provides a **specific URL** and wants:
  - Content summarized or explained.
  - Code or configuration extracted.
  - Deep analysis of the page content.
- You found a promising page via `WebSearch` and need **detailed information**.
- The user asks you to **read** or **analyze** a specific webpage, blog post, or documentation page.

**Do NOT use** `WebFetch` when:
- The user asks for general information (use `WebSearch` instead).
- The URL is a GitHub repository, PR, or issue (prefer GitHub tools via `Shell`).
- You already have enough context from search results.

## Effective Fetching Strategies

### 1. Use the Exact URL

Always pass the **exact URL** provided by the user:

- ✅ `https://nextjs.org/docs/app/building-your-application/routing`
- ✅ `https://blog.example.com/post/123`
- ❌ Don't modify or guess URLs

### 2. Analyze Structure First

After fetching content:

1. **Skim headings** to understand the page structure.
2. **Identify the relevant sections** for the user's question.
3. **Extract key information** rather than dumping everything.

### 3. Provide Focused Answers

- Answer the user's **specific question** directly.
- Quote or paraphrase only the **necessary parts**.
- Mention important **caveats, dates, or version notes** from the page.

### 4. Handle Errors Gracefully

If the URL returns an error (404, requires auth, etc.):

- Explain the limitation clearly.
- If possible, fall back to `WebSearch` using the page title or topic.
- Suggest alternative approaches if available.

## Common Use Cases

### Documentation Pages

**User**: "Can you explain how Next.js routing works?" (provides docs URL)

**Approach**:
1. Fetch the exact URL.
2. Identify sections about routing (file-based routing, dynamic routes, etc.).
3. Summarize key concepts with examples.
4. Note any version-specific details.

### Blog Posts or Articles

**User**: "Summarize this blog post" (provides URL)

**Approach**:
1. Fetch the URL.
2. Extract main points and key takeaways.
3. Provide a concise summary.
4. Mention the author's perspective or any notable insights.

### Code Examples or Gists

**User**: "Extract the code from this Gist" (provides Gist URL)

**Approach**:
1. Fetch the Gist URL.
2. Extract code blocks.
3. Format appropriately for the user's context.
4. Note any dependencies or setup requirements mentioned.

### Configuration Files

**User**: "What does this config file do?" (provides URL to config example)

**Approach**:
1. Fetch the URL.
2. Parse the configuration structure.
3. Explain each relevant setting.
4. Note any important defaults or recommendations.

## Examples

### Example 1: Documentation Summary

**User**: "Can you summarize this Next.js docs page and tell me how to configure middleware?" (provides URL)

**Agent**:
- Fetches the exact URL using `WebFetch`.
- Reads the middleware section.
- Summarizes:
  - What middleware is used for.
  - How to create a middleware file.
  - Common use cases.
- Provides a code example based on the docs.

### Example 2: Blog Post Analysis

**User**: "What are the main points in this article?" (provides blog URL)

**Agent**:
- Fetches the blog post URL.
- Identifies key sections and main arguments.
- Provides a structured summary:
  - Main thesis.
  - Key points (numbered or bulleted).
  - Notable examples or case studies.
  - Author's conclusions.

### Example 3: Code Extraction

**User**: "Extract the TypeScript code from this page" (provides tutorial URL)

**Agent**:
- Fetches the tutorial URL.
- Locates TypeScript code blocks.
- Extracts and formats the code.
- Notes any dependencies or setup mentioned in the article.

### Example 4: Error Handling

**User**: "Read this page" (provides URL that returns 404)

**Agent**:
- Attempts to fetch the URL.
- Receives 404 error.
- Explains: "The URL returns a 404 error. The page may have been moved or deleted."
- Offers to search for similar content if the user provides a topic or title.

## Best Practices

### 1. Be Selective

Don't dump the entire page content. Focus on what the user asked for:

- ✅ Extract relevant sections.
- ✅ Summarize key points.
- ❌ Copy-paste entire page.

### 2. Preserve Context

When extracting code or examples:

- Include **necessary imports** or **setup code**.
- Note any **prerequisites** or **dependencies**.
- Mention **version requirements** if specified.

### 3. Cite Sources

When summarizing:

- Reference the **source URL**.
- Note the **publication date** if relevant.
- Mention if information might be **outdated**.

### 4. Combine with Search When Needed

If a fetched page references other concepts:

- Use `WebSearch` to find **related information**.
- Fetch **linked pages** if they're directly relevant.
- Provide **comprehensive answers** that connect multiple sources.

## Summary

Use `WebFetch` to:
- Read and analyze **specific URLs** provided by users.
- Extract **code, configuration, or examples** from web pages.
- Provide **focused summaries** of web content.
- Deep dive into **detailed documentation** or articles.

Always fetch the exact URL, analyze structure first, and provide focused answers that directly address the user's question.
