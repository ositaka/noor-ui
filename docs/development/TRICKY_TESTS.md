# Tricky Components to Test

Components in `storybook/stories/basic/` where automated play-function tests were removed because the component DOM doesn't match standard ARIA roles or text patterns expected by Testing Library queries.

## Components Without Tests (and Why)

### RichTextEditor
- **Root cause**: TipTap editor doesn't consistently expose `role="textbox"` across environments. Toolbar buttons use `title` attributes (`Bold (Ctrl+B)`) that may differ per OS/locale.
- **Specific issues**: `getByRole('textbox')` fails in headless mode; `toHaveAttribute('data-placeholder', ...)` depends on TipTap internals; `userEvent.type()` doesn't reliably insert text into contenteditable.
- **To fix**: Write tests that target TipTap's actual DOM structure (e.g., `.ProseMirror` class) instead of ARIA roles.

### MarkdownEditor
- **Root cause**: MDXEditor (BlockNote) renders a non-standard DOM with contenteditable divs that don't reliably expose `role="textbox"`.
- **Specific issues**: Same as RichTextEditor -- `getByRole('textbox')` unreliable; `toHaveAttribute('data-placeholder', ...)` depends on editor internals; `userEvent.type()` doesn't work with contenteditable.
- **To fix**: Same approach as RichTextEditor -- target editor-specific DOM selectors.

### Separator
- **Root cause**: The custom Separator component renders styled `<div>` elements that don't expose `role="separator"` in the DOM.
- **Specific issues**: `getByRole('separator')` and `getAllByRole('separator')` return no elements, causing all assertions to fail.
- **To fix**: Either add `role="separator"` to the component implementation, or write tests using `querySelector` with component-specific class selectors.

### UserMenu
- **Root cause**: UserMenu uses a Popover (not a DropdownMenu), so `findByRole('menu')` and `getByRole('menuitem')` fail -- the popover doesn't render ARIA menu roles.
- **Specific issues**: `findByRole('menu')` never resolves; `getByRole('menuitem', { name: /profile/i })` finds nothing; button accessible name doesn't match `user menu`.
- **To fix**: Use `findByText()` queries targeting visible menu text instead of ARIA menu roles, or refactor the component to use a proper DropdownMenu with ARIA roles.

### DashboardShell
- **Root cause**: Complex layout with a responsive sidebar (Sheet on mobile, fixed sidebar on desktop). Navigation items are Sheet trigger buttons, not `<a>` links. User button accessible name is "Menu" not the person's name.
- **Specific issues**: `getByRole('link', { name: /dashboard/i })` fails (items are buttons in Sheet); `getByRole('button', { name: /ahmed/i })` fails (button is labeled "Menu"); badges aren't visible in collapsed sidebar; notification content text is split across multiple child elements.
- **To fix**: Test the mobile (Sheet) and desktop (sidebar) variants separately; query by button role instead of link; use `getAllByText` for split content.

### NotificationCenter
- **Root cause**: Notification title/description text is split across multiple child elements (`<span>`, `<p>`, icon wrappers), causing `getByText()` and `findByText()` to fail when matching full text.
- **Specific issues**: `getByText(/new comment on your post/i)` fails because the text spans multiple elements; `closest('[role="button"]')` returns null; `queryByText(/\d+/)` for badge matching is too broad; hover-to-reveal remove button timing issues.
- **To fix**: Use `*ByText` on smaller, unique text fragments or use `querySelector` targeting component-specific data attributes.

<<<<<<< Updated upstream
=======
### WorkflowCanvas, WorkflowNode, WorkflowNodes
- **Root cause**: These components require ReactFlow's internal zustand provider context, which isn't available when components are rendered in isolation.
- **Specific issues**: Components throw `Error: Zustand provider is missing` or similar context errors when rendered outside a ReactFlow wrapper; the ReactFlow store is not accessible in the test environment.
- **Resolution**: Stories are tagged with `tags: ['!test']` to skip Vitest execution. Visual testing can still be done through Storybook UI where ReactFlow is properly initialized.
- **To fix**: Would require mocking ReactFlow's zustand store, which is complex and fragile. Recommend keeping these as visual-only tests.

>>>>>>> Stashed changes
## General Patterns

These failures share common themes:
1. **Third-party editors** (TipTap, MDXEditor) render non-standard DOM that doesn't align with ARIA roles
2. **Complex composite components** (DashboardShell, NotificationCenter) have text split across multiple DOM nodes
3. **Custom implementations** (Separator, UserMenu) don't use the expected ARIA roles

## Revisiting These Tests

When revisiting, consider:
- Adding `data-testid` attributes to component internals for reliable querying
- Using `querySelector` with component-specific selectors instead of ARIA role queries
- Testing at a higher level (e.g., "popover opens" rather than "menu item is clickable")
- For editors, testing only that the container renders and is visible, not internal behavior

---

*Last updated: February 2026*
