/**
 * EN translations - components-data
 * Auto-generated from lib/i18n.ts
 */

export const components_data = {
tableComponent: {
      title: 'Table',
      description: 'A responsive table component for displaying structured data with full RTL support. Uses semantic HTML with proper text alignment for bidirectional content.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      compositionPattern: {
        title: 'Composition Pattern',
        description: 'The Table component follows a composition pattern with seven sub-components:',
        table: 'Main wrapper with overflow handling',
        tableHeader: 'thead element for column headers',
        tableBody: 'tbody element for data rows',
        tableRow: 'tr element for table rows',
        tableHead: 'th element for header cells (uses text-start for RTL)',
        tableCell: 'td element for data cells',
        tableCaption: 'caption element for table description',
      },
      examples: {
        title: 'Examples',
        basic: 'Basic Table',
        withCaption: 'With Caption',
        striped: 'Striped Rows',
        hoverable: 'Hoverable Rows',
        withSelection: 'With Row Selection',
        responsive: 'Responsive Table',
      },
      props: {
        title: 'Props',
        className: 'Additional CSS classes to apply',
        tableHeader: 'Additional CSS classes to apply to thead',
        tableBody: 'Additional CSS classes to apply to tbody',
        tableRow: 'Additional CSS classes to apply to tr',
        tableHead: 'Additional CSS classes to apply to th (uses text-start for RTL support)',
        tableCell: 'Additional CSS classes to apply to td',
        tableCaption: 'Additional CSS classes to apply to caption',
      },
      demoContent: {
        caption: 'A list of recent users',
        captionTransactions: 'A list of your recent transactions',
        headers: {
          id: 'ID',
          name: 'Name',
          email: 'Email',
          role: 'Role',
          status: 'Status',
          select: 'Select',
          amount: 'Amount',
          date: 'Date',
        },
        sampleData: {
          john: 'John Doe',
          jane: 'Jane Smith',
          mike: 'Mike Johnson',
          sarah: 'Sarah Wilson',
        },
        emails: {
          john: 'john@example.com',
          jane: 'jane@example.com',
          mike: 'mike@example.com',
          sarah: 'sarah@example.com',
        },
        roles: {
          admin: 'Admin',
          user: 'User',
          editor: 'Editor',
          viewer: 'Viewer',
        },
        statuses: {
          active: 'Active',
          inactive: 'Inactive',
          pending: 'Pending',
        },
      },
      accessibility: {
        title: 'Accessibility',
        useCaption: 'Always Use Captions',
        useCaptionDesc: 'Use TableCaption to provide context about the table\'s purpose. This is essential for screen readers.',
        semanticHTML: 'Semantic HTML',
        semanticHTMLDesc: 'Use TableHeader, TableBody, and TableRow to create proper table structure that assistive technologies can understand.',
        headerScope: 'Header Scope',
        headerScopeDesc: 'TableHead components automatically have the correct scope attribute for accessibility.',
        keyboardNav: 'Keyboard Navigation',
        keyboardNavDesc: 'If your table has interactive elements (checkboxes, buttons), ensure they\'re keyboard accessible with proper focus management.',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Tables automatically support RTL layout. All text alignment uses text-start which adapts to the text direction automatically.',
        ltr: 'LTR (English)',
        rtlLabel: 'RTL (العربية)',
      },
      related: {
        title: 'Related Components',
        dataTable: 'Data Table',
        dataTableDesc: 'Advanced table with sorting and filtering',
        badge: 'Badge',
        badgeDesc: 'Status indicators for table cells',
        checkbox: 'Checkbox',
        checkboxDesc: 'For row selection',
      },
    },

