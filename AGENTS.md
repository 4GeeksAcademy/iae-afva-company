# Agent Guidance

**Agents working on this repository must follow these instructions before starting any task.**

1. Project Context
   - Read `./CONTEXT.md` to understand the company's business objectives constraints, and roadmap.
   - Review `./memory-bank/` to understand the project's architecture, technical decisions, and current developments.

2. Development Rules
   - Review `./.agents/rules/` and apply all rules relevant to the task.
   - Follow existing architectural conventions and repository structure.
   - Read the relevant directory's README.md before modifying its contents.

3. Agent Skills
   - Check `./.agents/skills/` for reusable procedures applicable to the task.
   - Use the relevant skills and verify their acceptance criteria.

4. File and Directory Restrictions
   Agents must respect the following restrictions:
   - Protected files: Do not modify files or directories explicitly marked as protected in project rules.
   - Out-of-scope changes: Do not modify files unrelated to the current task.
   - Sensitive files: Do not read, modify, or expose secrets, credentials, or sensitive configuration files unless explicitly authorized.
   - Critical configurations: Request approval before modifying deployment, infrastructure, or security configurations.
   - Existing structure: Do not create, rename, move, or delete top-level directories without explicit approval.

Follow any additional file-specific restrictions defined in `./.agents/rules/.`

4. Development Workflow
   Before committing changes, agents must:
   1. Review the proposed changes against project requirements and applicable rules.
   2. Run relevant tests and validation checks.
   3. Update the memory-bank when architectural decisions or project change, or when explicitly instructed to do so.
   4. Report validation results and any unresolved issues.
   5. Commit only after completing the required checks (using a clear and meaningful commit message).

5. Memory Bank Updates
   When updating the memory bank:
   - Record project progress in `./memory-bank/progress.md`.
   - Record significant technical and architectural decisions in `./memory-bank/decisions.md`.
   - Update `./memory-bank/architecture.md` when the system architecture changes.
   - Follow the formatting and documentation conventions defined in `./.agents/rules/memory-management.md`.

6. Clarification and Escalation
   - Stop and request clarification when:
   - Requirements are ambiguous.
   - Instructions conflict.
   - Significant architectural decisions require approval.
   - Mandatory validation checks fail and cannot be resolved.
