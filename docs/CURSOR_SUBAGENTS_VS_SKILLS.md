# Cursor: Subagents vs Skills (and why "+ New" is confusing)

## What happened

You clicked **"+ New"** in the **Subagents** section to add the 6 missing subagents. Cursor then:

1. **Created Skills instead of Subagents**  
   In Cursor, **Skills** and **Subagents** are different:
   - **Subagents** = `.md` files in `agents/` (name + description + prompt). Used when the agent delegates to a specialist.
   - **Skills** = folder with `SKILL.md` (+ optional `reference.md`) in `skills/`. Also used by the agent but with a different format and purpose.

   The "+ New" button on the "Rules, Skills, Subagents" page creates **Skills**, not Subagents. So you ended up with new **Skills** (e.g. `security-audit`, `performance-optimizer` in `.cursor/skills/`), not new entries in the Subagents list.

2. **Created everything in the project's `.cursor/`**  
   Because you had this project open, Cursor stored the new items in:
   - `new-gym/.cursor/agents/` (6 agent files again)
   - `new-gym/.cursor/skills/` (at least 2 skills: `security-audit`, `performance-optimizer`)

   So the "new" subagents only exist in this repo, not in your global Cursor config.

## Why it feels buggy

- The UI mixes **Rules**, **Skills**, and **Subagents** on one page, but "+ New" only creates **Skills** and puts them in the **current project**.
- There is no clear way in the UI to "add a Subagent" that:
  - is stored **globally** (`~/.cursor/agents/`), and
  - shows up in the Subagents list.

So the behavior is inconsistent and easy to misinterpret.

## Reliable approach

- **Subagents you want everywhere:**  
  Keep `.md` files only in your **global** agents folder:  
  `C:\Users\timom\.cursor\agents\`  
  Do **not** use "+ New" in Settings to add subagents; that creates project Skills.

- **This project:**  
  We can keep the project’s `.cursor/` empty (no agents, no extra skills) so Cursor only uses your global agents. You won’t see all of them in the Settings Subagents list, but the agent can still use them when this project is open.

- **Skills:**  
  Use "+ New" only when you actually want a **Skill** (project or global), not when you want to "add a subagent" to the list.