dataTableComponent: {
      title: 'DataTable',
      breadcrumb: 'DataTable',
      badge: 'Enhanced',
      description: 'A powerful, feature-rich data table with sorting, filtering, pagination, and mobile responsiveness. Perfect for displaying complex datasets with full RTL support.',
      sections: {
        basicUsage: 'Basic Usage',
        features: 'Features',
        rtlConsiderations: 'RTL Considerations',
        relatedComponents: 'Related Components',
      },
      features: {
        sortableColumns: {
          title: 'Sortable Columns',
          description: 'Click column headers to sort with RTL-aware indicators',
        },
        searchFilter: {
          title: 'Search & Filter',
          description: 'Built-in search with clear button and custom filtering',
        },
        pagination: {
          title: 'Pagination',
          description: 'Integrated pagination for large datasets',
        },
        loadingStates: {
          title: 'Loading States',
          description: 'Skeleton loading animation while fetching data',
        },
        mobileResponsive: {
          title: 'Mobile Responsive',
          description: 'Cards or horizontal scroll view on small screens',
        },
        customCells: {
          title: 'Custom Cells',
          description: 'Render custom components in any cell',
        },
      },
      examples: {
        sortableColumns: 'Sortable Columns',
        sortableDescription: 'Click any column header to sort. Click again to reverse, and once more to clear sorting.',
        searchableTable: 'Searchable Table',
        paginatedTable: 'Paginated Table',
        customCellRendering: 'Custom Cell Rendering',
        loadingState: 'Loading State',
        completeExample: 'Complete Example',
        completeDescription: 'All features combined: sorting, searching, pagination, and custom cells.',
      },
      buttons: {
        triggerLoadingState: 'Trigger Loading State',
        loading: 'Loading...',
      },
      props: {
        dataTableProps: 'DataTable Props',
        columnDefProps: 'ColumnDef Props',
      },
      accessibility: {
        semanticHtml: {
          title: 'Semantic HTML',
          description: 'Built on top of the semantic Table component with proper thead, tbody, th, and td elements.',
        },
        keyboardNavigation: {
          title: 'Keyboard Navigation',
          description: 'Sortable column headers are buttons that can be activated with Enter or Space keys. Search input is fully keyboard accessible.',
        },
        screenReaders: {
          title: 'Screen Readers',
          description: 'Sort indicators provide visual feedback, and the table structure is properly announced to screen readers with column headers associated to their cells.',
        },
        loadingStates: {
          title: 'Loading States',
          description: 'Skeleton loading states provide visual feedback while maintaining layout stability. Interactive elements are disabled during loading.',
        },
      },
      rtl: {
        automaticSupport: {
          title: 'Automatic RTL Support',
          description: 'DataTable inherits RTL support from the base Table component. Sort indicators, search input, and all spacing use logical properties for proper RTL layout.',
        },
        sortIndicators: {
          title: 'Sort Indicators',
          description: 'Chevron icons automatically position correctly in both LTR and RTL contexts. The sorting button layout adapts to text direction.',
        },
        searchInput: {
          title: 'Search Input',
          description: 'Search icon and clear button position correctly using margin-inline-start (ms-) and margin-inline-end (me-) utilities, ensuring proper placement in both directions.',
        },
        mobileCards: {
          title: 'Mobile Cards',
          description: 'On mobile, the cards view uses a grid layout that automatically adapts to RTL, with labels on the start side and values on the end side.',
        },
      },
      related: {
        table: {
          title: 'Table',
          description: 'Base table component',
        },
        pagination: {
          title: 'Pagination',
          description: 'Page navigation control',
        },
        skeleton: {
          title: 'Skeleton',
          description: 'Loading placeholder',
        },
        input: {
          title: 'Input',
          description: 'Used for search functionality',
        },
        badge: {
          title: 'Badge',
          description: 'Status indicators',
        },
        button: {
          title: 'Button',
          description: 'Sort headers and actions',
        },
      },
    },

paginationComponent: {
      title: 'Pagination',
      description: 'Navigate through pages of content. Fully responsive with automatic RTL support for navigation arrows.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        basic: 'Basic',
        withText: 'With Page Info',
        controlled: 'Controlled',
        customSize: 'Custom Size',
      },
      props: {
        title: 'Props',
        currentPage: 'Current active page number',
        totalPages: 'Total number of pages',
        onPageChange: 'Callback when page changes',
        siblingCount: 'Number of sibling pages to show',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Pagination arrows automatically flip direction in RTL layouts.',
      },
    },

accordionComponent: {
      title: 'Accordion',
      description: 'Expandable content sections. Built on Radix UI with smooth animations and perfect RTL support.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        single: 'Single',
        multiple: 'Multiple',
        withIcons: 'With Icons',
        styled: 'Styled',
      },
      props: {
        title: 'Props',
        type: 'Single or multiple items can be open',
        collapsible: 'Whether items can be collapsed',
        defaultValue: 'Default open item(s)',
        value: 'Controlled open item(s)',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Accordion chevrons and content automatically adapt to RTL layout.',
      },
    },

