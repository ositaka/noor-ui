/**
 * EN translations - components-experimental
 * Experimental and AI/LLM components
 */

export const components_experimental = {
chatMessageComponent: {
    title: 'Chat Message',
    description: 'Display chat messages from users, AI assistants, or system notifications. Perfect for building chat interfaces with full RTL support and customizable actions.',
    preview: 'Preview',
    installation: 'Installation',
    usage: 'Usage',
    examples: {
      title: 'Examples',
      messageRoles: 'Message Roles',
      messageRolesDesc: 'Display messages from different roles: user, assistant, or system',
      withActions: 'With Actions',
      withActionsDesc: 'Add copy and regenerate buttons to messages',
      compactVariant: 'Compact Variant',
      compactVariantDesc: 'Use the compact variant for denser chat layouts',
    },
    props: {
      role: 'The role/sender of the message',
      content: 'The message content (supports markdown)',
      variant: 'Visual style variant',
      state: 'Message state for animations and styling',
      timestamp: 'Optional timestamp to display',
      avatar: 'Optional avatar URL',
      name: 'Optional name/label for the sender',
      showCopy: 'Show copy button',
      showRegenerate: 'Show regenerate button (assistant only)',
      onCopy: 'Callback when copy is clicked',
      onRegenerate: 'Callback when regenerate is clicked',
      isRTL: 'Whether text direction is RTL',
    },
    accessibility: {
      title: 'Accessibility',
      screenReader: 'Screen Reader',
      screenReaderDesc: 'The component uses semantic HTML with proper ARIA attributes. The role, timestamp, and content are all announced correctly.',
      keyboardNav: 'Keyboard Navigation',
      tabKey: 'Navigate through action buttons',
      enterKey: 'Activate buttons (Copy, Regenerate)',
    },
    rtl: {
      title: 'RTL Considerations',
      description: 'Chat messages automatically adapt to RTL layout. User messages align to the end (right in RTL), and assistant messages to the start (left in RTL). Set isRTL prop for RTL-specific text.',
      ltr: 'LTR (English)',
      rtl: 'RTL (العربية)',
    },
    related: {
      title: 'Related Components',
      promptInput: 'Input component for sending chat messages',
      messageActions: 'Action buttons for chat messages',
      thinkingIndicator: 'Loading state for AI responses',
    },
  },

modelSelectorComponent: {
    title: 'Model Selector',
    description: 'Select AI models from a list with detailed specifications. Features bilingual support, visual indicators for speed and pricing, and recommended model highlighting.',
    examples: {
      title: 'Examples',
      basic: 'Basic Usage',
      basicDesc: 'Simple model selector with default models',
      custom: 'Custom Models',
      customDesc: 'Define your own models with custom specs',
      bilingual: 'Bilingual Support',
      bilingualDesc: 'Show model information in both English and Arabic',
    },
    props: {
      models: 'Array of available AI models',
      value: 'Selected model ID',
      onValueChange: 'Callback when model changes',
      isRTL: 'Whether text direction is RTL',
      placeholder: 'Placeholder text',
      placeholderAr: 'Placeholder text in Arabic',
      className: 'Additional CSS classes',
    },
    interface: 'AIModel Interface',
    related: {
      chatMessage: 'Display AI chat responses',
      thinkingIndicator: 'Show AI processing state',
    },
  },

thinkingIndicatorComponent: {
    title: 'Thinking Indicator',
    description: 'Animated indicator showing that an AI is processing. Perfect for chat interfaces to show that the assistant is typing or thinking.',
    examples: {
      title: 'Examples',
      basic: 'Basic',
      compact: 'Compact',
      withText: 'With Custom Text',
    },
    props: {
      variant: 'Visual style variant',
      text: 'Custom loading text',
      className: 'Additional CSS classes',
    },
  },

  workflowNodeComponent: {
    title: 'Workflow Node',
    description: 'Visual node component for building workflow diagrams. Represents a single step in a workflow with inputs, outputs, and connection points.',
    examples: {
      title: 'Examples',
      basic: 'Basic Node',
      withPorts: 'With Input/Output Ports',
      selected: 'Selected State',
    },
    props: {
      id: 'Unique node identifier',
      title: 'Node title',
      type: 'Node type (determines icon and color)',
      selected: 'Whether node is selected',
      onSelect: 'Callback when node is selected',
      inputs: 'Array of input ports',
      outputs: 'Array of output ports',
    },
  },

  workflowCanvasComponent: {
    title: 'Workflow Canvas',
    description: 'Interactive canvas for building workflow diagrams. Drag-and-drop nodes, connect them, and create complex AI workflows.',
    examples: {
      title: 'Examples',
      empty: 'Empty Canvas',
      withNodes: 'With Nodes',
      fullWorkflow: 'Complete Workflow',
    },
    props: {
      nodes: 'Array of workflow nodes',
      edges: 'Array of connections between nodes',
      onNodesChange: 'Callback when nodes change',
      onEdgesChange: 'Callback when edges change',
      onConnect: 'Callback when nodes are connected',
    },
  },

  conversationHistoryComponent: {
    title: 'Conversation History',
    description: 'Display a list of past conversations with search and filtering. Perfect for chat applications to show conversation history.',
    examples: {
      title: 'Examples',
      list: 'Conversation List',
      withSearch: 'With Search',
      withFilters: 'With Filters',
    },
    props: {
      conversations: 'Array of conversations',
      selected: 'Selected conversation ID',
      onSelect: 'Callback when conversation is selected',
      onDelete: 'Callback when conversation is deleted',
      searchable: 'Enable search functionality',
    },
  },

  dashboardShellComponent: {
    title: 'Dashboard Shell',
    description: 'Complete dashboard layout with sidebar, header, and content area. Fully responsive with RTL support.',
    examples: {
      title: 'Examples',
      basic: 'Basic Layout',
      withSidebar: 'With Sidebar',
      fullDashboard: 'Complete Dashboard',
    },
    props: {
      sidebar: 'Sidebar content',
      header: 'Header content',
      children: 'Main content area',
      sidebarCollapsed: 'Whether sidebar is collapsed',
    },
    bestPractices: {
      doList: [
        'Keep navigation items organized and intuitive',
        'Provide visual feedback for the active navigation item',
        'Make the sidebar collapsible for more screen space',
        'Ensure consistent spacing and alignment across sections',
        'Use responsive design for mobile devices',
      ],
      dontList: [
        "Don't overcrowd the sidebar with too many items",
        "Don't hide important navigation without a way to access it",
        "Don't forget to test on different screen sizes",
        "Don't use inconsistent navigation patterns",
        "Don't neglect keyboard navigation support",
      ],
    },
  },

  parameterSliderComponent: {
    title: 'Parameter Slider',
    description: 'Specialized slider for AI model parameters like temperature, top-p, and frequency penalty. Shows value and description.',
    examples: {
      title: 'Examples',
      temperature: 'Temperature',
      topP: 'Top P',
      frequencyPenalty: 'Frequency Penalty',
    },
    props: {
      label: 'Parameter label',
      description: 'Parameter description',
      value: 'Current value',
      min: 'Minimum value',
      max: 'Maximum value',
      step: 'Step increment',
      onChange: 'Callback when value changes',
    },
  },

  tokenCounterComponent: {
    title: 'Token Counter',
    description: 'Display token count and cost estimates for AI model inputs. Useful for showing usage limits and pricing.',
    examples: {
      title: 'Examples',
      basic: 'Basic Counter',
      withCost: 'With Cost Estimate',
      withLimit: 'With Token Limit',
    },
    props: {
      text: 'Text to count tokens for',
      model: 'AI model ID for accurate counting',
      showCost: 'Show cost estimate',
      limit: 'Token limit to warn about',
    },
  },

  promptInputComponent: {
    title: 'Prompt Input',
    description: 'Multi-line input for AI prompts with send button, file upload, and keyboard shortcuts. Perfect for chat interfaces.',
    examples: {
      title: 'Examples',
      basic: 'Basic Input',
      withUpload: 'With File Upload',
      withShortcuts: 'With Keyboard Shortcuts',
    },
    props: {
      value: 'Input value',
      onChange: 'Callback when value changes',
      onSubmit: 'Callback when form is submitted',
      placeholder: 'Placeholder text',
      allowUpload: 'Allow file uploads',
      maxLength: 'Maximum character length',
    },
  },

  userMenuComponent: {
    title: 'User Menu',
    description: 'User profile dropdown menu with avatar, account settings, and sign out. Fully accessible with keyboard navigation.',
    examples: {
      title: 'Examples',
      basic: 'Basic Menu',
      withAvatar: 'With Avatar',
      withNotifications: 'With Notifications Badge',
    },
    props: {
      user: 'User object with name, email, avatar',
      onSignOut: 'Callback when sign out is clicked',
      onSettings: 'Callback when settings is clicked',
    },
    bestPractices: {
      doList: [
        'Include user name and email for context',
        'Use clear icons for menu items',
        'Group related menu items (e.g., profile, settings, billing)',
        'Place sign out action at the bottom of the menu',
        'Include visual separation between action groups',
      ],
      dontList: [
        "Don't hide critical account actions deep in submenus",
        "Don't use ambiguous labels for menu items",
        "Don't clutter the menu with too many options",
        "Don't forget to handle sign out confirmation for safety",
        "Don't use inconsistent icon styles",
      ],
    },
  },

  messageActionsComponent: {
    title: 'Message Actions',
    description: 'Action buttons for chat messages (copy, regenerate, share, etc.). Customizable with icons and tooltips.',
    examples: {
      title: 'Examples',
      basic: 'Basic Actions',
      custom: 'Custom Actions',
      withTooltips: 'With Tooltips',
    },
    props: {
      actions: 'Array of action configurations',
      onAction: 'Callback when action is clicked',
      className: 'Additional CSS classes',
    },
  },
}
