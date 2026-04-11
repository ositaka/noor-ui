export interface UseCaseItem {
  title: string
  icon: string
}

export interface RelatedItem {
  slug: string
  name: string
  description: string
}

export interface ComponentDocData {
  useCases?: UseCaseItem[]
  bestPractices?: { dos: string[]; donts: string[] }
  related?: RelatedItem[]
}

export const componentDocContent: Record<'en' | 'ar', Record<string, ComponentDocData>> = {
  en: {
    // ── Core ──────────────────────────────────────────────
    'button': {
      useCases: [
        { title: 'Form submissions and actions', icon: 'PencilSimple' },
        { title: 'Call-to-action triggers', icon: 'Target' },
        { title: 'Dialog and modal openers', icon: 'ChatCentered' },
        { title: 'Toggle and state changes', icon: 'ArrowsClockwise' },
      ],
      bestPractices: {
        dos: [
          'Use clear, action-oriented labels (e.g., "Save changes")',
          'Show loading state for async actions',
          'Use the primary variant for the main action on a page',
          'Ensure sufficient size for touch targets (44×44px minimum)',
        ],
        donts: [
          'Don\'t use buttons for navigation — use links or ButtonArrow',
          'Don\'t place multiple primary buttons in one view',
          'Don\'t disable without explaining why',
          'Don\'t nest interactive elements inside buttons',
        ],
      },
      related: [
        { slug: 'button-arrow', name: 'Button Arrow', description: 'Directional button with automatic RTL arrow flipping' },
        { slug: 'badge', name: 'Badge', description: 'Status indicators that pair well with action buttons' },
      ],
    },
    'button-arrow': {
      useCases: [
        { title: 'Forward/back navigation', icon: 'ArrowRight' },
        { title: 'Pagination controls', icon: 'FileText' },
        { title: 'Wizard step navigation', icon: 'Hash' },
        { title: 'Breadcrumb-style back links', icon: 'ArrowBendUpLeft' },
      ],
      bestPractices: {
        dos: [
          'Use semantic directions (forward/back) instead of left/right',
          'Pair with descriptive labels for accessibility',
          'Use the outline variant for secondary navigation',
        ],
        donts: [
          'Don\'t use for non-directional actions',
          'Don\'t mix ButtonArrow with regular Button for the same action',
          'Don\'t hardcode arrow directions — let RTL handle it',
        ],
      },
      related: [
        { slug: 'button', name: 'Button', description: 'Standard action button without directional arrows' },
      ],
    },
    'card': {
      useCases: [
        { title: 'Content grouping and containers', icon: 'Package' },
        { title: 'Dashboard widgets and panels', icon: 'ChartBar' },
        { title: 'Form sections and fieldsets', icon: 'ListBullets' },
        { title: 'Product or listing previews', icon: 'Tag' },
      ],
      bestPractices: {
        dos: [
          'Use CardHeader, CardContent, CardFooter for consistent structure',
          'Keep card content focused on a single topic',
          'Use consistent padding across cards in a grid',
        ],
        donts: [
          'Don\'t nest cards inside cards',
          'Don\'t overload cards with too many actions',
          'Don\'t use cards when a simple div with border would suffice',
        ],
      },
      related: [
        { slug: 'feature-card', name: 'Feature Card', description: 'Specialized card for feature highlights' },
        { slug: 'stats-card', name: 'Stats Card', description: 'Metric display card' },
        { slug: 'listing-card', name: 'Listing Card', description: 'Card for product/listing displays' },
      ],
    },
    'input': {
      useCases: [
        { title: 'Text entry in forms', icon: 'PencilSimple' },
        { title: 'Search fields', icon: 'MagnifyingGlass' },
        { title: 'Login and authentication forms', icon: 'Lock' },
        { title: 'Data filtering and queries', icon: 'MagnifyingGlass' },
      ],
      bestPractices: {
        dos: [
          'Always pair with a Label for accessibility',
          'Show validation errors below the input',
          'Use the appropriate type attribute (email, password, tel)',
          'Provide placeholder text as a hint, not a replacement for labels',
        ],
        donts: [
          'Don\'t rely on placeholder text alone for labeling',
          'Don\'t use for multi-line text — use Textarea instead',
          'Don\'t hide required field indicators',
        ],
      },
      related: [
        { slug: 'label', name: 'Label', description: 'Accessible input labeling' },
        { slug: 'textarea', name: 'Textarea', description: 'Multi-line text entry' },
        { slug: 'form', name: 'Form', description: 'Form wrapper and validation' },
      ],
    },
    'label': {
      useCases: [
        { title: 'Form field identification', icon: 'Tag' },
        { title: 'Checkbox and radio descriptions', icon: 'CheckSquare' },
        { title: 'Accessible input associations', icon: 'Users' },
        { title: 'Required field indicators', icon: 'Warning' },
      ],
      related: [
        { slug: 'input', name: 'Input', description: 'Text input field' },
        { slug: 'checkbox', name: 'Checkbox', description: 'Checkbox control' },
        { slug: 'radio-group', name: 'Radio Group', description: 'Radio button group' },
      ],
    },
    'separator': {
      useCases: [
        { title: 'Section dividers in layouts', icon: 'SidebarSimple' },
        { title: 'Menu item grouping', icon: 'FileText' },
        { title: 'Card content separation', icon: 'FileText' },
        { title: 'Toolbar and nav bar dividers', icon: 'Layout' },
      ],
      related: [
        { slug: 'card', name: 'Card', description: 'Common container with separators' },
      ],
    },
    'avatar': {
      useCases: [
        { title: 'User profile displays', icon: 'UserCircle' },
        { title: 'Comment and chat avatars', icon: 'ChatCentered' },
        { title: 'Team member listings', icon: 'Users' },
        { title: 'Navigation and user menus', icon: 'PushPin' },
      ],
      bestPractices: {
        dos: [
          'Always provide a fallback (initials or icon) for missing images',
          'Use consistent sizes within the same context',
          'Include alt text for screen readers',
        ],
        donts: [
          'Don\'t use Avatar for decorative images — use img directly',
          'Don\'t mix avatar sizes in the same list',
          'Don\'t crop important content with the circular mask',
        ],
      },
      related: [
        { slug: 'badge', name: 'Badge', description: 'Status indicators alongside avatars' },
        { slug: 'user-badge', name: 'User Badge', description: 'User role and status display' },
      ],
    },
    'badge': {
      bestPractices: {
        dos: [
          'Use consistent colors for the same status across the app',
          'Keep badge text short (1-2 words)',
          'Pair with descriptive labels for screen readers',
          'Use semantic variants (success, warning, destructive) appropriately',
        ],
        donts: [
          'Don\'t use too many badge variants in one view',
          'Don\'t rely on color alone — add text for accessibility',
          'Don\'t use badges for long text — use Alert or Callout instead',
          'Don\'t nest badges inside other badges',
        ],
      },
      related: [
        { slug: 'button', name: 'Button', description: 'Action buttons often paired with badges' },
        { slug: 'card', name: 'Card', description: 'Common container for badge displays' },
        { slug: 'alert', name: 'Alert', description: 'Similar status indication patterns' },
      ],
    },
    'feature-card': {
      useCases: [
        { title: 'Feature highlights on landing pages', icon: 'Sparkle' },
        { title: 'Service or product showcases', icon: 'Package' },
        { title: 'Capability overviews in documentation', icon: 'BookOpen' },
        { title: 'Pricing plan comparison grids', icon: 'GridFour' },
      ],
      related: [
        { slug: 'card', name: 'Card', description: 'Base card component' },
        { slug: 'listing-card', name: 'Listing Card', description: 'Product listing display' },
      ],
    },

    // ── Forms ─────────────────────────────────────────────
    'form': {
      useCases: [
        { title: 'User registration and login', icon: 'Lock' },
        { title: 'Settings and preferences panels', icon: 'Gear' },
        { title: 'Contact and feedback forms', icon: 'Envelope' },
        { title: 'Multi-step data collection', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'Show validation errors inline next to the relevant field',
          'Group related fields with clear section headings',
          'Use Zod or similar for schema-based validation',
          'Indicate required fields clearly',
        ],
        donts: [
          'Don\'t validate on every keystroke — use onBlur or onSubmit',
          'Don\'t reset the form on validation error',
          'Don\'t mix controlled and uncontrolled inputs',
        ],
      },
      related: [
        { slug: 'input', name: 'Input', description: 'Text entry field' },
        { slug: 'checkbox', name: 'Checkbox', description: 'Multi-select form control' },
        { slug: 'select', name: 'Select', description: 'Dropdown selection' },
      ],
    },
    'checkbox': {
      useCases: [
        { title: 'Terms and conditions acceptance', icon: 'Checks' },
        { title: 'Multi-select filters', icon: 'MagnifyingGlass' },
        { title: 'Bulk action selection in tables', icon: 'CheckSquare' },
        { title: 'Feature toggles in settings', icon: 'Gear' },
      ],
      bestPractices: {
        dos: [
          'Always pair with a Label for accessibility',
          'Use indeterminate state for parent checkboxes in tree selections',
          'Group related checkboxes visually',
        ],
        donts: [
          'Don\'t use for binary toggles — use Switch instead',
          'Don\'t use for single-choice selections — use RadioGroup',
          'Don\'t place checkboxes too close together on mobile',
        ],
      },
      related: [
        { slug: 'radio-group', name: 'Radio Group', description: 'Single selection from options' },
        { slug: 'switch', name: 'Switch', description: 'Binary toggle control' },
        { slug: 'label', name: 'Label', description: 'Accessible label pairing' },
      ],
    },
    'switch': {
      useCases: [
        { title: 'Instant on/off toggles (dark mode, notifications)', icon: 'ArrowsClockwise' },
        { title: 'Feature flags in settings panels', icon: 'Gear' },
        { title: 'Privacy and preference controls', icon: 'Lock' },
        { title: 'Accessibility preferences (reduce motion, contrast)', icon: 'Eye' },
      ],
      bestPractices: {
        dos: [
          'Apply changes immediately — no submit button needed',
          'Use clear labels describing what happens when enabled',
          'Show the current state visually (color, position)',
        ],
        donts: [
          'Don\'t use for choices that require confirmation — use Checkbox in a form',
          'Don\'t use for multi-option selections',
          'Don\'t change the label text based on state',
        ],
      },
      related: [
        { slug: 'checkbox', name: 'Checkbox', description: 'Form-based boolean control' },
        { slug: 'radio-group', name: 'Radio Group', description: 'Multiple option selection' },
      ],
    },
    'radio-group': {
      useCases: [
        { title: 'Single selection from a small set (2-5 options)', icon: 'Target' },
        { title: 'Payment method selection', icon: 'CreditCard' },
        { title: 'Shipping or delivery options', icon: 'Package' },
        { title: 'Survey and questionnaire answers', icon: 'PencilSimple' },
      ],
      bestPractices: {
        dos: [
          'Pre-select a default option when possible',
          'Keep option text short and distinct',
          'Use vertical layout for more than 3 options',
        ],
        donts: [
          'Don\'t use for more than 7 options — use Select instead',
          'Don\'t use for multi-select — use Checkbox',
          'Don\'t allow deselection — radio should always have a value',
        ],
      },
      related: [
        { slug: 'checkbox', name: 'Checkbox', description: 'Multi-select alternative' },
        { slug: 'select', name: 'Select', description: 'Dropdown for many options' },
      ],
    },
    'select': {
      useCases: [
        { title: 'Choosing from a long list of options', icon: 'ListBullets' },
        { title: 'Country, language, or timezone selectors', icon: 'Globe' },
        { title: 'Filter and sort controls', icon: 'MagnifyingGlass' },
        { title: 'Category assignment in forms', icon: 'Tag' },
      ],
      bestPractices: {
        dos: [
          'Include a placeholder option ("Select...")',
          'Group related options with optgroup-style separators',
          'Support keyboard navigation and type-ahead filtering',
        ],
        donts: [
          'Don\'t use for fewer than 5 options — use RadioGroup instead',
          'Don\'t nest too many levels of option groups',
          'Don\'t use when users need to see all options at once',
        ],
      },
      related: [
        { slug: 'radio-group', name: 'Radio Group', description: 'Visible option selection' },
        { slug: 'command', name: 'Command', description: 'Searchable command palette' },
      ],
    },
    'slider': {
      useCases: [
        { title: 'Volume and brightness controls', icon: 'Sliders' },
        { title: 'Price range filters', icon: 'CurrencyDollar' },
        { title: 'Image zoom or resize controls', icon: 'MagnifyingGlass' },
        { title: 'Opacity and threshold adjustments', icon: 'Palette' },
      ],
      bestPractices: {
        dos: [
          'Show the current value alongside the slider',
          'Define meaningful min/max labels',
          'Use step values appropriate for the context',
        ],
        donts: [
          'Don\'t use for precise number entry — use NumberInput instead',
          'Don\'t set extremely large ranges with small steps',
          'Don\'t use without a visible value indicator',
        ],
      },
      related: [
        { slug: 'range-slider', name: 'Range Slider', description: 'Dual-handle range selection' },
        { slug: 'number-input', name: 'Number Input', description: 'Precise numeric entry' },
      ],
    },
    'range-slider': {
      useCases: [
        { title: 'Price range filters in e-commerce', icon: 'CurrencyDollar' },
        { title: 'Date or time range selection', icon: 'CalendarBlank' },
        { title: 'Min/max parameter controls', icon: 'ChartBar' },
        { title: 'Audio/video trimming controls', icon: 'Sliders' },
      ],
      bestPractices: {
        dos: [
          'Display both min and max values clearly',
          'Prevent min from exceeding max with validation',
          'Use appropriate step sizes for the value range',
        ],
        donts: [
          'Don\'t use for single-value selection — use Slider',
          'Don\'t set overlapping handles without visual distinction',
          'Don\'t hide the selected range visualization',
        ],
      },
      related: [
        { slug: 'slider', name: 'Slider', description: 'Single-value slider for simple adjustments' },
        { slug: 'number-input', name: 'Number Input', description: 'Precise numeric entry with stepper buttons' },
      ],
    },
    'textarea': {
      useCases: [
        { title: 'Comments and feedback forms', icon: 'ChatCentered' },
        { title: 'Bio and description fields', icon: 'PencilSimple' },
        { title: 'Notes and message composition', icon: 'Envelope' },
        { title: 'Code or content editing areas', icon: 'Laptop' },
      ],
      bestPractices: {
        dos: [
          'Set appropriate min/max rows for the content type',
          'Show character count when there\'s a limit',
          'Allow resizing when content length varies',
        ],
        donts: [
          'Don\'t use for single-line input — use Input instead',
          'Don\'t disable resize without good reason',
          'Don\'t set very small textareas for long-form content',
        ],
      },
      related: [
        { slug: 'input', name: 'Input', description: 'Single-line text entry' },
        { slug: 'rich-text-editor', name: 'Rich Text Editor', description: 'Formatted text editing' },
      ],
    },

    // ── Overlays ──────────────────────────────────────────
    'dialog': {
      useCases: [
        { title: 'Confirmation prompts (delete, discard)', icon: 'Warning' },
        { title: 'Form overlays for quick edits', icon: 'PencilSimple' },
        { title: 'Detail views and previews', icon: 'Eye' },
        { title: 'Critical alerts requiring action', icon: 'WarningCircle' },
      ],
      bestPractices: {
        dos: [
          'Trap focus inside the dialog when open',
          'Provide a clear close mechanism (button + Escape key)',
          'Use descriptive titles that explain the purpose',
          'Return focus to the trigger element on close',
        ],
        donts: [
          'Don\'t nest dialogs inside dialogs',
          'Don\'t use for simple notifications — use Toast instead',
          'Don\'t open dialogs automatically without user action',
        ],
      },
      related: [
        { slug: 'sheet', name: 'Sheet', description: 'Slide-in panel alternative' },
        { slug: 'alert', name: 'Alert', description: 'Inline alert messages' },
      ],
    },
    'sheet': {
      useCases: [
        { title: 'Mobile navigation panels', icon: 'DeviceMobile' },
        { title: 'Filter and settings sidebars', icon: 'Gear' },
        { title: 'Detail views that slide in from the edge', icon: 'ListBullets' },
        { title: 'Shopping cart or notification panels', icon: 'ShoppingCart' },
      ],
      bestPractices: {
        dos: [
          'Use appropriate side (start for nav, end for details)',
          'Include a close button and overlay click to dismiss',
          'Keep sheet content focused and scrollable',
        ],
        donts: [
          'Don\'t use for small confirmations — use Dialog instead',
          'Don\'t make sheets wider than 80% of viewport',
          'Don\'t block critical page functionality behind a sheet',
        ],
      },
      related: [
        { slug: 'dialog', name: 'Dialog', description: 'Centered modal alternative' },
      ],
    },
    'popover': {
      useCases: [
        { title: 'Rich tooltips with interactive content', icon: 'ChatCentered' },
        { title: 'Color pickers and mini-editors', icon: 'Palette' },
        { title: 'Quick actions on hover or click', icon: 'Lightning' },
        { title: 'Date/time picker containers', icon: 'CalendarBlank' },
      ],
      bestPractices: {
        dos: [
          'Position relative to trigger with collision detection',
          'Keep content concise and actionable',
          'Allow dismissal via Escape and click outside',
        ],
        donts: [
          'Don\'t use for complex forms — use Dialog instead',
          'Don\'t place important content only in popovers',
          'Don\'t open multiple popovers simultaneously',
        ],
      },
      related: [
        { slug: 'tooltip', name: 'Tooltip', description: 'Simple text hints' },
        { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Action menu' },
      ],
    },
    'tooltip': {
      useCases: [
        { title: 'Icon button descriptions', icon: 'Lightbulb' },
        { title: 'Truncated text full-value reveal', icon: 'PencilSimple' },
        { title: 'Keyboard shortcut hints', icon: 'Keyboard' },
        { title: 'Disabled element explanations', icon: 'Info' },
      ],
      bestPractices: {
        dos: [
          'Keep tooltip text short (1-2 lines maximum)',
          'Show on hover/focus with a slight delay',
          'Use for supplementary info, not essential content',
        ],
        donts: [
          'Don\'t put interactive elements inside tooltips — use Popover',
          'Don\'t use for error messages or validation feedback',
          'Don\'t rely on tooltips for mobile — they lack hover',
        ],
      },
      related: [
        { slug: 'popover', name: 'Popover', description: 'Interactive floating content' },
        { slug: 'kbd', name: 'Kbd', description: 'Keyboard shortcut display' },
      ],
    },
    'dropdown-menu': {
      useCases: [
        { title: 'Action menus (edit, delete, share)', icon: 'ListBullets' },
        { title: 'User account menus', icon: 'UserCircle' },
        { title: 'Context-sensitive operations', icon: 'Gear' },
        { title: 'Overflow menus for limited space', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'Group related items with separators',
          'Use icons to improve scannability',
          'Show keyboard shortcuts alongside actions',
        ],
        donts: [
          'Don\'t nest menus more than one level deep',
          'Don\'t use for navigation — use proper nav links',
          'Don\'t include too many items (7±2 rule)',
        ],
      },
      related: [
        { slug: 'context-menu', name: 'Context Menu', description: 'Right-click triggered menu' },
        { slug: 'select', name: 'Select', description: 'Form selection control' },
      ],
    },
    'context-menu': {
      useCases: [
        { title: 'Right-click actions on content', icon: 'Cursor' },
        { title: 'File and item operations in lists', icon: 'FileText' },
        { title: 'Canvas and editor contextual tools', icon: 'Palette' },
        { title: 'Table row operations', icon: 'Table' },
      ],
      bestPractices: {
        dos: [
          'Mirror familiar OS context menu patterns',
          'Include keyboard shortcuts for all actions',
          'Keep the menu close to the click position',
        ],
        donts: [
          'Don\'t make context menu the only way to access actions',
          'Don\'t replace browser default context menu without reason',
          'Don\'t include destructive actions without confirmation',
        ],
      },
      related: [
        { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Trigger-based action menu' },
        { slug: 'popover', name: 'Popover', description: 'Floating interactive content' },
      ],
    },
    'toast': {
      useCases: [
        { title: 'Success/error feedback after actions', icon: 'Checks' },
        { title: 'Background process completion notices', icon: 'Bell' },
        { title: 'Non-blocking system notifications', icon: 'Megaphone' },
        { title: 'Undo action confirmations', icon: 'ArrowsClockwise' },
      ],
      bestPractices: {
        dos: [
          'Auto-dismiss after a reasonable time (5-8 seconds)',
          'Include an undo action for destructive operations',
          'Use appropriate variants (success, error, warning)',
        ],
        donts: [
          'Don\'t use for critical errors requiring action — use Dialog',
          'Don\'t show too many toasts simultaneously',
          'Don\'t put essential information only in toasts',
        ],
      },
      related: [
        { slug: 'alert', name: 'Alert', description: 'Persistent inline notifications' },
        { slug: 'dialog', name: 'Dialog', description: 'Modal confirmation dialogs' },
      ],
    },

    // ── Data Display ──────────────────────────────────────
    'table': {
      useCases: [
        { title: 'Data listings and records', icon: 'ChartBar' },
        { title: 'Comparison tables', icon: 'Columns' },
        { title: 'Settings and configuration grids', icon: 'Gear' },
        { title: 'Pricing and feature comparison', icon: 'CurrencyDollar' },
      ],
      bestPractices: {
        dos: [
          'Use sticky headers for long scrollable tables',
          'Right-align numeric columns for easy scanning',
          'Provide responsive behavior (horizontal scroll or card view)',
        ],
        donts: [
          'Don\'t use for layout purposes — use CSS Grid/Flex',
          'Don\'t hide important columns on mobile without indication',
          'Don\'t use tables for fewer than 3 rows of data',
        ],
      },
      related: [
        { slug: 'data-table', name: 'Data Table', description: 'Advanced table with sorting/filtering' },
        { slug: 'pagination', name: 'Pagination', description: 'Table page navigation' },
      ],
    },
    'data-table': {
      useCases: [
        { title: 'Admin dashboards with sorting and filtering', icon: 'Database' },
        { title: 'Transaction and order history', icon: 'FileText' },
        { title: 'User management interfaces', icon: 'Users' },
        { title: 'Searchable data records', icon: 'MagnifyingGlass' },
      ],
      bestPractices: {
        dos: [
          'Enable column sorting for key fields',
          'Provide pagination for large datasets',
          'Show loading states during data fetches',
          'Allow column visibility customization',
        ],
        donts: [
          'Don\'t load all data at once for large datasets',
          'Don\'t enable sorting on columns with identical values',
          'Don\'t remove pagination controls',
        ],
      },
      related: [
        { slug: 'table', name: 'Table', description: 'Simple table without features' },
        { slug: 'pagination', name: 'Pagination', description: 'Page navigation for tables' },
      ],
    },
    'pagination': {
      useCases: [
        { title: 'Table and list navigation', icon: 'FileText' },
        { title: 'Search results pages', icon: 'MagnifyingGlass' },
        { title: 'Blog post archives', icon: 'Newspaper' },
        { title: 'Image gallery navigation', icon: 'Image' },
      ],
      bestPractices: {
        dos: [
          'Show current page and total pages',
          'Provide first/last page shortcuts',
          'Keep pagination visible and accessible',
        ],
        donts: [
          'Don\'t show too many page numbers — use ellipsis',
          'Don\'t reset scroll position without indication',
          'Don\'t hide pagination when there\'s only one page',
        ],
      },
      related: [
        { slug: 'table', name: 'Table', description: 'Table data navigation' },
        { slug: 'data-table', name: 'Data Table', description: 'Feature-rich table' },
      ],
    },
    'tabs': {
      useCases: [
        { title: 'Content organization by category', icon: 'FileText' },
        { title: 'Settings panels with sections', icon: 'Gear' },
        { title: 'Dashboard view switchers', icon: 'ChartBar' },
        { title: 'Multi-step form alternatives', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'Keep tab labels short and descriptive',
          'Show the active tab clearly with visual emphasis',
          'Preserve tab content state when switching',
        ],
        donts: [
          'Don\'t use more than 5-6 tabs — consider other navigation',
          'Don\'t use tabs for sequential steps — use Stepper',
          'Don\'t hide critical content behind secondary tabs',
        ],
      },
      related: [
        { slug: 'accordion', name: 'Accordion', description: 'Collapsible content sections' },
      ],
    },
    'accordion': {
      useCases: [
        { title: 'FAQ sections', icon: 'Question' },
        { title: 'Collapsible settings groups', icon: 'Gear' },
        { title: 'Progressive disclosure of complex content', icon: 'BookOpen' },
        { title: 'Mobile-friendly content condensation', icon: 'DeviceMobile' },
      ],
      bestPractices: {
        dos: [
          'Use descriptive headers that preview the content',
          'Allow multiple items open simultaneously when useful',
          'Animate open/close for smooth transitions',
        ],
        donts: [
          'Don\'t nest accordions inside accordions',
          'Don\'t use for primary content that all users need',
          'Don\'t put critical actions inside collapsed sections',
        ],
      },
      related: [
        { slug: 'collapsible', name: 'Collapsible', description: 'Simple expand/collapse for single sections' },
        { slug: 'tabs', name: 'Tabs', description: 'Switch between content panels' },
      ],
    },
    'collapsible': {
      useCases: [
        { title: 'Show/hide additional details', icon: 'Eye' },
        { title: 'Advanced options in forms', icon: 'Gear' },
        { title: 'Expandable code blocks or logs', icon: 'Laptop' },
        { title: 'FAQ answers and help sections', icon: 'Question' },
      ],
      bestPractices: {
        dos: [
          'Use a clear trigger label indicating what will appear',
          'Animate height transitions smoothly',
          'Preserve state across re-renders',
        ],
        donts: [
          'Don\'t hide required form fields in collapsible sections',
          'Don\'t use for content that most users need to see',
          'Don\'t use when Accordion with headers would be clearer',
        ],
      },
      related: [
        { slug: 'accordion', name: 'Accordion', description: 'Multi-section expand/collapse' },
        { slug: 'tabs', name: 'Tabs', description: 'Alternative content organization' },
      ],
    },
    'breadcrumb': {
      useCases: [
        { title: 'Hierarchical page navigation', icon: 'NavigationArrow' },
        { title: 'E-commerce category trails', icon: 'ShoppingCart' },
        { title: 'Documentation section paths', icon: 'BookOpen' },
        { title: 'File system navigation paths', icon: 'FileText' },
      ],
      bestPractices: {
        dos: [
          'Show the full hierarchy path from root',
          'Make each breadcrumb level clickable except the current page',
          'Truncate with ellipsis for deep hierarchies',
        ],
        donts: [
          'Don\'t use breadcrumbs as the sole navigation method',
          'Don\'t include the home page if already in the main nav',
          'Don\'t show breadcrumbs on the homepage itself',
        ],
      },
      related: [
        { slug: 'pagination', name: 'Pagination', description: 'Sequential page navigation' },
        { slug: 'tabs', name: 'Tabs', description: 'Alternative content navigation' },
      ],
    },
    'command': {
      useCases: [
        { title: 'Command palettes (⌘K)', icon: 'Keyboard' },
        { title: 'Global search interfaces', icon: 'MagnifyingGlass' },
        { title: 'Quick action launchers', icon: 'Lightning' },
        { title: 'Searchable option pickers', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'Support keyboard-first navigation (arrows, Enter)',
          'Group commands by category with headings',
          'Show keyboard shortcuts alongside commands',
        ],
        donts: [
          'Don\'t include too many items without search filtering',
          'Don\'t use for simple selections — use Select',
          'Don\'t open automatically without user intent',
        ],
      },
      related: [
        { slug: 'select', name: 'Select', description: 'Simple dropdown selection without search' },
        { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Action menu without search functionality' },
      ],
    },

    // ── Advanced Forms ────────────────────────────────────
    'date-picker': {
      bestPractices: {
        dos: [
          'Show a clear date format placeholder (e.g., DD/MM/YYYY)',
          'Support both calendar and manual text input',
          'Respect locale for date formatting and first day of week',
          'Disable invalid dates (past dates for future events, etc.)',
        ],
        donts: [
          'Don\'t default to today if the context doesn\'t warrant it',
          'Don\'t use for selecting a time — combine with TimePicker',
          'Don\'t show too many months at once on mobile',
        ],
      },
      related: [
        { slug: 'calendar', name: 'Calendar', description: 'Standalone calendar grid for date browsing' },
        { slug: 'time-picker', name: 'Time Picker', description: 'Time selection companion for date pickers' },
      ],
    },
    'time-picker': {
      bestPractices: {
        dos: [
          'Support both 12-hour and 24-hour formats based on locale',
          'Allow keyboard input alongside the picker UI',
          'Show AM/PM clearly in 12-hour mode',
        ],
        donts: [
          'Don\'t force a specific time format regardless of locale',
          'Don\'t use minute steps larger than 15 for general use',
          'Don\'t hide the current selection',
        ],
      },
      related: [
        { slug: 'date-picker', name: 'Date Picker', description: 'Date selection companion for time pickers' },
      ],
    },
    'file-upload': {
      useCases: [
        { title: 'Document uploads in forms', icon: 'FileText' },
        { title: 'Image and media attachment', icon: 'Image' },
        { title: 'Bulk file import workflows', icon: 'Package' },
        { title: 'Profile picture selection', icon: 'UserCircle' },
      ],
      related: [
        { slug: 'input', name: 'Input', description: 'Text input for manual file path entry' },
        { slug: 'form', name: 'Form', description: 'Form wrapper for file upload validation' },
      ],
    },
    'number-input': {
      bestPractices: {
        dos: [
          'Set appropriate min, max, and step values',
          'Show the unit alongside the input when applicable',
          'Allow both keyboard entry and stepper button usage',
        ],
        donts: [
          'Don\'t use for non-numeric input like phone numbers — use Input with tel type',
          'Don\'t set step values that make reaching the target difficult',
          'Don\'t allow values outside the valid range',
        ],
      },
      related: [
        { slug: 'slider', name: 'Slider', description: 'Visual range control for approximate values' },
        { slug: 'input', name: 'Input', description: 'General text input for free-form values' },
      ],
    },
    'rich-text-editor': {
      useCases: [
        { title: 'Blog post and article editing', icon: 'PencilSimple' },
        { title: 'Email composition with formatting', icon: 'Envelope' },
        { title: 'Documentation and wiki content', icon: 'BookOpen' },
        { title: 'Comment and feedback forms with formatting', icon: 'ChatCentered' },
      ],
      bestPractices: {
        dos: [
          'Provide a clear toolbar with essential formatting options',
          'Support keyboard shortcuts for common operations',
          'Handle paste from external sources cleanly',
        ],
        donts: [
          'Don\'t include too many toolbar options — show essentials',
          'Don\'t allow arbitrary HTML injection',
          'Don\'t lose content on accidental navigation',
        ],
      },
      related: [
        { slug: 'textarea', name: 'Textarea', description: 'Plain text area without formatting' },
        { slug: 'form', name: 'Form', description: 'Form integration for editor content validation' },
      ],
    },
    'calendar': {
      useCases: [
        { title: 'Event scheduling views', icon: 'CalendarBlank' },
        { title: 'Availability and booking displays', icon: 'House' },
        { title: 'Hijri/Gregorian date browsing', icon: 'Mosque' },
        { title: 'Date range selection interfaces', icon: 'CalendarBlank' },
      ],
      bestPractices: {
        dos: [
          'Highlight today\'s date and selected dates clearly',
          'Support keyboard navigation between dates',
          'Show month and year navigation controls',
        ],
        donts: [
          'Don\'t overcrowd cells with too much event data',
          'Don\'t make navigation between months slow or jumpy',
          'Don\'t ignore locale settings for first day of week',
        ],
      },
      related: [
        { slug: 'date-picker', name: 'Date Picker', description: 'Date selection with input field' },
        { slug: 'hijri-date', name: 'Hijri Date', description: 'Islamic calendar date display' },
      ],
    },
    'progress': {
      useCases: [
        { title: 'File upload progress indicators', icon: 'Upload' },
        { title: 'Step completion tracking', icon: 'ChartBar' },
        { title: 'Loading bars for long operations', icon: 'ClockCountdown' },
        { title: 'Profile completion indicators', icon: 'UserCircle' },
      ],
      bestPractices: {
        dos: [
          'Show percentage or step count alongside the bar',
          'Use indeterminate state when duration is unknown',
          'Animate progress smoothly for better UX',
        ],
        donts: [
          'Don\'t use for short operations — use Spinner instead',
          'Don\'t fake progress percentages',
          'Don\'t use without accessible label (aria-label)',
        ],
      },
      related: [
        { slug: 'skeleton', name: 'Skeleton', description: 'Content placeholder loading' },
      ],
    },
    'skeleton': {
      useCases: [
        { title: 'Content placeholders during loading', icon: 'CircleNotch' },
        { title: 'Card and list shimmer effects', icon: 'Sparkle' },
        { title: 'Image placeholder before load', icon: 'Image' },
        { title: 'Dashboard widget loading states', icon: 'Layout' },
      ],
      bestPractices: {
        dos: [
          'Match skeleton shape to actual content layout',
          'Use subtle animation to indicate loading',
          'Show skeletons immediately — don\'t delay',
        ],
        donts: [
          'Don\'t show skeletons for more than a few seconds — show error state',
          'Don\'t use for instant-load content',
          'Don\'t mismatch skeleton shape and real content layout',
        ],
      },
      related: [
        { slug: 'progress', name: 'Progress', description: 'Determinate loading indicator' },
      ],
    },
    'notification-center': {
      useCases: [
        { title: 'App notification hub with bell icon', icon: 'Bell' },
        { title: 'Activity feed displays', icon: 'ListBullets' },
        { title: 'System message aggregation', icon: 'Megaphone' },
        { title: 'Task assignment alerts', icon: 'Checks' },
      ],
      related: [
        { slug: 'toast', name: 'Toast', description: 'Transient notifications that auto-dismiss' },
        { slug: 'alert', name: 'Alert', description: 'Persistent inline alerts for important messages' },
      ],
    },

    // ── Feedback & Misc ──────────────────────────────────
    'alert': {
      useCases: [
        { title: 'System status messages', icon: 'Megaphone' },
        { title: 'Form validation summaries', icon: 'Warning' },
        { title: 'Feature announcements', icon: 'Megaphone' },
        { title: 'Important notices that persist', icon: 'PushPin' },
      ],
      bestPractices: {
        dos: [
          'Use appropriate variants (info, success, warning, destructive)',
          'Keep alert text concise and actionable',
          'Include a dismiss option for non-critical alerts',
        ],
        donts: [
          'Don\'t use for transient messages — use Toast instead',
          'Don\'t stack too many alerts on one page',
          'Don\'t use destructive variant for non-critical information',
        ],
      },
      related: [
        { slug: 'toast', name: 'Toast', description: 'Transient notifications that auto-dismiss' },
        { slug: 'dialog', name: 'Dialog', description: 'Modal dialogs for critical actions' },
      ],
    },
    'callout': {
      useCases: [
        { title: 'Documentation tips and notes', icon: 'Lightbulb' },
        { title: 'Important warnings in guides', icon: 'Warning' },
        { title: 'Highlighted information blocks', icon: 'PushPin' },
        { title: 'Breaking changes in changelogs', icon: 'WarningCircle' },
      ],
      related: [
        { slug: 'alert', name: 'Alert', description: 'System-level status messages with variants' },
        { slug: 'blockquote', name: 'Blockquote', description: 'Quoted content with attribution' },
      ],
    },
    'stepper': {
      bestPractices: {
        dos: [
          'Show clear step labels and progress indication',
          'Allow navigation to completed steps',
          'Keep step count manageable (3-5 steps ideal)',
        ],
        donts: [
          'Don\'t allow skipping required steps',
          'Don\'t use for non-sequential processes — use Tabs',
          'Don\'t show too many steps on mobile without adaptation',
        ],
      },
      related: [
        { slug: 'timeline', name: 'Timeline', description: 'Chronological event display' },
        { slug: 'progress', name: 'Progress', description: 'Linear progress indicator' },
      ],
    },
    'reaction-picker': {
      related: [
        { slug: 'popover', name: 'Popover', description: 'Floating overlay container for the picker' },
      ],
    },
    'user-badge': {
      bestPractices: {
        dos: [
          'Use consistent status colors across your application',
          'Include an accessible label for the status',
          'Keep badge text short (1-2 words)',
        ],
        donts: [
          'Don\'t use too many different status types in one view',
          'Don\'t rely on color alone — add text or icons for accessibility',
          'Don\'t use for decorative purposes',
        ],
      },
      related: [
        { slug: 'badge', name: 'Badge', description: 'Simple status and count indicators' },
        { slug: 'avatar', name: 'Avatar', description: 'User profile image display' },
      ],
    },
    'content-renderer': {
      useCases: [
        { title: 'Rendering markdown or HTML content', icon: 'PencilSimple' },
        { title: 'CMS-driven page content display', icon: 'FileText' },
        { title: 'Preview panels for rich text editors', icon: 'Eye' },
        { title: 'Help center article displays', icon: 'Question' },
      ],
      bestPractices: {
        dos: [
          'Sanitize HTML content before rendering',
          'Apply consistent typography styles',
          'Handle missing or empty content gracefully',
        ],
        donts: [
          'Don\'t render unsanitized user-provided HTML',
          'Don\'t override the content\'s semantic structure',
          'Don\'t apply conflicting styles to rendered content',
        ],
      },
      related: [
        { slug: 'blockquote', name: 'Blockquote', description: 'Styled quotation blocks' },
        { slug: 'callout', name: 'Callout', description: 'Highlighted information blocks' },
      ],
    },
    'kbd': {
      useCases: [
        { title: 'Keyboard shortcut documentation', icon: 'Keyboard' },
        { title: 'Hotkey indicators in menus', icon: 'ListBullets' },
        { title: 'Command reference displays', icon: 'Lightbulb' },
        { title: 'Accessibility guides and instructions', icon: 'BookOpen' },
      ],
      related: [
        { slug: 'tooltip', name: 'Tooltip', description: 'Contextual hints that can include keyboard shortcuts' },
      ],
    },
    'blockquote': {
      useCases: [
        { title: 'Testimonial sections', icon: 'ChatCentered' },
        { title: 'Article citations and quotes', icon: 'Quotes' },
        { title: 'Pull quotes in long-form content', icon: 'PencilSimple' },
        { title: 'Customer review highlights', icon: 'Star' },
      ],
      related: [
        { slug: 'pull-quote', name: 'Pull Quote', description: 'Highlighted excerpt for emphasis' },
        { slug: 'callout', name: 'Callout', description: 'Informational callout blocks' },
      ],
    },
    'pull-quote': {
      useCases: [
        { title: 'Editorial emphasis in articles', icon: 'Sparkle' },
        { title: 'Key takeaway highlights', icon: 'Star' },
        { title: 'Magazine-style text features', icon: 'Newspaper' },
        { title: 'Annual report callouts', icon: 'ChartBar' },
      ],
      bestPractices: {
        dos: [
          'Use sparingly for maximum impact — one per section',
          'Choose quotes that summarize the key message',
          'Style distinctly from regular body text',
        ],
        donts: [
          'Don\'t use for citations with attribution — use Blockquote',
          'Don\'t overuse — it dilutes impact',
          'Don\'t use text that needs context to understand',
        ],
      },
      related: [
        { slug: 'blockquote', name: 'Blockquote', description: 'Quoted content with attribution' },
        { slug: 'callout', name: 'Callout', description: 'Informational highlight blocks' },
      ],
    },
    'empty-state': {
      useCases: [
        { title: 'First-run experience screens', icon: 'Star' },
        { title: 'No search results placeholders', icon: 'MagnifyingGlass' },
        { title: 'Empty collection views', icon: 'Tray' },
        { title: 'Error state recovery screens', icon: 'Gear' },
      ],
      related: [
        { slug: 'button', name: 'Button', description: 'Action trigger for empty state CTAs' },
        { slug: 'card', name: 'Card', description: 'Container for empty state content' },
      ],
    },
    'dashboard-shell': {
      useCases: [
        { title: 'Admin panel layouts', icon: 'Laptop' },
        { title: 'SaaS application shells', icon: 'Buildings' },
        { title: 'Analytics dashboard frames', icon: 'ChartBar' },
        { title: 'Content management systems', icon: 'FileText' },
      ],
      related: [
        { slug: 'stats-card', name: 'Stats Card', description: 'Metric display cards for dashboard content' },
        { slug: 'notification-center', name: 'Notification Center', description: 'Notification hub for the dashboard header' },
      ],
    },
    'user-menu': {
      useCases: [
        { title: 'Header profile dropdown', icon: 'UserCircle' },
        { title: 'Account settings quick access', icon: 'Gear' },
        { title: 'Logout and session controls', icon: 'Lock' },
        { title: 'Theme and language preferences', icon: 'Palette' },
      ],
      related: [
        { slug: 'avatar', name: 'Avatar', description: 'User avatar that triggers the menu' },
        { slug: 'dropdown-menu', name: 'Dropdown Menu', description: 'Base menu component for custom menus' },
      ],
    },
    'stats-card': {
      useCases: [
        { title: 'Dashboard KPI displays', icon: 'ChartBar' },
        { title: 'Revenue and metric summaries', icon: 'CurrencyDollar' },
        { title: 'Performance overview panels', icon: 'ChartLine' },
        { title: 'Real-time monitoring widgets', icon: 'Gauge' },
      ],
      related: [
        { slug: 'card', name: 'Card', description: 'Base card component for custom layouts' },
        { slug: 'chart', name: 'Chart', description: 'Visual data representation for trends' },
      ],
    },
    'listing-card': {
      bestPractices: {
        dos: [
          'Use consistent image aspect ratios in card grids',
          'Show key info (price, status) prominently',
          'Include a clear call-to-action',
        ],
        donts: [
          'Don\'t overcrowd with too much metadata',
          'Don\'t use for non-listing content — use Card instead',
          'Don\'t hide the primary action behind hover effects',
        ],
      },
      related: [
        { slug: 'card', name: 'Card', description: 'Base card for general content containers' },
        { slug: 'badge', name: 'Badge', description: 'Status and label badges for card metadata' },
      ],
    },

    // ── AI/LLM Components ─────────────────────────────────
    'chat-message': {
      useCases: [
        { title: 'LLM conversation interfaces', icon: 'Robot' },
        { title: 'Customer support chat UIs', icon: 'ChatCentered' },
        { title: 'Multi-turn dialogue displays', icon: 'ArrowsClockwise' },
        { title: 'Team collaboration threads', icon: 'Users' },
      ],
      bestPractices: {
        dos: [
          'Visually distinguish user and assistant messages',
          'Support markdown rendering in assistant responses',
          'Show timestamps for long conversations',
        ],
        donts: [
          'Don\'t make messages too wide — limit max-width for readability',
          'Don\'t lose scroll position during streaming',
          'Don\'t block interaction while a response is generating',
        ],
      },
      related: [
        { slug: 'message-actions', name: 'Message Actions', description: 'Actions toolbar for messages' },
        { slug: 'thinking-indicator', name: 'Thinking Indicator', description: 'Loading state for AI responses' },
      ],
    },
    'prompt-input': {
      useCases: [
        { title: 'AI chat input fields', icon: 'ChatCentered' },
        { title: 'Search-as-you-type interfaces', icon: 'MagnifyingGlass' },
        { title: 'Command input with auto-complete', icon: 'Keyboard' },
        { title: 'Code generation prompts', icon: 'Laptop' },
      ],
      bestPractices: {
        dos: [
          'Show a clear send/submit button',
          'Support multi-line input with auto-grow',
          'Disable send while a response is being generated',
        ],
        donts: [
          'Don\'t clear input on error — preserve user\'s text',
          'Don\'t submit on Enter if multi-line is expected',
          'Don\'t hide the input during response generation',
        ],
      },
      related: [
        { slug: 'textarea', name: 'Textarea', description: 'Multi-line text input' },
        { slug: 'token-counter', name: 'Token Counter', description: 'Input length monitor' },
      ],
    },
    'thinking-indicator': {
      useCases: [
        { title: 'AI response generation feedback', icon: 'Brain' },
        { title: 'Long processing state indication', icon: 'ClockCountdown' },
        { title: 'Typing indicators in chat', icon: 'ChatCentered' },
        { title: 'Search result computation feedback', icon: 'MagnifyingGlass' },
      ],
      bestPractices: {
        dos: [
          'Show immediately when processing starts',
          'Animate to convey activity',
          'Include an accessible label (aria-label)',
        ],
        donts: [
          'Don\'t keep showing after response arrives',
          'Don\'t use for instant operations',
          'Don\'t block the UI while showing the indicator',
        ],
      },
      related: [
        { slug: 'chat-message', name: 'Chat Message', description: 'Message display' },
      ],
    },
    'message-actions': {
      useCases: [
        { title: 'Copy, regenerate, and rate AI responses', icon: 'ListBullets' },
        { title: 'Message-level actions in chat', icon: 'Lightning' },
        { title: 'Feedback collection on generated content', icon: 'Medal' },
        { title: 'Share and export options for responses', icon: 'Upload' },
      ],
      bestPractices: {
        dos: [
          'Show actions on hover or focus for clean UI',
          'Include copy-to-clipboard as a standard action',
          'Position consistently relative to the message',
        ],
        donts: [
          'Don\'t show too many actions — group less common ones in a menu',
          'Don\'t make actions compete with message content for attention',
          'Don\'t omit keyboard accessibility for action buttons',
        ],
      },
      related: [
        { slug: 'chat-message', name: 'Chat Message', description: 'Message display component' },
      ],
    },
    'model-selector': {
      useCases: [
        { title: 'AI model switching in chat interfaces', icon: 'Robot' },
        { title: 'Model comparison tools', icon: 'Columns' },
        { title: 'API configuration panels', icon: 'Gear' },
        { title: 'Cost-tier selection for API usage', icon: 'CurrencyDollar' },
      ],
      bestPractices: {
        dos: [
          'Show model capabilities alongside names',
          'Indicate the currently active model clearly',
          'Group models by provider or capability',
        ],
        donts: [
          'Don\'t show too many options without categorization',
          'Don\'t allow model switching mid-conversation without warning',
          'Don\'t hide model-specific limitations',
        ],
      },
      related: [
        { slug: 'parameter-slider', name: 'Parameter Slider', description: 'Model parameter controls (temperature, etc.)' },
        { slug: 'select', name: 'Select', description: 'Base select component for simpler model pickers' },
      ],
    },
    'parameter-slider': {
      useCases: [
        { title: 'AI temperature and top-p controls', icon: 'Gauge' },
        { title: 'Generation length settings', icon: 'Sliders' },
        { title: 'Model parameter fine-tuning', icon: 'Gauge' },
        { title: 'Creativity vs accuracy trade-off controls', icon: 'Sliders' },
      ],
      bestPractices: {
        dos: [
          'Show the current value and parameter name clearly',
          'Provide sensible defaults for each parameter',
          'Include tooltips explaining what each parameter does',
        ],
        donts: [
          'Don\'t allow invalid parameter combinations',
          'Don\'t use without labels — always name the parameter',
          'Don\'t hide the numeric value',
        ],
      },
      related: [
        { slug: 'slider', name: 'Slider', description: 'General-purpose slider' },
        { slug: 'model-selector', name: 'Model Selector', description: 'AI model picker' },
      ],
    },
    'token-counter': {
      useCases: [
        { title: 'Input length monitoring for API limits', icon: 'Hash' },
        { title: 'Cost estimation before API calls', icon: 'CurrencyDollar' },
        { title: 'Context window usage display', icon: 'ChartBar' },
        { title: 'Batch processing budget monitors', icon: 'ChartBar' },
      ],
      bestPractices: {
        dos: [
          'Update count in real-time as the user types',
          'Show visual warning as limit approaches',
          'Display both current count and maximum',
        ],
        donts: [
          'Don\'t block input when limit is reached — warn instead',
          'Don\'t use exact token counts when an estimate suffices',
          'Don\'t make the counter too prominent for short inputs',
        ],
      },
      related: [
        { slug: 'prompt-input', name: 'Prompt Input', description: 'Chat input companion' },
      ],
    },
    'conversation-history': {
      useCases: [
        { title: 'Chat session management sidebar', icon: 'Quotes' },
        { title: 'Conversation search and filtering', icon: 'MagnifyingGlass' },
        { title: 'Session restore and continuation', icon: 'ArrowsClockwise' },
        { title: 'Chat export and backup workflows', icon: 'Download' },
      ],
      bestPractices: {
        dos: [
          'Show conversation titles or previews',
          'Allow renaming and deletion of conversations',
          'Sort by most recent by default',
        ],
        donts: [
          'Don\'t load full conversation content in the list view',
          'Don\'t delete without confirmation',
          'Don\'t make the active conversation hard to identify',
        ],
      },
      related: [
        { slug: 'chat-message', name: 'Chat Message', description: 'Individual message display' },
        { slug: 'prompt-input', name: 'Prompt Input', description: 'Chat input companion' },
      ],
    },

    // ── GCC/Islamic ───────────────────────────────────────
    'arabic-number': {
      bestPractices: {
        dos: [
          'Use Eastern Arabic numerals (٠١٢٣) for Arabic contexts',
          'Support both numeral systems based on locale',
          'Apply proper number formatting (thousands separators)',
        ],
        donts: [
          'Don\'t mix numeral systems within the same view',
          'Don\'t assume all Arabic locales prefer Eastern numerals',
          'Don\'t hardcode number formatting — use locale-aware formatting',
        ],
      },
      related: [
        { slug: 'hijri-date', name: 'Hijri Date', description: 'Islamic date with Arabic numerals' },
      ],
    },
    'hijri-date': {
      useCases: [
        { title: 'Islamic calendar date displays', icon: 'Mosque' },
        { title: 'Dual calendar date pickers', icon: 'CalendarBlank' },
        { title: 'Religious event date references', icon: 'Moon' },
        { title: 'Government document date headers', icon: 'Certificate' },
      ],
      bestPractices: {
        dos: [
          'Show both Hijri and Gregorian dates when relevant',
          'Use the correct month names in Arabic',
          'Support Umm al-Qura calendar for Saudi contexts',
        ],
        donts: [
          'Don\'t assume one-to-one month mapping between calendars',
          'Don\'t use Western numerals for Hijri dates in Arabic context',
          'Don\'t omit the calendar system indicator',
        ],
      },
      related: [
        { slug: 'calendar', name: 'Calendar', description: 'Calendar grid component' },
        { slug: 'arabic-number', name: 'Arabic Number', description: 'Eastern Arabic numeral display' },
      ],
    },
    'prayer-times': {
      useCases: [
        { title: 'Daily prayer schedule widgets', icon: 'Clock' },
        { title: 'Mosque and community apps', icon: 'Mosque' },
        { title: 'Islamic lifestyle applications', icon: 'Moon' },
        { title: 'Ramadan and fasting schedule tools', icon: 'Moon' },
      ],
      bestPractices: {
        dos: [
          'Highlight the next upcoming prayer clearly',
          'Show countdown to next prayer time',
          'Support multiple calculation methods',
        ],
        donts: [
          'Don\'t hardcode prayer times — always calculate for location',
          'Don\'t forget to account for DST changes',
          'Don\'t omit accessibility labels for each prayer time',
        ],
      },
      related: [
        { slug: 'hijri-date', name: 'Hijri Date', description: 'Islamic date display' },
        { slug: 'card', name: 'Card', description: 'Container for prayer widgets' },
      ],
    },
    'zakat-calculator': {
      useCases: [
        { title: 'Personal Zakat estimation tools', icon: 'HandCoins' },
        { title: 'Islamic finance applications', icon: 'CurrencyDollar' },
        { title: 'Charity and donation platforms', icon: 'HandCoins' },
        { title: 'Year-end financial planning tools', icon: 'CalendarBlank' },
      ],
      bestPractices: {
        dos: [
          'Support multiple asset types (gold, silver, cash, stocks)',
          'Show the Nisab threshold clearly',
          'Allow currency selection with proper formatting',
        ],
        donts: [
          'Don\'t present results as definitive religious rulings',
          'Don\'t forget to include a disclaimer about consulting scholars',
          'Don\'t use outdated Nisab values — fetch current prices',
        ],
      },
      related: [
        { slug: 'number-input', name: 'Number Input', description: 'Numeric entry for amounts' },
        { slug: 'card', name: 'Card', description: 'Container for calculator sections' },
      ],
    },
    'chart': {
      bestPractices: {
        dos: [
          'Use appropriate chart types for the data (bar, line, donut)',
          'Provide clear axis labels and legends',
          'Ensure colors have sufficient contrast for accessibility',
        ],
        donts: [
          'Don\'t use 3D effects that distort data perception',
          'Don\'t overcrowd charts with too many data series',
          'Don\'t forget to handle empty or loading data states',
        ],
      },
      related: [
        { slug: 'stats-card', name: 'Stats Card', description: 'Companion KPI display' },
        { slug: 'data-table', name: 'Data Table', description: 'Tabular data alongside charts' },
      ],
    },
    'timeline': {
      bestPractices: {
        dos: [
          'Use clear visual markers for each event status',
          'Show dates/times alongside event descriptions',
          'Support both vertical and horizontal layouts where appropriate',
        ],
        donts: [
          'Don\'t use for sequential steps — use Stepper instead',
          'Don\'t show too many events without pagination or scrolling',
          'Don\'t omit status indicators for events',
        ],
      },
      related: [
        { slug: 'stepper', name: 'Stepper', description: 'Sequential step process' },
        { slug: 'progress', name: 'Progress', description: 'Linear progress indicator' },
      ],
    },
    'carousel': {
      bestPractices: {
        dos: [
          'Provide navigation controls (arrows + dots)',
          'Support keyboard and swipe navigation',
          'Pause autoplay on hover and focus',
        ],
        donts: [
          'Don\'t use autoplay for important content',
          'Don\'t make carousel the only way to access content',
          'Don\'t hide navigation controls completely',
        ],
      },
      related: [
        { slug: 'tabs', name: 'Tabs', description: 'Alternative panel navigation' },
        { slug: 'pagination', name: 'Pagination', description: 'Page-level navigation' },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════
  //  ARABIC
  // ═══════════════════════════════════════════════════════════
  ar: {
    // ── Core ──────────────────────────────────────────────
    'button': {
      useCases: [
        { title: 'إرسال النماذج وتنفيذ الإجراءات', icon: 'PencilSimple' },
        { title: 'محفّزات الدعوة إلى الإجراء', icon: 'Target' },
        { title: 'فتح الحوارات والنوافذ المنبثقة', icon: 'ChatCentered' },
        { title: 'التبديل وتغيير الحالات', icon: 'ArrowsClockwise' },
      ],
      bestPractices: {
        dos: [
          'استخدم تسميات واضحة موجّهة للإجراء (مثل "حفظ التغييرات")',
          'أظهر حالة التحميل للإجراءات غير المتزامنة',
          'استخدم النمط الأساسي للإجراء الرئيسي في الصفحة',
          'تأكد من حجم كافٍ لأهداف اللمس (44×44 بكسل كحد أدنى)',
        ],
        donts: [
          'لا تستخدم الأزرار للتنقّل — استخدم الروابط أو ButtonArrow',
          'لا تضع أزراراً أساسية متعددة في عرض واحد',
          'لا تعطّل الأزرار دون توضيح السبب',
          'لا تُدمج عناصر تفاعلية داخل الأزرار',
        ],
      },
      related: [
        { slug: 'button-arrow', name: 'زر السهم', description: 'زر اتجاهي مع انعكاس تلقائي للسهم في RTL' },
        { slug: 'badge', name: 'الشارة', description: 'مؤشرات الحالة التي تتناسب مع أزرار الإجراءات' },
      ],
    },
    'button-arrow': {
      useCases: [
        { title: 'التنقّل للأمام والخلف', icon: 'ArrowRight' },
        { title: 'عناصر التحكم في التصفّح', icon: 'FileText' },
        { title: 'التنقّل بين خطوات المعالج', icon: 'Hash' },
        { title: 'روابط العودة', icon: 'ArrowBendUpLeft' },
      ],
      bestPractices: {
        dos: [
          'استخدم الاتجاهات الدلالية (أمام/خلف) بدلاً من يسار/يمين',
          'أرفق تسميات وصفية لتسهيل الوصول',
          'استخدم نمط outline للتنقّل الثانوي',
        ],
        donts: [
          'لا تستخدمه لإجراءات غير اتجاهية',
          'لا تخلط بين ButtonArrow والزر العادي لنفس الإجراء',
          'لا تُثبّت اتجاه السهم يدوياً — دع RTL يتولى ذلك',
        ],
      },
      related: [
        { slug: 'button', name: 'الزر', description: 'زر الإجراء القياسي بدون أسهم اتجاهية' },
      ],
    },
    'card': {
      useCases: [
        { title: 'تجميع المحتوى في حاويات', icon: 'Package' },
        { title: 'عناصر ولوحات لوحة المعلومات', icon: 'ChartBar' },
        { title: 'أقسام النماذج ومجموعات الحقول', icon: 'ListBullets' },
        { title: 'معاينات المنتجات والقوائم', icon: 'Tag' },
      ],
      bestPractices: {
        dos: [
          'استخدم CardHeader وCardContent وCardFooter لبنية متسقة',
          'اجعل محتوى البطاقة مركّزاً على موضوع واحد',
          'استخدم حشوة متسقة عبر البطاقات في الشبكة',
        ],
        donts: [
          'لا تضع بطاقات داخل بطاقات',
          'لا تُثقل البطاقات بإجراءات كثيرة',
          'لا تستخدم البطاقات عندما يكفي div بسيط مع حدود',
        ],
      },
      related: [
        { slug: 'feature-card', name: 'بطاقة الميزة', description: 'بطاقة متخصصة لإبراز الميزات' },
        { slug: 'stats-card', name: 'بطاقة الإحصائيات', description: 'بطاقة عرض المقاييس' },
        { slug: 'listing-card', name: 'بطاقة القائمة', description: 'بطاقة لعرض المنتجات/القوائم' },
      ],
    },
    'input': {
      useCases: [
        { title: 'إدخال النصوص في النماذج', icon: 'PencilSimple' },
        { title: 'حقول البحث', icon: 'MagnifyingGlass' },
        { title: 'نماذج تسجيل الدخول والمصادقة', icon: 'Lock' },
        { title: 'تصفية البيانات والاستعلامات', icon: 'MagnifyingGlass' },
      ],
      bestPractices: {
        dos: [
          'أرفق دائماً بعنصر Label لتسهيل الوصول',
          'أظهر أخطاء التحقق أسفل حقل الإدخال',
          'استخدم سمة type المناسبة (email, password, tel)',
          'قدّم نص العنصر النائب كتلميح وليس بديلاً عن التسمية',
        ],
        donts: [
          'لا تعتمد على النص النائب وحده كتسمية',
          'لا تستخدمه للنصوص متعددة الأسطر — استخدم Textarea',
          'لا تُخفِ مؤشرات الحقول المطلوبة',
        ],
      },
      related: [
        { slug: 'label', name: 'التسمية', description: 'تسمية الإدخال لإمكانية الوصول' },
        { slug: 'textarea', name: 'منطقة النص', description: 'إدخال نص متعدد الأسطر' },
        { slug: 'form', name: 'النموذج', description: 'غلاف النموذج والتحقق' },
      ],
    },
    'label': {
      useCases: [
        { title: 'تعريف حقول النماذج', icon: 'Tag' },
        { title: 'أوصاف مربعات الاختيار وأزرار الراديو', icon: 'CheckSquare' },
        { title: 'ربط المدخلات لتسهيل الوصول', icon: 'Users' },
        { title: 'مؤشرات الحقول المطلوبة', icon: 'Warning' },
      ],
      related: [
        { slug: 'input', name: 'حقل الإدخال', description: 'حقل إدخال النص' },
        { slug: 'checkbox', name: 'مربع الاختيار', description: 'عنصر تحكم مربع الاختيار' },
        { slug: 'radio-group', name: 'مجموعة الراديو', description: 'مجموعة أزرار الراديو' },
      ],
    },
    'separator': {
      useCases: [
        { title: 'فواصل الأقسام في التخطيطات', icon: 'SidebarSimple' },
        { title: 'تجميع عناصر القوائم', icon: 'FileText' },
        { title: 'فصل محتوى البطاقات', icon: 'FileText' },
        { title: 'فواصل شريط الأدوات والتنقّل', icon: 'Layout' },
      ],
      related: [
        { slug: 'card', name: 'البطاقة', description: 'حاوية شائعة مع الفواصل' },
      ],
    },
    'avatar': {
      useCases: [
        { title: 'عرض صور الملفات الشخصية', icon: 'UserCircle' },
        { title: 'صور المستخدمين في التعليقات والمحادثات', icon: 'ChatCentered' },
        { title: 'قوائم أعضاء الفريق', icon: 'Users' },
        { title: 'التنقّل وقوائم المستخدم', icon: 'PushPin' },
      ],
      bestPractices: {
        dos: [
          'قدّم دائماً بديلاً (أحرف أولى أو أيقونة) للصور المفقودة',
          'استخدم أحجاماً متسقة في نفس السياق',
          'أضف نصاً بديلاً لقارئات الشاشة',
        ],
        donts: [
          'لا تستخدم Avatar للصور الزخرفية — استخدم img مباشرة',
          'لا تخلط أحجام الصور الرمزية في نفس القائمة',
          'لا تقص محتوى مهماً بالقناع الدائري',
        ],
      },
      related: [
        { slug: 'badge', name: 'الشارة', description: 'مؤشرات الحالة بجوار الصور الرمزية' },
        { slug: 'user-badge', name: 'شارة المستخدم', description: 'عرض دور المستخدم وحالته' },
      ],
    },
    'badge': {
      bestPractices: {
        dos: [
          'استخدم ألواناً متسقة لنفس الحالة عبر التطبيق',
          'اجعل نص الشارة قصيراً (كلمة أو كلمتان)',
          'أرفق تسميات وصفية لقارئات الشاشة',
          'استخدم الأنماط الدلالية (نجاح، تحذير، تدميري) بشكل مناسب',
        ],
        donts: [
          'لا تستخدم أنماط شارات كثيرة في عرض واحد',
          'لا تعتمد على اللون وحده — أضف نصاً لإمكانية الوصول',
          'لا تستخدم الشارات للنصوص الطويلة — استخدم Alert أو Callout',
          'لا تضع شارات داخل شارات أخرى',
        ],
      },
      related: [
        { slug: 'button', name: 'الزر', description: 'أزرار الإجراءات المقترنة بالشارات' },
        { slug: 'card', name: 'البطاقة', description: 'حاوية شائعة لعرض الشارات' },
        { slug: 'alert', name: 'التنبيه', description: 'أنماط إشارة حالة مشابهة' },
      ],
    },
    'feature-card': {
      useCases: [
        { title: 'إبراز الميزات في صفحات الهبوط', icon: 'Sparkle' },
        { title: 'عرض الخدمات والمنتجات', icon: 'Package' },
        { title: 'نظرة عامة على الإمكانيات في التوثيق', icon: 'BookOpen' },
        { title: 'شبكات مقارنة خطط الأسعار', icon: 'GridFour' },
      ],
      related: [
        { slug: 'card', name: 'البطاقة', description: 'مكوّن البطاقة الأساسي' },
        { slug: 'listing-card', name: 'بطاقة القائمة', description: 'عرض قوائم المنتجات' },
      ],
    },

    // ── Forms ─────────────────────────────────────────────
    'form': {
      useCases: [
        { title: 'التسجيل وتسجيل الدخول', icon: 'Lock' },
        { title: 'لوحات الإعدادات والتفضيلات', icon: 'Gear' },
        { title: 'نماذج الاتصال والملاحظات', icon: 'Envelope' },
        { title: 'جمع البيانات متعدد الخطوات', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'أظهر أخطاء التحقق بجوار الحقل المعني',
          'جمّع الحقول المرتبطة بعناوين أقسام واضحة',
          'استخدم Zod أو ما شابه للتحقق المبني على المخططات',
          'أشر إلى الحقول المطلوبة بوضوح',
        ],
        donts: [
          'لا تتحقق عند كل ضغطة — استخدم onBlur أو onSubmit',
          'لا تُعد تعيين النموذج عند حدوث خطأ في التحقق',
          'لا تخلط بين المدخلات المُتحكَّم بها وغير المُتحكَّم بها',
        ],
      },
      related: [
        { slug: 'input', name: 'حقل الإدخال', description: 'حقل إدخال النص' },
        { slug: 'checkbox', name: 'مربع الاختيار', description: 'عنصر تحكم اختيار متعدد' },
        { slug: 'select', name: 'القائمة المنسدلة', description: 'اختيار منسدل' },
      ],
    },
    'checkbox': {
      useCases: [
        { title: 'قبول الشروط والأحكام', icon: 'Checks' },
        { title: 'مرشّحات الاختيار المتعدد', icon: 'MagnifyingGlass' },
        { title: 'اختيار إجراءات جماعية في الجداول', icon: 'CheckSquare' },
        { title: 'تبديل الميزات في الإعدادات', icon: 'Gear' },
      ],
      bestPractices: {
        dos: [
          'أرفق دائماً بعنصر Label لتسهيل الوصول',
          'استخدم الحالة غير المحددة للعناصر الأم في اختيارات الشجرة',
          'جمّع مربعات الاختيار المرتبطة بصرياً',
        ],
        donts: [
          'لا تستخدمه للتبديل الثنائي — استخدم Switch بدلاً من ذلك',
          'لا تستخدمه لاختيار خيار واحد — استخدم RadioGroup',
          'لا تضع مربعات الاختيار قريبة جداً على الجوال',
        ],
      },
      related: [
        { slug: 'radio-group', name: 'مجموعة الراديو', description: 'اختيار واحد من الخيارات' },
        { slug: 'switch', name: 'المفتاح', description: 'عنصر تحكم تبديل ثنائي' },
        { slug: 'label', name: 'التسمية', description: 'ربط التسمية لإمكانية الوصول' },
      ],
    },
    'switch': {
      useCases: [
        { title: 'تبديل فوري (الوضع الداكن، الإشعارات)', icon: 'ArrowsClockwise' },
        { title: 'أعلام الميزات في لوحات الإعدادات', icon: 'Gear' },
        { title: 'عناصر التحكم في الخصوصية والتفضيلات', icon: 'Lock' },
        { title: 'تفضيلات إمكانية الوصول (تقليل الحركة، التباين)', icon: 'Eye' },
      ],
      bestPractices: {
        dos: [
          'طبّق التغييرات فوراً — لا حاجة لزر إرسال',
          'استخدم تسميات واضحة تصف ما يحدث عند التفعيل',
          'أظهر الحالة الحالية بصرياً (لون، موضع)',
        ],
        donts: [
          'لا تستخدمه لخيارات تتطلب تأكيداً — استخدم Checkbox في نموذج',
          'لا تستخدمه لاختيارات متعددة الخيارات',
          'لا تغيّر نص التسمية بناءً على الحالة',
        ],
      },
      related: [
        { slug: 'checkbox', name: 'مربع الاختيار', description: 'عنصر تحكم ثنائي في النموذج' },
        { slug: 'radio-group', name: 'مجموعة الراديو', description: 'اختيار خيارات متعددة' },
      ],
    },
    'radio-group': {
      useCases: [
        { title: 'اختيار واحد من مجموعة صغيرة (2-5 خيارات)', icon: 'Target' },
        { title: 'اختيار طريقة الدفع', icon: 'CreditCard' },
        { title: 'خيارات الشحن أو التوصيل', icon: 'Package' },
        { title: 'إجابات الاستبيانات والاستطلاعات', icon: 'PencilSimple' },
      ],
      bestPractices: {
        dos: [
          'حدّد خياراً افتراضياً مسبقاً عند الإمكان',
          'اجعل نص الخيارات قصيراً ومميّزاً',
          'استخدم التخطيط الرأسي لأكثر من 3 خيارات',
        ],
        donts: [
          'لا تستخدمه لأكثر من 7 خيارات — استخدم Select بدلاً من ذلك',
          'لا تستخدمه للاختيار المتعدد — استخدم Checkbox',
          'لا تسمح بإلغاء التحديد — يجب أن يكون للراديو قيمة دائماً',
        ],
      },
      related: [
        { slug: 'checkbox', name: 'مربع الاختيار', description: 'بديل الاختيار المتعدد' },
        { slug: 'select', name: 'القائمة المنسدلة', description: 'قائمة منسدلة للخيارات الكثيرة' },
      ],
    },
    'select': {
      useCases: [
        { title: 'الاختيار من قائمة طويلة من الخيارات', icon: 'ListBullets' },
        { title: 'محددات الدولة أو اللغة أو المنطقة الزمنية', icon: 'Globe' },
        { title: 'عناصر التصفية والترتيب', icon: 'MagnifyingGlass' },
        { title: 'تعيين الفئات في النماذج', icon: 'Tag' },
      ],
      bestPractices: {
        dos: [
          'أضف خيار عنصر نائب ("اختر...")',
          'جمّع الخيارات المرتبطة بفواصل',
          'ادعم التنقّل بلوحة المفاتيح والتصفية أثناء الكتابة',
        ],
        donts: [
          'لا تستخدمه لأقل من 5 خيارات — استخدم RadioGroup',
          'لا تُكثر من مستويات تجميع الخيارات',
          'لا تستخدمه عندما يحتاج المستخدمون لرؤية جميع الخيارات',
        ],
      },
      related: [
        { slug: 'radio-group', name: 'مجموعة الراديو', description: 'اختيار خيارات مرئية' },
        { slug: 'command', name: 'لوحة الأوامر', description: 'لوحة أوامر قابلة للبحث' },
      ],
    },
    'slider': {
      useCases: [
        { title: 'التحكم في مستوى الصوت والسطوع', icon: 'Sliders' },
        { title: 'مرشّحات نطاق الأسعار', icon: 'CurrencyDollar' },
        { title: 'التحكم في تكبير وتغيير حجم الصور', icon: 'MagnifyingGlass' },
        { title: 'ضبط الشفافية والعتبات', icon: 'Palette' },
      ],
      bestPractices: {
        dos: [
          'أظهر القيمة الحالية بجوار شريط التمرير',
          'حدّد تسميات ذات معنى للحد الأدنى والأقصى',
          'استخدم قيم خطوات مناسبة للسياق',
        ],
        donts: [
          'لا تستخدمه لإدخال أرقام دقيقة — استخدم NumberInput',
          'لا تضع نطاقات كبيرة جداً مع خطوات صغيرة',
          'لا تستخدمه بدون مؤشر قيمة مرئي',
        ],
      },
      related: [
        { slug: 'range-slider', name: 'شريط النطاق', description: 'اختيار نطاق بمقبضين' },
        { slug: 'number-input', name: 'إدخال رقمي', description: 'إدخال رقمي دقيق' },
      ],
    },
    'range-slider': {
      useCases: [
        { title: 'مرشّحات نطاق الأسعار في التجارة الإلكترونية', icon: 'CurrencyDollar' },
        { title: 'اختيار نطاق التاريخ أو الوقت', icon: 'CalendarBlank' },
        { title: 'عناصر التحكم في معلمات الحد الأدنى/الأقصى', icon: 'ChartBar' },
        { title: 'عناصر تحكم قص الصوت/الفيديو', icon: 'Sliders' },
      ],
      bestPractices: {
        dos: [
          'أظهر قيمتي الحد الأدنى والأقصى بوضوح',
          'امنع تجاوز الحد الأدنى للحد الأقصى مع التحقق',
          'استخدم أحجام خطوات مناسبة لنطاق القيم',
        ],
        donts: [
          'لا تستخدمه لاختيار قيمة واحدة — استخدم Slider',
          'لا تجعل المقابض متداخلة بدون تمييز بصري',
          'لا تُخفِ تمثيل النطاق المحدد',
        ],
      },
      related: [
        { slug: 'slider', name: 'شريط التمرير', description: 'شريط تمرير أحادي القيمة للتعديلات البسيطة' },
        { slug: 'number-input', name: 'إدخال رقمي', description: 'إدخال رقمي دقيق مع أزرار الخطوات' },
      ],
    },
    'textarea': {
      useCases: [
        { title: 'نماذج التعليقات والملاحظات', icon: 'ChatCentered' },
        { title: 'حقول السيرة والوصف', icon: 'PencilSimple' },
        { title: 'كتابة الملاحظات والرسائل', icon: 'Envelope' },
        { title: 'مناطق تحرير المحتوى والأكواد', icon: 'Laptop' },
      ],
      bestPractices: {
        dos: [
          'حدّد عدد صفوف مناسباً لنوع المحتوى',
          'أظهر عداد الأحرف عند وجود حد أقصى',
          'اسمح بتغيير الحجم عندما يختلف طول المحتوى',
        ],
        donts: [
          'لا تستخدمه لإدخال سطر واحد — استخدم Input',
          'لا تعطّل تغيير الحجم بدون سبب وجيه',
          'لا تجعل Textarea صغيرة جداً للمحتوى الطويل',
        ],
      },
      related: [
        { slug: 'input', name: 'حقل الإدخال', description: 'إدخال نص أحادي السطر' },
        { slug: 'rich-text-editor', name: 'محرر النص الغني', description: 'تحرير نص منسّق' },
      ],
    },

    // ── Overlays ──────────────────────────────────────────
    'dialog': {
      useCases: [
        { title: 'مطالبات التأكيد (حذف، تجاهل)', icon: 'Warning' },
        { title: 'نماذج منبثقة للتعديلات السريعة', icon: 'PencilSimple' },
        { title: 'عرض التفاصيل والمعاينات', icon: 'Eye' },
        { title: 'تنبيهات حرجة تتطلب إجراءً', icon: 'WarningCircle' },
      ],
      bestPractices: {
        dos: [
          'احصر التركيز داخل الحوار عند فتحه',
          'وفّر آلية إغلاق واضحة (زر + مفتاح Escape)',
          'استخدم عناوين وصفية توضح الغرض',
          'أعد التركيز لعنصر التشغيل عند الإغلاق',
        ],
        donts: [
          'لا تضع حوارات داخل حوارات',
          'لا تستخدمه للإشعارات البسيطة — استخدم Toast',
          'لا تفتح حوارات تلقائياً بدون إجراء من المستخدم',
        ],
      },
      related: [
        { slug: 'sheet', name: 'الشريط', description: 'بديل اللوحة المنزلقة' },
        { slug: 'alert', name: 'التنبيه', description: 'رسائل التنبيه المضمّنة' },
      ],
    },
    'sheet': {
      useCases: [
        { title: 'لوحات التنقّل على الجوال', icon: 'DeviceMobile' },
        { title: 'أشرطة جانبية للتصفية والإعدادات', icon: 'Gear' },
        { title: 'عرض التفاصيل المنزلقة من الحافة', icon: 'ListBullets' },
        { title: 'لوحات سلة التسوق والإشعارات', icon: 'ShoppingCart' },
      ],
      bestPractices: {
        dos: [
          'استخدم الجانب المناسب (البداية للتنقّل، النهاية للتفاصيل)',
          'أضف زر إغلاق والنقر على الخلفية للإغلاق',
          'اجعل محتوى الشريط مركّزاً وقابلاً للتمرير',
        ],
        donts: [
          'لا تستخدمه للتأكيدات الصغيرة — استخدم Dialog',
          'لا تجعل الشريط أعرض من 80% من نافذة العرض',
          'لا تحجب وظائف الصفحة الأساسية خلف شريط',
        ],
      },
      related: [
        { slug: 'dialog', name: 'الحوار', description: 'بديل الحوار المركزي' },
      ],
    },
    'popover': {
      useCases: [
        { title: 'تلميحات غنية بمحتوى تفاعلي', icon: 'ChatCentered' },
        { title: 'منتقيات الألوان والمحررات المصغّرة', icon: 'Palette' },
        { title: 'إجراءات سريعة عند التحويم أو النقر', icon: 'Lightning' },
        { title: 'حاويات منتقي التاريخ/الوقت', icon: 'CalendarBlank' },
      ],
      bestPractices: {
        dos: [
          'ضع بالنسبة للمحفّز مع كشف التصادمات',
          'اجعل المحتوى مختصراً وقابلاً للتنفيذ',
          'اسمح بالإغلاق عبر Escape والنقر خارج العنصر',
        ],
        donts: [
          'لا تستخدمه للنماذج المعقدة — استخدم Dialog',
          'لا تضع محتوى مهماً فقط في عناصر منبثقة',
          'لا تفتح عناصر منبثقة متعددة في وقت واحد',
        ],
      },
      related: [
        { slug: 'tooltip', name: 'التلميح', description: 'تلميحات نصية بسيطة' },
        { slug: 'dropdown-menu', name: 'القائمة المنسدلة', description: 'قائمة الإجراءات' },
      ],
    },
    'tooltip': {
      useCases: [
        { title: 'أوصاف أزرار الأيقونات', icon: 'Lightbulb' },
        { title: 'كشف القيمة الكاملة للنص المقتطع', icon: 'PencilSimple' },
        { title: 'تلميحات اختصارات لوحة المفاتيح', icon: 'Keyboard' },
        { title: 'توضيحات العناصر المعطّلة', icon: 'Info' },
      ],
      bestPractices: {
        dos: [
          'اجعل نص التلميح قصيراً (سطر أو سطران كحد أقصى)',
          'أظهر عند التحويم/التركيز مع تأخير بسيط',
          'استخدم للمعلومات التكميلية وليس الأساسية',
        ],
        donts: [
          'لا تضع عناصر تفاعلية داخل التلميحات — استخدم Popover',
          'لا تستخدم لرسائل الخطأ أو ملاحظات التحقق',
          'لا تعتمد على التلميحات للجوال — لا يوجد تحويم',
        ],
      },
      related: [
        { slug: 'popover', name: 'العنصر المنبثق', description: 'محتوى تفاعلي عائم' },
        { slug: 'kbd', name: 'المفتاح', description: 'عرض اختصارات لوحة المفاتيح' },
      ],
    },
    'dropdown-menu': {
      useCases: [
        { title: 'قوائم الإجراءات (تعديل، حذف، مشاركة)', icon: 'ListBullets' },
        { title: 'قوائم حساب المستخدم', icon: 'UserCircle' },
        { title: 'عمليات حسب السياق', icon: 'Gear' },
        { title: 'قوائم التجاوز للمساحات المحدودة', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'جمّع العناصر المرتبطة بفواصل',
          'استخدم أيقونات لتحسين قابلية المسح',
          'أظهر اختصارات لوحة المفاتيح بجوار الإجراءات',
        ],
        donts: [
          'لا تُدرج القوائم أكثر من مستوى واحد',
          'لا تستخدمه للتنقّل — استخدم روابط التنقّل',
          'لا تضع عناصر كثيرة (قاعدة 7±2)',
        ],
      },
      related: [
        { slug: 'context-menu', name: 'قائمة السياق', description: 'قائمة تُشغّل بالنقر الأيمن' },
        { slug: 'select', name: 'القائمة المنسدلة', description: 'عنصر تحكم اختيار النموذج' },
      ],
    },
    'context-menu': {
      useCases: [
        { title: 'إجراءات النقر بالزر الأيمن على المحتوى', icon: 'Cursor' },
        { title: 'عمليات الملفات والعناصر في القوائم', icon: 'FileText' },
        { title: 'أدوات سياقية في اللوحة والمحرر', icon: 'Palette' },
        { title: 'عمليات صفوف الجدول', icon: 'Table' },
      ],
      bestPractices: {
        dos: [
          'حاكِ أنماط قائمة السياق المألوفة في نظام التشغيل',
          'أضف اختصارات لوحة المفاتيح لجميع الإجراءات',
          'أبقِ القائمة قريبة من موقع النقر',
        ],
        donts: [
          'لا تجعل قائمة السياق الطريقة الوحيدة للوصول للإجراءات',
          'لا تستبدل قائمة سياق المتصفح الافتراضية بدون سبب',
          'لا تضع إجراءات تدميرية بدون تأكيد',
        ],
      },
      related: [
        { slug: 'dropdown-menu', name: 'القائمة المنسدلة', description: 'قائمة إجراءات بمحفّز' },
        { slug: 'popover', name: 'العنصر المنبثق', description: 'محتوى تفاعلي عائم' },
      ],
    },
    'toast': {
      useCases: [
        { title: 'ملاحظات النجاح/الخطأ بعد الإجراءات', icon: 'Checks' },
        { title: 'إشعارات اكتمال العمليات الخلفية', icon: 'Bell' },
        { title: 'إشعارات النظام غير المعرقلة', icon: 'Megaphone' },
        { title: 'تأكيدات إجراء التراجع', icon: 'ArrowsClockwise' },
      ],
      bestPractices: {
        dos: [
          'أغلق تلقائياً بعد وقت مناسب (5-8 ثوانٍ)',
          'أضف إجراء تراجع للعمليات التدميرية',
          'استخدم أنماطاً مناسبة (نجاح، خطأ، تحذير)',
        ],
        donts: [
          'لا تستخدمه للأخطاء الحرجة التي تتطلب إجراءً — استخدم Dialog',
          'لا تُظهر إشعارات كثيرة في وقت واحد',
          'لا تضع معلومات أساسية فقط في الإشعارات',
        ],
      },
      related: [
        { slug: 'alert', name: 'التنبيه', description: 'إشعارات مضمنة دائمة' },
        { slug: 'dialog', name: 'الحوار', description: 'حوارات تأكيد مشروطة' },
      ],
    },

    // ── Data Display ──────────────────────────────────────
    'table': {
      useCases: [
        { title: 'قوائم البيانات والسجلات', icon: 'ChartBar' },
        { title: 'جداول المقارنة', icon: 'Columns' },
        { title: 'شبكات الإعدادات والتكوين', icon: 'Gear' },
        { title: 'مقارنة الأسعار والميزات', icon: 'CurrencyDollar' },
      ],
      bestPractices: {
        dos: [
          'استخدم رؤوس ثابتة للجداول الطويلة القابلة للتمرير',
          'حاذِ الأعمدة الرقمية لليمين لسهولة المسح',
          'وفّر سلوكاً متجاوباً (تمرير أفقي أو عرض بطاقات)',
        ],
        donts: [
          'لا تستخدم الجداول لأغراض التخطيط — استخدم CSS Grid/Flex',
          'لا تُخفِ أعمدة مهمة على الجوال بدون إشارة',
          'لا تستخدم الجداول لأقل من 3 صفوف من البيانات',
        ],
      },
      related: [
        { slug: 'data-table', name: 'جدول البيانات', description: 'جدول متقدم مع ترتيب/تصفية' },
        { slug: 'pagination', name: 'التصفّح', description: 'التنقّل بين صفحات الجدول' },
      ],
    },
    'data-table': {
      useCases: [
        { title: 'لوحات الإدارة مع الترتيب والتصفية', icon: 'Database' },
        { title: 'سجل المعاملات والطلبات', icon: 'FileText' },
        { title: 'واجهات إدارة المستخدمين', icon: 'Users' },
        { title: 'سجلات بيانات قابلة للبحث', icon: 'MagnifyingGlass' },
      ],
      bestPractices: {
        dos: [
          'فعّل ترتيب الأعمدة للحقول الرئيسية',
          'وفّر تصفّحاً للصفحات لمجموعات البيانات الكبيرة',
          'أظهر حالات التحميل أثناء جلب البيانات',
          'اسمح بتخصيص ظهور الأعمدة',
        ],
        donts: [
          'لا تحمّل جميع البيانات دفعة واحدة للمجموعات الكبيرة',
          'لا تفعّل الترتيب على أعمدة بقيم متطابقة',
          'لا تُزِل عناصر التحكم في التصفّح',
        ],
      },
      related: [
        { slug: 'table', name: 'الجدول', description: 'جدول بسيط بدون ميزات متقدمة' },
        { slug: 'pagination', name: 'التصفّح', description: 'التنقّل بين صفحات الجداول' },
      ],
    },
    'pagination': {
      useCases: [
        { title: 'التنقّل في الجداول والقوائم', icon: 'FileText' },
        { title: 'صفحات نتائج البحث', icon: 'MagnifyingGlass' },
        { title: 'أرشيفات المقالات والمدونات', icon: 'Newspaper' },
        { title: 'التنقّل في معرض الصور', icon: 'Image' },
      ],
      bestPractices: {
        dos: [
          'أظهر الصفحة الحالية وإجمالي الصفحات',
          'وفّر اختصارات للصفحة الأولى والأخيرة',
          'أبقِ عناصر التصفّح مرئية وسهلة الوصول',
        ],
        donts: [
          'لا تعرض أرقام صفحات كثيرة — استخدم علامات الحذف',
          'لا تُعد تعيين موقع التمرير بدون إشارة',
          'لا تُخفِ التصفّح عندما تكون هناك صفحة واحدة فقط',
        ],
      },
      related: [
        { slug: 'table', name: 'الجدول', description: 'التنقّل في بيانات الجدول' },
        { slug: 'data-table', name: 'جدول البيانات', description: 'جدول بميزات متقدمة' },
      ],
    },
    'tabs': {
      useCases: [
        { title: 'تنظيم المحتوى حسب الفئة', icon: 'FileText' },
        { title: 'لوحات الإعدادات بأقسام', icon: 'Gear' },
        { title: 'مبدّلات عرض لوحة المعلومات', icon: 'ChartBar' },
        { title: 'بدائل النماذج متعددة الخطوات', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'اجعل تسميات التبويبات قصيرة ووصفية',
          'أظهر التبويب النشط بوضوح مع تأكيد بصري',
          'حافظ على حالة محتوى التبويب عند التبديل',
        ],
        donts: [
          'لا تستخدم أكثر من 5-6 تبويبات — فكّر في تنقّل آخر',
          'لا تستخدم التبويبات لخطوات متسلسلة — استخدم Stepper',
          'لا تُخفِ محتوى حرجاً خلف تبويبات ثانوية',
        ],
      },
      related: [
        { slug: 'accordion', name: 'الأكورديون', description: 'أقسام محتوى قابلة للطي' },
      ],
    },
    'accordion': {
      useCases: [
        { title: 'أقسام الأسئلة الشائعة', icon: 'Question' },
        { title: 'مجموعات إعدادات قابلة للطي', icon: 'Gear' },
        { title: 'الكشف التدريجي عن المحتوى المعقد', icon: 'BookOpen' },
        { title: 'تكثيف المحتوى على الجوال', icon: 'DeviceMobile' },
      ],
      bestPractices: {
        dos: [
          'استخدم عناوين وصفية تعطي لمحة عن المحتوى',
          'اسمح بفتح عناصر متعددة في وقت واحد عند الحاجة',
          'أضف حركة للفتح/الإغلاق لانتقالات سلسة',
        ],
        donts: [
          'لا تضع أكورديونات داخل أكورديونات',
          'لا تستخدمه للمحتوى الأساسي الذي يحتاجه جميع المستخدمين',
          'لا تضع إجراءات حرجة داخل أقسام مطوية',
        ],
      },
      related: [
        { slug: 'collapsible', name: 'قابل للطي', description: 'توسيع/طي بسيط للأقسام المفردة' },
        { slug: 'tabs', name: 'التبويبات', description: 'التبديل بين لوحات المحتوى' },
      ],
    },
    'collapsible': {
      useCases: [
        { title: 'إظهار/إخفاء تفاصيل إضافية', icon: 'Eye' },
        { title: 'خيارات متقدمة في النماذج', icon: 'Gear' },
        { title: 'كتل أكواد أو سجلات قابلة للتوسع', icon: 'Laptop' },
        { title: 'إجابات الأسئلة الشائعة وأقسام المساعدة', icon: 'Question' },
      ],
      bestPractices: {
        dos: [
          'استخدم تسمية محفّز واضحة تشير إلى ما سيظهر',
          'أضف حركة انتقال سلسة للارتفاع',
          'حافظ على الحالة عبر إعادة التصيير',
        ],
        donts: [
          'لا تُخفِ حقول نماذج مطلوبة في أقسام قابلة للطي',
          'لا تستخدمه لمحتوى يحتاج معظم المستخدمين لرؤيته',
          'لا تستخدمه عندما يكون Accordion بعناوين أوضح',
        ],
      },
      related: [
        { slug: 'accordion', name: 'الأكورديون', description: 'توسيع/طي متعدد الأقسام' },
        { slug: 'tabs', name: 'التبويبات', description: 'تنظيم محتوى بديل' },
      ],
    },
    'breadcrumb': {
      useCases: [
        { title: 'التنقّل الهرمي بين الصفحات', icon: 'NavigationArrow' },
        { title: 'مسارات فئات التجارة الإلكترونية', icon: 'ShoppingCart' },
        { title: 'مسارات أقسام التوثيق', icon: 'BookOpen' },
        { title: 'مسارات التنقّل في نظام الملفات', icon: 'FileText' },
      ],
      bestPractices: {
        dos: [
          'أظهر المسار الهرمي الكامل من الجذر',
          'اجعل كل مستوى قابلاً للنقر عدا الصفحة الحالية',
          'اقتطع بعلامات حذف للتسلسلات العميقة',
        ],
        donts: [
          'لا تستخدم المسار التنقّلي كطريقة تنقّل وحيدة',
          'لا تضع الصفحة الرئيسية إذا كانت موجودة في التنقّل الرئيسي',
          'لا تعرض المسار التنقّلي في الصفحة الرئيسية نفسها',
        ],
      },
      related: [
        { slug: 'pagination', name: 'التصفّح', description: 'التنقّل التسلسلي بين الصفحات' },
        { slug: 'tabs', name: 'التبويبات', description: 'تنقّل بديل في المحتوى' },
      ],
    },
    'command': {
      useCases: [
        { title: 'لوحات الأوامر (⌘K)', icon: 'Keyboard' },
        { title: 'واجهات البحث الشاملة', icon: 'MagnifyingGlass' },
        { title: 'مشغّلات الإجراءات السريعة', icon: 'Lightning' },
        { title: 'منتقيات خيارات قابلة للبحث', icon: 'ListBullets' },
      ],
      bestPractices: {
        dos: [
          'ادعم التنقّل بلوحة المفاتيح أولاً (الأسهم، Enter)',
          'جمّع الأوامر حسب الفئة بعناوين',
          'أظهر اختصارات لوحة المفاتيح بجوار الأوامر',
        ],
        donts: [
          'لا تضع عناصر كثيرة بدون تصفية بحث',
          'لا تستخدمه لاختيارات بسيطة — استخدم Select',
          'لا تفتحه تلقائياً بدون نية من المستخدم',
        ],
      },
      related: [
        { slug: 'select', name: 'القائمة المنسدلة', description: 'اختيار بسيط بدون بحث' },
        { slug: 'dropdown-menu', name: 'قائمة منسدلة', description: 'قائمة إجراءات بدون وظيفة بحث' },
      ],
    },

    // ── Advanced Forms ────────────────────────────────────
    'date-picker': {
      bestPractices: {
        dos: [
          'أظهر تنسيق تاريخ واضح كعنصر نائب (مثل DD/MM/YYYY)',
          'ادعم كلاً من التقويم والإدخال النصي اليدوي',
          'احترم الإعدادات المحلية لتنسيق التاريخ وأول يوم في الأسبوع',
          'عطّل التواريخ غير الصالحة (التواريخ الماضية للأحداث المستقبلية)',
        ],
        donts: [
          'لا تجعل اليوم الافتراضي إذا لم يستدعِ السياق ذلك',
          'لا تستخدمه لاختيار الوقت — ادمج مع TimePicker',
          'لا تعرض أشهراً كثيرة في وقت واحد على الجوال',
        ],
      },
      related: [
        { slug: 'calendar', name: 'التقويم', description: 'شبكة تقويم مستقلة لتصفّح التواريخ' },
        { slug: 'time-picker', name: 'منتقي الوقت', description: 'مكمّل اختيار الوقت لمنتقي التاريخ' },
      ],
    },
    'time-picker': {
      bestPractices: {
        dos: [
          'ادعم تنسيقي 12 ساعة و24 ساعة حسب الإعدادات المحلية',
          'اسمح بالإدخال من لوحة المفاتيح بجوار واجهة المنتقي',
          'أظهر AM/PM بوضوح في وضع 12 ساعة',
        ],
        donts: [
          'لا تفرض تنسيق وقت محدد بغض النظر عن الإعدادات المحلية',
          'لا تستخدم خطوات دقائق أكبر من 15 للاستخدام العام',
          'لا تُخفِ التحديد الحالي',
        ],
      },
      related: [
        { slug: 'date-picker', name: 'منتقي التاريخ', description: 'مكمّل اختيار التاريخ لمنتقي الوقت' },
      ],
    },
    'file-upload': {
      useCases: [
        { title: 'رفع المستندات في النماذج', icon: 'FileText' },
        { title: 'إرفاق الصور والوسائط', icon: 'Image' },
        { title: 'سير عمل استيراد الملفات بالجملة', icon: 'Package' },
        { title: 'اختيار صورة الملف الشخصي', icon: 'UserCircle' },
      ],
      related: [
        { slug: 'input', name: 'حقل الإدخال', description: 'إدخال نصي لمسار الملف يدوياً' },
        { slug: 'form', name: 'النموذج', description: 'غلاف النموذج للتحقق من رفع الملفات' },
      ],
    },
    'number-input': {
      bestPractices: {
        dos: [
          'حدّد قيم الحد الأدنى والأقصى والخطوة المناسبة',
          'أظهر الوحدة بجوار حقل الإدخال عند الاقتضاء',
          'اسمح بالإدخال من لوحة المفاتيح واستخدام أزرار الخطوات',
        ],
        donts: [
          'لا تستخدمه للمدخلات غير الرقمية مثل أرقام الهواتف — استخدم Input بنوع tel',
          'لا تضع قيم خطوات تجعل الوصول للهدف صعباً',
          'لا تسمح بقيم خارج النطاق الصالح',
        ],
      },
      related: [
        { slug: 'slider', name: 'شريط التمرير', description: 'التحكم البصري في النطاق للقيم التقريبية' },
        { slug: 'input', name: 'حقل الإدخال', description: 'إدخال نصي عام للقيم الحرة' },
      ],
    },
    'rich-text-editor': {
      useCases: [
        { title: 'تحرير المقالات والتدوينات', icon: 'PencilSimple' },
        { title: 'كتابة البريد الإلكتروني مع التنسيق', icon: 'Envelope' },
        { title: 'محتوى التوثيق والويكي', icon: 'BookOpen' },
        { title: 'نماذج التعليقات والملاحظات مع التنسيق', icon: 'ChatCentered' },
      ],
      bestPractices: {
        dos: [
          'وفّر شريط أدوات واضحاً بخيارات التنسيق الأساسية',
          'ادعم اختصارات لوحة المفاتيح للعمليات الشائعة',
          'تعامل مع اللصق من مصادر خارجية بنظافة',
        ],
        donts: [
          'لا تضع خيارات شريط أدوات كثيرة — أظهر الأساسيات',
          'لا تسمح بحقن HTML عشوائي',
          'لا تفقد المحتوى عند التنقّل العرضي',
        ],
      },
      related: [
        { slug: 'textarea', name: 'منطقة النص', description: 'منطقة نص بسيطة بدون تنسيق' },
        { slug: 'form', name: 'النموذج', description: 'تكامل النموذج للتحقق من محتوى المحرر' },
      ],
    },
    'calendar': {
      useCases: [
        { title: 'عرض جداول الأحداث', icon: 'CalendarBlank' },
        { title: 'عرض التوفّر والحجوزات', icon: 'House' },
        { title: 'تصفّح التواريخ الهجرية/الميلادية', icon: 'Mosque' },
        { title: 'واجهات اختيار نطاق التواريخ', icon: 'CalendarBlank' },
      ],
      bestPractices: {
        dos: [
          'أبرز تاريخ اليوم والتواريخ المحددة بوضوح',
          'ادعم التنقّل بلوحة المفاتيح بين التواريخ',
          'أظهر عناصر التحكم في التنقّل بين الأشهر والسنوات',
        ],
        donts: [
          'لا تُزدحم الخلايا ببيانات أحداث كثيرة',
          'لا تجعل التنقّل بين الأشهر بطيئاً أو متقطعاً',
          'لا تتجاهل إعدادات الإقليم لأول يوم في الأسبوع',
        ],
      },
      related: [
        { slug: 'date-picker', name: 'منتقي التاريخ', description: 'اختيار التاريخ مع حقل إدخال' },
        { slug: 'hijri-date', name: 'التاريخ الهجري', description: 'عرض تاريخ التقويم الهجري' },
      ],
    },
    'progress': {
      useCases: [
        { title: 'مؤشرات تقدّم رفع الملفات', icon: 'Upload' },
        { title: 'تتبّع إكمال الخطوات', icon: 'ChartBar' },
        { title: 'أشرطة التحميل للعمليات الطويلة', icon: 'ClockCountdown' },
        { title: 'مؤشرات اكتمال الملف الشخصي', icon: 'UserCircle' },
      ],
      bestPractices: {
        dos: [
          'أظهر النسبة المئوية أو عدد الخطوات بجوار الشريط',
          'استخدم الحالة غير المحددة عندما تكون المدة غير معروفة',
          'أضف حركة سلسة للتقدّم لتجربة أفضل',
        ],
        donts: [
          'لا تستخدمه للعمليات القصيرة — استخدم المؤشر الدوّار',
          'لا تزيّف نسب التقدّم',
          'لا تستخدمه بدون تسمية للوصول (aria-label)',
        ],
      },
      related: [
        { slug: 'skeleton', name: 'الهيكل', description: 'عنصر نائب للمحتوى أثناء التحميل' },
      ],
    },
    'skeleton': {
      useCases: [
        { title: 'عناصر نائبة للمحتوى أثناء التحميل', icon: 'CircleNotch' },
        { title: 'تأثيرات الوميض في البطاقات والقوائم', icon: 'Sparkle' },
        { title: 'عنصر نائب للصور قبل التحميل', icon: 'Image' },
        { title: 'حالات تحميل عناصر لوحة المعلومات', icon: 'Layout' },
      ],
      bestPractices: {
        dos: [
          'طابق شكل الهيكل مع تخطيط المحتوى الفعلي',
          'استخدم حركة خفيفة للإشارة إلى التحميل',
          'أظهر الهياكل فوراً — لا تُؤخّر',
        ],
        donts: [
          'لا تعرض الهياكل لأكثر من بضع ثوانٍ — أظهر حالة خطأ',
          'لا تستخدمه للمحتوى الفوري التحميل',
          'لا تُخالف بين شكل الهيكل وتخطيط المحتوى الحقيقي',
        ],
      },
      related: [
        { slug: 'progress', name: 'شريط التقدّم', description: 'مؤشر تحميل محدد' },
      ],
    },
    'notification-center': {
      useCases: [
        { title: 'مركز إشعارات التطبيق مع أيقونة الجرس', icon: 'Bell' },
        { title: 'عرض خلاصة النشاطات', icon: 'ListBullets' },
        { title: 'تجميع رسائل النظام', icon: 'Megaphone' },
        { title: 'تنبيهات تعيين المهام', icon: 'Checks' },
      ],
      related: [
        { slug: 'toast', name: 'الإشعار المنبثق', description: 'إشعارات مؤقتة تُغلق تلقائياً' },
        { slug: 'alert', name: 'التنبيه', description: 'تنبيهات مضمنة دائمة للرسائل المهمة' },
      ],
    },

    // ── Feedback & Misc ──────────────────────────────────
    'alert': {
      useCases: [
        { title: 'رسائل حالة النظام', icon: 'Megaphone' },
        { title: 'ملخصات التحقق من النماذج', icon: 'Warning' },
        { title: 'إعلانات الميزات', icon: 'Megaphone' },
        { title: 'إشعارات مهمة تبقى ظاهرة', icon: 'PushPin' },
      ],
      bestPractices: {
        dos: [
          'استخدم الأنماط المناسبة (معلومات، نجاح، تحذير، تدميري)',
          'اجعل نص التنبيه مختصراً وقابلاً للتنفيذ',
          'أضف خيار إغلاق للتنبيهات غير الحرجة',
        ],
        donts: [
          'لا تستخدمه للرسائل المؤقتة — استخدم Toast',
          'لا تُكدّس تنبيهات كثيرة في صفحة واحدة',
          'لا تستخدم النمط التدميري للمعلومات غير الحرجة',
        ],
      },
      related: [
        { slug: 'toast', name: 'الإشعار المنبثق', description: 'إشعارات مؤقتة تُغلق تلقائياً' },
        { slug: 'dialog', name: 'الحوار', description: 'حوارات مشروطة للإجراءات الحرجة' },
      ],
    },
    'callout': {
      useCases: [
        { title: 'نصائح وملاحظات في التوثيق', icon: 'Lightbulb' },
        { title: 'تحذيرات مهمة في الأدلة', icon: 'Warning' },
        { title: 'كتل معلومات مُبرزة', icon: 'PushPin' },
        { title: 'التغييرات الجذرية في سجلات التحديث', icon: 'WarningCircle' },
      ],
      related: [
        { slug: 'alert', name: 'التنبيه', description: 'رسائل حالة النظام مع أنماط متعددة' },
        { slug: 'blockquote', name: 'الاقتباس', description: 'محتوى مقتبس مع إسناد' },
      ],
    },
    'stepper': {
      bestPractices: {
        dos: [
          'أظهر تسميات خطوات واضحة ومؤشر تقدّم',
          'اسمح بالتنقّل للخطوات المكتملة',
          'أبقِ عدد الخطوات معقولاً (3-5 خطوات مثالية)',
        ],
        donts: [
          'لا تسمح بتخطي الخطوات المطلوبة',
          'لا تستخدمه للعمليات غير التسلسلية — استخدم Tabs',
          'لا تعرض خطوات كثيرة على الجوال بدون تكيّف',
        ],
      },
      related: [
        { slug: 'timeline', name: 'الخط الزمني', description: 'عرض أحداث زمنية متسلسلة' },
        { slug: 'progress', name: 'شريط التقدّم', description: 'مؤشر تقدّم خطي' },
      ],
    },
    'reaction-picker': {
      related: [
        { slug: 'popover', name: 'العنصر المنبثق', description: 'حاوية عائمة لمنتقي التفاعلات' },
      ],
    },
    'user-badge': {
      bestPractices: {
        dos: [
          'استخدم ألوان حالة متسقة عبر تطبيقك',
          'أضف تسمية وصول للحالة',
          'اجعل نص الشارة قصيراً (كلمة أو كلمتان)',
        ],
        donts: [
          'لا تستخدم أنواع حالات كثيرة في عرض واحد',
          'لا تعتمد على اللون وحده — أضف نصاً أو أيقونات للوصول',
          'لا تستخدمه لأغراض زخرفية',
        ],
      },
      related: [
        { slug: 'badge', name: 'الشارة', description: 'مؤشرات حالة وعدّ بسيطة' },
        { slug: 'avatar', name: 'الصورة الرمزية', description: 'عرض صورة الملف الشخصي' },
      ],
    },
    'content-renderer': {
      useCases: [
        { title: 'عرض محتوى Markdown أو HTML', icon: 'PencilSimple' },
        { title: 'عرض محتوى صفحات CMS', icon: 'FileText' },
        { title: 'لوحات معاينة محررات النصوص الغنية', icon: 'Eye' },
        { title: 'عرض مقالات مركز المساعدة', icon: 'Question' },
      ],
      bestPractices: {
        dos: [
          'نظّف محتوى HTML قبل العرض',
          'طبّق أنماط طباعة متسقة',
          'تعامل مع المحتوى الفارغ بشكل سلس',
        ],
        donts: [
          'لا تعرض HTML غير منظّف مقدّم من المستخدم',
          'لا تتجاوز البنية الدلالية للمحتوى',
          'لا تطبّق أنماطاً متعارضة على المحتوى المعروض',
        ],
      },
      related: [
        { slug: 'blockquote', name: 'الاقتباس', description: 'كتل اقتباس مُنسّقة' },
        { slug: 'callout', name: 'التنويه', description: 'كتل معلومات مُبرزة' },
      ],
    },
    'kbd': {
      useCases: [
        { title: 'توثيق اختصارات لوحة المفاتيح', icon: 'Keyboard' },
        { title: 'مؤشرات المفاتيح السريعة في القوائم', icon: 'ListBullets' },
        { title: 'عرض مرجع الأوامر', icon: 'Lightbulb' },
        { title: 'أدلة وتعليمات إمكانية الوصول', icon: 'BookOpen' },
      ],
      related: [
        { slug: 'tooltip', name: 'التلميح', description: 'تلميحات سياقية يمكن أن تتضمن اختصارات لوحة المفاتيح' },
      ],
    },
    'blockquote': {
      useCases: [
        { title: 'أقسام الشهادات والآراء', icon: 'ChatCentered' },
        { title: 'اقتباسات المقالات والمراجع', icon: 'Quotes' },
        { title: 'اقتباسات بارزة في المحتوى الطويل', icon: 'PencilSimple' },
        { title: 'أبرز تقييمات العملاء', icon: 'Star' },
      ],
      related: [
        { slug: 'pull-quote', name: 'الاقتباس البارز', description: 'مقتطف مُبرز للتأكيد' },
        { slug: 'callout', name: 'التنويه', description: 'كتل تنويه معلوماتية' },
      ],
    },
    'pull-quote': {
      useCases: [
        { title: 'التأكيد التحريري في المقالات', icon: 'Sparkle' },
        { title: 'إبراز النقاط الرئيسية', icon: 'Star' },
        { title: 'ميزات نصية بأسلوب المجلات', icon: 'Newspaper' },
        { title: 'إبرازات التقارير السنوية', icon: 'ChartBar' },
      ],
      bestPractices: {
        dos: [
          'استخدم باعتدال لأقصى تأثير — واحد لكل قسم',
          'اختر اقتباسات تلخّص الرسالة الرئيسية',
          'نسّق بشكل مميز عن النص العادي',
        ],
        donts: [
          'لا تستخدمه للاقتباسات المُسندة — استخدم Blockquote',
          'لا تُفرط في الاستخدام — يُضعف التأثير',
          'لا تستخدم نصاً يحتاج سياقاً لفهمه',
        ],
      },
      related: [
        { slug: 'blockquote', name: 'الاقتباس', description: 'محتوى مقتبس مع إسناد' },
        { slug: 'callout', name: 'التنويه', description: 'كتل إبراز معلوماتية' },
      ],
    },
    'empty-state': {
      useCases: [
        { title: 'شاشات التجربة الأولى', icon: 'Star' },
        { title: 'عناصر نائبة لعدم وجود نتائج بحث', icon: 'MagnifyingGlass' },
        { title: 'عرض المجموعات الفارغة', icon: 'Tray' },
        { title: 'شاشات استرداد حالة الخطأ', icon: 'Gear' },
      ],
      related: [
        { slug: 'button', name: 'الزر', description: 'محفّز إجراء لدعوات الحالة الفارغة' },
        { slug: 'card', name: 'البطاقة', description: 'حاوية لمحتوى الحالة الفارغة' },
      ],
    },
    'dashboard-shell': {
      useCases: [
        { title: 'تخطيطات لوحة الإدارة', icon: 'Laptop' },
        { title: 'هياكل تطبيقات SaaS', icon: 'Buildings' },
        { title: 'إطارات لوحة التحليلات', icon: 'ChartBar' },
        { title: 'أنظمة إدارة المحتوى', icon: 'FileText' },
      ],
      related: [
        { slug: 'stats-card', name: 'بطاقة الإحصائيات', description: 'بطاقات عرض المقاييس لمحتوى لوحة المعلومات' },
        { slug: 'notification-center', name: 'مركز الإشعارات', description: 'مركز الإشعارات لرأس لوحة المعلومات' },
      ],
    },
    'user-menu': {
      useCases: [
        { title: 'قائمة الملف الشخصي في الرأس', icon: 'UserCircle' },
        { title: 'وصول سريع لإعدادات الحساب', icon: 'Gear' },
        { title: 'عناصر تحكم تسجيل الخروج والجلسة', icon: 'Lock' },
        { title: 'تفضيلات السمة واللغة', icon: 'Palette' },
      ],
      related: [
        { slug: 'avatar', name: 'الصورة الرمزية', description: 'الصورة الرمزية التي تُشغّل القائمة' },
        { slug: 'dropdown-menu', name: 'القائمة المنسدلة', description: 'مكوّن القائمة الأساسي للقوائم المخصصة' },
      ],
    },
    'stats-card': {
      useCases: [
        { title: 'عرض مؤشرات الأداء في لوحة المعلومات', icon: 'ChartBar' },
        { title: 'ملخصات الإيرادات والمقاييس', icon: 'CurrencyDollar' },
        { title: 'لوحات نظرة عامة على الأداء', icon: 'ChartLine' },
        { title: 'عناصر المراقبة في الوقت الفعلي', icon: 'Gauge' },
      ],
      related: [
        { slug: 'card', name: 'البطاقة', description: 'مكوّن البطاقة الأساسي للتخطيطات المخصصة' },
        { slug: 'chart', name: 'الرسم البياني', description: 'تمثيل بصري للبيانات والاتجاهات' },
      ],
    },
    'listing-card': {
      bestPractices: {
        dos: [
          'استخدم نسب صور متسقة في شبكات البطاقات',
          'أظهر المعلومات الرئيسية (السعر، الحالة) بشكل بارز',
          'أضف دعوة واضحة للإجراء',
        ],
        donts: [
          'لا تُزدحم بكثرة البيانات الوصفية',
          'لا تستخدمه لمحتوى غير القوائم — استخدم Card',
          'لا تُخفِ الإجراء الأساسي خلف تأثيرات التحويم',
        ],
      },
      related: [
        { slug: 'card', name: 'البطاقة', description: 'بطاقة أساسية لحاويات المحتوى العامة' },
        { slug: 'badge', name: 'الشارة', description: 'شارات الحالة والتسمية لبيانات البطاقة الوصفية' },
      ],
    },

    // ── AI/LLM Components ─────────────────────────────────
    'chat-message': {
      useCases: [
        { title: 'واجهات محادثة LLM', icon: 'Robot' },
        { title: 'واجهات دردشة دعم العملاء', icon: 'ChatCentered' },
        { title: 'عرض الحوار متعدد الأدوار', icon: 'ArrowsClockwise' },
        { title: 'سلاسل التعاون الجماعي', icon: 'Users' },
      ],
      bestPractices: {
        dos: [
          'ميّز بصرياً بين رسائل المستخدم والمساعد',
          'ادعم عرض Markdown في ردود المساعد',
          'أظهر الطوابع الزمنية للمحادثات الطويلة',
        ],
        donts: [
          'لا تجعل الرسائل عريضة جداً — حدّد العرض الأقصى للقراءة',
          'لا تفقد موقع التمرير أثناء البث',
          'لا تحجب التفاعل أثناء توليد الرد',
        ],
      },
      related: [
        { slug: 'message-actions', name: 'إجراءات الرسالة', description: 'شريط أدوات الإجراءات للرسائل' },
        { slug: 'thinking-indicator', name: 'مؤشر التفكير', description: 'حالة التحميل لردود AI' },
      ],
    },
    'prompt-input': {
      useCases: [
        { title: 'حقول إدخال محادثة الذكاء الاصطناعي', icon: 'ChatCentered' },
        { title: 'واجهات البحث أثناء الكتابة', icon: 'MagnifyingGlass' },
        { title: 'إدخال أوامر مع إكمال تلقائي', icon: 'Keyboard' },
        { title: 'مطالبات توليد الأكواد', icon: 'Laptop' },
      ],
      bestPractices: {
        dos: [
          'أظهر زر إرسال واضحاً',
          'ادعم الإدخال متعدد الأسطر مع التوسّع التلقائي',
          'عطّل الإرسال أثناء توليد الرد',
        ],
        donts: [
          'لا تمسح الإدخال عند الخطأ — احفظ نص المستخدم',
          'لا ترسل بـ Enter إذا كان الإدخال متعدد الأسطر متوقعاً',
          'لا تُخفِ حقل الإدخال أثناء توليد الرد',
        ],
      },
      related: [
        { slug: 'textarea', name: 'منطقة النص', description: 'إدخال نص متعدد الأسطر' },
        { slug: 'token-counter', name: 'عدّاد الرموز', description: 'مراقب طول الإدخال' },
      ],
    },
    'thinking-indicator': {
      useCases: [
        { title: 'ملاحظات توليد استجابة الذكاء الاصطناعي', icon: 'Brain' },
        { title: 'إشارة حالة المعالجة الطويلة', icon: 'ClockCountdown' },
        { title: 'مؤشرات الكتابة في المحادثة', icon: 'ChatCentered' },
        { title: 'ملاحظات حوسبة نتائج البحث', icon: 'MagnifyingGlass' },
      ],
      bestPractices: {
        dos: [
          'أظهره فوراً عند بدء المعالجة',
          'أضف حركة لنقل الإحساس بالنشاط',
          'أضف تسمية وصول (aria-label)',
        ],
        donts: [
          'لا تبقِه ظاهراً بعد وصول الرد',
          'لا تستخدمه للعمليات الفورية',
          'لا تحجب الواجهة أثناء عرض المؤشر',
        ],
      },
      related: [
        { slug: 'chat-message', name: 'رسالة المحادثة', description: 'عرض الرسالة' },
      ],
    },
    'message-actions': {
      useCases: [
        { title: 'نسخ وإعادة توليد وتقييم ردود AI', icon: 'ListBullets' },
        { title: 'إجراءات على مستوى الرسالة في المحادثة', icon: 'Lightning' },
        { title: 'جمع الملاحظات على المحتوى المولّد', icon: 'Medal' },
        { title: 'خيارات المشاركة والتصدير للردود', icon: 'Upload' },
      ],
      bestPractices: {
        dos: [
          'أظهر الإجراءات عند التحويم أو التركيز لواجهة نظيفة',
          'أضف النسخ إلى الحافظة كإجراء قياسي',
          'ضعها بشكل متسق بالنسبة للرسالة',
        ],
        donts: [
          'لا تعرض إجراءات كثيرة — جمّع الأقل شيوعاً في قائمة',
          'لا تجعل الإجراءات تنافس محتوى الرسالة على الانتباه',
          'لا تتجاهل إمكانية الوصول بلوحة المفاتيح لأزرار الإجراءات',
        ],
      },
      related: [
        { slug: 'chat-message', name: 'رسالة المحادثة', description: 'مكوّن عرض الرسالة' },
      ],
    },
    'model-selector': {
      useCases: [
        { title: 'تبديل نموذج AI في واجهات المحادثة', icon: 'Robot' },
        { title: 'أدوات مقارنة النماذج', icon: 'Columns' },
        { title: 'لوحات تكوين API', icon: 'Gear' },
        { title: 'اختيار مستوى التكلفة لاستخدام API', icon: 'CurrencyDollar' },
      ],
      bestPractices: {
        dos: [
          'أظهر إمكانيات النموذج بجوار الأسماء',
          'أشر إلى النموذج النشط حالياً بوضوح',
          'جمّع النماذج حسب المزوّد أو الإمكانية',
        ],
        donts: [
          'لا تعرض خيارات كثيرة بدون تصنيف',
          'لا تسمح بتبديل النموذج أثناء المحادثة بدون تحذير',
          'لا تُخفِ قيود النموذج المحددة',
        ],
      },
      related: [
        { slug: 'parameter-slider', name: 'شريط المعلمات', description: 'عناصر تحكم معلمات النموذج (الحرارة، إلخ)' },
        { slug: 'select', name: 'القائمة المنسدلة', description: 'مكوّن اختيار أساسي لمنتقيات نماذج أبسط' },
      ],
    },
    'parameter-slider': {
      useCases: [
        { title: 'التحكم في حرارة AI وtop-p', icon: 'Gauge' },
        { title: 'إعدادات طول التوليد', icon: 'Sliders' },
        { title: 'ضبط معلمات النموذج', icon: 'Gauge' },
        { title: 'عناصر تحكم المفاضلة بين الإبداع والدقة', icon: 'Sliders' },
      ],
      bestPractices: {
        dos: [
          'أظهر القيمة الحالية واسم المعلمة بوضوح',
          'وفّر قيماً افتراضية معقولة لكل معلمة',
          'أضف تلميحات توضّح ما يفعله كل معلمة',
        ],
        donts: [
          'لا تسمح بتركيبات معلمات غير صالحة',
          'لا تستخدمه بدون تسميات — سمِّ المعلمة دائماً',
          'لا تُخفِ القيمة الرقمية',
        ],
      },
      related: [
        { slug: 'slider', name: 'شريط التمرير', description: 'شريط تمرير عام' },
        { slug: 'model-selector', name: 'منتقي النموذج', description: 'منتقي نموذج AI' },
      ],
    },
    'token-counter': {
      useCases: [
        { title: 'مراقبة طول الإدخال لحدود API', icon: 'Hash' },
        { title: 'تقدير التكلفة قبل استدعاءات API', icon: 'CurrencyDollar' },
        { title: 'عرض استخدام نافذة السياق', icon: 'ChartBar' },
        { title: 'مراقبة ميزانية المعالجة بالجملة', icon: 'ChartBar' },
      ],
      bestPractices: {
        dos: [
          'حدّث العدّ في الوقت الفعلي أثناء كتابة المستخدم',
          'أظهر تحذيراً بصرياً عند الاقتراب من الحد',
          'اعرض كلاً من العدد الحالي والحد الأقصى',
        ],
        donts: [
          'لا تحجب الإدخال عند بلوغ الحد — حذّر فقط',
          'لا تستخدم عدّ رموز دقيقاً عندما يكفي التقدير',
          'لا تجعل العدّاد بارزاً جداً للمدخلات القصيرة',
        ],
      },
      related: [
        { slug: 'prompt-input', name: 'حقل الإدخال', description: 'حقل إدخال المحادثة المرافق' },
      ],
    },
    'conversation-history': {
      useCases: [
        { title: 'شريط جانبي لإدارة جلسات المحادثة', icon: 'Quotes' },
        { title: 'بحث وتصفية المحادثات', icon: 'MagnifyingGlass' },
        { title: 'استعادة الجلسات واستكمالها', icon: 'ArrowsClockwise' },
        { title: 'سير عمل تصدير ونسخ المحادثات', icon: 'Download' },
      ],
      bestPractices: {
        dos: [
          'أظهر عناوين أو معاينات المحادثات',
          'اسمح بإعادة التسمية والحذف',
          'رتّب حسب الأحدث افتراضياً',
        ],
        donts: [
          'لا تحمّل محتوى المحادثة الكامل في عرض القائمة',
          'لا تحذف بدون تأكيد',
          'لا تجعل تحديد المحادثة النشطة صعباً',
        ],
      },
      related: [
        { slug: 'chat-message', name: 'رسالة المحادثة', description: 'عرض الرسالة الفردية' },
        { slug: 'prompt-input', name: 'حقل الإدخال', description: 'حقل إدخال المحادثة المرافق' },
      ],
    },

    // ── GCC/Islamic ───────────────────────────────────────
    'arabic-number': {
      bestPractices: {
        dos: [
          'استخدم الأرقام العربية الشرقية (٠١٢٣) للسياقات العربية',
          'ادعم كلا نظامي الأرقام حسب الإعدادات المحلية',
          'طبّق تنسيق الأرقام المناسب (فواصل الآلاف)',
        ],
        donts: [
          'لا تخلط أنظمة الأرقام في نفس العرض',
          'لا تفترض أن جميع الإعدادات العربية تفضّل الأرقام الشرقية',
          'لا تُثبّت تنسيق الأرقام يدوياً — استخدم التنسيق المحلي',
        ],
      },
      related: [
        { slug: 'hijri-date', name: 'التاريخ الهجري', description: 'تاريخ إسلامي بأرقام عربية' },
      ],
    },
    'hijri-date': {
      useCases: [
        { title: 'عرض تواريخ التقويم الهجري', icon: 'Mosque' },
        { title: 'منتقيات تاريخ مزدوجة التقويم', icon: 'CalendarBlank' },
        { title: 'مراجع تواريخ المناسبات الدينية', icon: 'Moon' },
        { title: 'ترويسات تواريخ المستندات الرسمية', icon: 'Certificate' },
      ],
      bestPractices: {
        dos: [
          'أظهر كلا التاريخين الهجري والميلادي عند الصلة',
          'استخدم أسماء الأشهر الصحيحة بالعربية',
          'ادعم تقويم أم القرى للسياقات السعودية',
        ],
        donts: [
          'لا تفترض تطابقاً واحداً لواحد بين الأشهر',
          'لا تستخدم الأرقام الغربية للتواريخ الهجرية في السياق العربي',
          'لا تحذف مؤشر نظام التقويم',
        ],
      },
      related: [
        { slug: 'calendar', name: 'التقويم', description: 'مكوّن شبكة التقويم' },
        { slug: 'arabic-number', name: 'الرقم العربي', description: 'عرض الأرقام العربية الشرقية' },
      ],
    },
    'prayer-times': {
      useCases: [
        { title: 'أدوات جدول الصلاة اليومي', icon: 'Clock' },
        { title: 'تطبيقات المساجد والمجتمعات', icon: 'Mosque' },
        { title: 'تطبيقات نمط الحياة الإسلامية', icon: 'Moon' },
        { title: 'أدوات جدول رمضان والصيام', icon: 'Moon' },
      ],
      bestPractices: {
        dos: [
          'أبرز الصلاة القادمة بوضوح',
          'أظهر العدّ التنازلي لوقت الصلاة التالية',
          'ادعم طرق حساب متعددة',
        ],
        donts: [
          'لا تُثبّت أوقات الصلاة يدوياً — احسبها دائماً للموقع',
          'لا تنسَ مراعاة تغييرات التوقيت الصيفي',
          'لا تحذف تسميات الوصول لكل وقت صلاة',
        ],
      },
      related: [
        { slug: 'hijri-date', name: 'التاريخ الهجري', description: 'عرض التاريخ الإسلامي' },
        { slug: 'card', name: 'البطاقة', description: 'حاوية لعناصر الصلاة' },
      ],
    },
    'zakat-calculator': {
      useCases: [
        { title: 'أدوات تقدير الزكاة الشخصية', icon: 'HandCoins' },
        { title: 'تطبيقات التمويل الإسلامي', icon: 'CurrencyDollar' },
        { title: 'منصات الأعمال الخيرية والتبرع', icon: 'HandCoins' },
        { title: 'أدوات التخطيط المالي نهاية العام', icon: 'CalendarBlank' },
      ],
      bestPractices: {
        dos: [
          'ادعم أنواع أصول متعددة (ذهب، فضة، نقد، أسهم)',
          'أظهر عتبة النصاب بوضوح',
          'اسمح باختيار العملة مع التنسيق المناسب',
        ],
        donts: [
          'لا تقدّم النتائج كأحكام دينية قطعية',
          'لا تنسَ إضافة إخلاء مسؤولية حول استشارة العلماء',
          'لا تستخدم قيم نصاب قديمة — احصل على الأسعار الحالية',
        ],
      },
      related: [
        { slug: 'number-input', name: 'إدخال رقمي', description: 'إدخال رقمي للمبالغ' },
        { slug: 'card', name: 'البطاقة', description: 'حاوية لأقسام الحاسبة' },
      ],
    },
    'chart': {
      bestPractices: {
        dos: [
          'استخدم أنواع رسوم بيانية مناسبة للبيانات (أعمدة، خطوط، دائري)',
          'وفّر تسميات محاور واضحة ومفاتيح',
          'تأكد من تباين ألوان كافٍ لإمكانية الوصول',
        ],
        donts: [
          'لا تستخدم تأثيرات ثلاثية الأبعاد تُشوّه إدراك البيانات',
          'لا تُزدحم الرسوم بسلاسل بيانات كثيرة',
          'لا تنسَ التعامل مع حالات البيانات الفارغة أو قيد التحميل',
        ],
      },
      related: [
        { slug: 'stats-card', name: 'بطاقة الإحصائيات', description: 'عرض مؤشرات الأداء المرافقة' },
        { slug: 'data-table', name: 'جدول البيانات', description: 'بيانات جدولية بجوار الرسوم البيانية' },
      ],
    },
    'timeline': {
      bestPractices: {
        dos: [
          'استخدم علامات بصرية واضحة لحالة كل حدث',
          'أظهر التواريخ/الأوقات بجوار أوصاف الأحداث',
          'ادعم كلاً من التخطيطين الرأسي والأفقي عند الاقتضاء',
        ],
        donts: [
          'لا تستخدمه للخطوات التسلسلية — استخدم Stepper بدلاً من ذلك',
          'لا تعرض أحداثاً كثيرة بدون تصفّح أو تمرير',
          'لا تحذف مؤشرات الحالة للأحداث',
        ],
      },
      related: [
        { slug: 'stepper', name: 'مؤشر الخطوات', description: 'عملية خطوات متسلسلة' },
        { slug: 'progress', name: 'شريط التقدّم', description: 'مؤشر تقدّم خطي' },
      ],
    },
    'carousel': {
      bestPractices: {
        dos: [
          'وفّر عناصر تحكم في التنقّل (أسهم + نقاط)',
          'ادعم التنقّل بلوحة المفاتيح والتمرير',
          'أوقف التشغيل التلقائي عند التحويم والتركيز',
        ],
        donts: [
          'لا تستخدم التشغيل التلقائي للمحتوى المهم',
          'لا تجعل الدوّار الطريقة الوحيدة للوصول للمحتوى',
          'لا تُخفِ عناصر التحكم في التنقّل تماماً',
        ],
      },
      related: [
        { slug: 'tabs', name: 'التبويبات', description: 'تنقّل بديل بين اللوحات' },
        { slug: 'pagination', name: 'التصفّح', description: 'التنقّل على مستوى الصفحة' },
      ],
    },
  },
}