collapsibleComponent: {
      title: 'Collapsible',
      description: 'Show and hide content with smooth animations. Built on Radix UI with full RTL support.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        basic: 'Basic',
        controlled: 'Controlled',
        withTrigger: 'Custom Trigger',
        animated: 'Animated',
      },
      props: {
        title: 'Props',
        open: 'Controlled open state',
        defaultOpen: 'Default open state',
        onOpenChange: 'Callback when open state changes',
        disabled: 'Whether the collapsible is disabled',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Collapsible content and animations work perfectly in RTL layouts.',
      },
    },

tabsComponent: {
      title: 'Tabs',
      description: 'Organize content into separate views. Built on Radix UI with smooth animations and full RTL support.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        basic: 'Basic',
        withIcons: 'With Icons',
        vertical: 'Vertical',
        disabled: 'Disabled Tab',
      },
      props: {
        title: 'Props',
        defaultValue: 'The default active tab value',
        value: 'Controlled active tab value',
        onValueChange: 'Callback when tab changes',
        orientation: 'Tabs orientation (horizontal or vertical)',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Tabs automatically align and flow correctly in RTL layouts.',
      },
    },

breadcrumbComponent: {
      title: 'Breadcrumb',
      description: 'Navigation component showing the current page location. Automatically adapts to RTL layouts with proper separator positioning.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        basic: 'Basic',
        withIcons: 'With Icons',
        withDropdown: 'With Dropdown',
        collapsed: 'Collapsed',
      },
      props: {
        title: 'Props',
        separator: 'Custom separator between breadcrumb items',
        className: 'Additional CSS classes to apply',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Breadcrumbs automatically reverse order and separator direction in RTL layouts.',
      },
    },

commandComponent: {
      title: 'Command',
      breadcrumb: 'Command',
      description: 'Fast, composable, command menu for React. Perfect for building search interfaces, command palettes, and quick actions.',
      sections: {
        basicCommand: 'Basic Command',
        commandDialog: 'Command Dialog',
        dialogDescription: 'Opens in a dialog with keyboard shortcut support (Cmd/Ctrl + K):',
        openCommandMenu: 'Open Command Menu',
      },
      rtl: {
        description: 'The Command component automatically adjusts icon positions, text alignment, and keyboard navigation for RTL layouts. Try toggling the direction to see it in action.',
      },
      accessibility: {
        keyboardNav: 'Fully keyboard navigable with arrow keys',
        screenReader: 'Screen reader friendly with proper ARIA labels',
        typeAhead: 'Type-ahead search support',
        focusManagement: 'Focus management in dialog mode',
        escapeKey: 'Escape key closes the dialog',
      },
    },

emptyStateComponent: {
      title: 'Empty State',
      description: 'Display helpful messages when there is no content to show',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
      },
      props: {
        icon: 'Icon to display at the top',
        title: 'Title of the empty state',
        description: 'Optional descriptive text',
        action: 'Action button(s) to display',
        className: 'Additional CSS classes',
      },
      bestPractices: {
        doList: [
          'Use relevant icons that represent the missing content',
          'Keep titles clear and concise',
          'Provide a clear action if the user can fix the situation',
          'Use a friendly and helpful tone',
        ],
        dontList: [
          "Don't use generic or irrelevant icons",
          "Don't use long or technical titles",
          "Don't leave users stuck without a clear action",
          "Don't use negative tone or blame the user",
        ],
      },
    },

statsCardComponent: {
      title: 'Stats Card',
      description: 'Display dashboard metrics with trend indicators',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
      },
      props: {
        label: 'Label for the metric',
        value: 'Value to display',
        trend: 'Trend percentage (positive or negative)',
        trendLabel: 'Trend label (e.g., "vs last month")',
        icon: 'Icon to display',
        isLoading: 'Loading state',
        format: 'Value format',
        className: 'Additional CSS classes',
        valueClassName: 'CSS classes for value element',
      },
      bestPractices: {
        doList: [
          'Use consistent icons across the dashboard',
          'Provide context for trend indicators (e.g., "vs last month")',
          'Use appropriate colors for trends (green for positive, red for negative)',
          'Keep labels short and descriptive',
          'Show loading state while fetching data',
        ],
        dontList: [
          "Don't use different icons for the same type of metrics",
          "Don't show trends without time context",
          "Don't use red for positive trends or green for negative",
          "Don't use long or ambiguous labels",
          "Don't display stale data without a loading indicator",
        ],
      },
    },
}
