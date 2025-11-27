# Noor UI Documentation

Internal documentation for the Noor UI project. For user-facing documentation, visit [noorui.com](https://noorui.com).

## ⚠️ **Important for AI Assistants & Contributors**

**Before deleting or archiving any documentation, please read:** [`.ai-rules.md`](../.ai-rules.md)

This file explains which documentation should be preserved (case studies, planning docs) vs. what can be archived (completed task notes).

---

## 📁 Documentation Structure

### `/architecture/`
Architecture decisions, design patterns, and technical strategies:
- `I18N-SOLUTION.md` - Internationalization implementation approach
- `MULTILINGUAL_STRATEGY.md` - Multilingual content management patterns

### `/development/`
Development guides, processes, and checklists:
- `COMPONENT_CHECKLIST.md` - Component development checklist
- `COMPONENT_DOCUMENTATION_STANDARDS.md` - Documentation standards for components
- `NPM_PACKAGE_STRATEGY.md` - NPM package structure and strategy
- `PUBLISHING_GUIDE.md` - Step-by-step publishing guide
- `PRE_PUBLISH_CHECKLIST.md` - Pre-publish validation checklist
- `TESTING.md` - Testing guidelines and strategies
- `PERFORMANCE.md` - Performance optimization guide
- `VALIDATION-SYSTEM.md` - Automated validation system documentation
- `QUICK_START_TEST.md` - Quick start guide testing
- `TEST_NOORUI_SETUP.md` - Package setup testing

### `/design/`
Design documentation and UI specifications:
- `EVAL-UI-DESIGN.md` - Evaluation UI design specifications

### `/case-studies/` ⭐
**Historical planning documents kept for educational value and blog content.**

⚠️ **DO NOT DELETE** - See [case-studies/README.md](./case-studies/README.md) for details.

Contains:
- `ai-llm-components-design-process.md` - How we designed the AI/LLM component suite

**These are content assets for:**
- Blog posts
- Case studies
- Educational material
- Design process examples

### `/dev-archives/` 📦
**The complete development history of Noor UI - preserved as a time capsule.**

⚠️ **DO NOT DELETE** - See [dev-archives/README.md](./dev-archives/README.md) for details.

Contains the entire development journey: every planning doc, status update, completed task note, and decision that led to building Noor UI. This is our "making of" story.

**Why we keep this:**
- Historical record and context
- Reference for future decisions
- Learning resource showing real development
- Potential "behind the scenes" blog content

---

## 📚 Root Documentation

Core project documentation in the root directory:
- `README.md` - Main project README (used as npm package README)
- `CHANGELOG.md` - Version history and release notes
- `ROADMAP.md` - Project roadmap and development phases
- `CONTRIBUTING.md` - Contribution guidelines
- `MIGRATION_GUIDE.md` - Migration guide for users

---

## 🔗 External Resources

- **Website:** [noorui.com](https://noorui.com)
- **NPM Package:** [noorui-rtl](https://www.npmjs.com/package/noorui-rtl)
- **GitHub:** [github.com/ositaka/noor-ui](https://github.com/ositaka/noor-ui)
- **Documentation Site:** Embedded in the main website

---

## 📝 Contributing to Documentation

When adding new documentation:
1. Place architecture docs in `/architecture/`
2. Place development guides in `/development/`
3. Place design specs in `/design/`
4. **Place planning/process docs in `/case-studies/`** if they have blog potential
5. **Place completed task notes in `/dev-archives/`** to preserve development history
6. Update this README if adding new categories

Keep the root directory clean - only essential public-facing docs should be there.

---

## 🤖 For AI Assistants

**Read [`.ai-rules.md`](../.ai-rules.md) before:**
- Deleting any documentation
- Organizing/moving files
- Archiving content

**Key rules:**
- `/docs/case-studies/` = Content creation material (never delete)
- `/docs/dev-archives/` = Development history (never delete)
- When in doubt, ask before moving/deleting ANY documentation

---

**Built with ❤️ for the GCC market by [Nuno Marques](https://ositaka.com)**
