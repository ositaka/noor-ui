/**
 * EN translations - components-misc
 * Auto-generated from lib/i18n.ts
 */

export const components_misc = {
avatarComponent: {
      title: 'Avatar',
      description: 'Display user profile images with automatic fallback to initials. Supports multiple sizes and RTL text direction for initials.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        withImage: 'With Image',
        withInitials: 'With Initials Fallback',
        sizes: 'Sizes',
        shapes: 'Shapes',
      },
      props: {
        title: 'Props',
        src: 'The image source URL',
        alt: 'Alternative text for the image',
        size: 'Size of the avatar',
        className: 'Additional CSS classes to apply',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Avatar initials automatically adapt to RTL text direction.',
      },
    },

alertComponent: {
      title: 'Alert',
      description: 'Display important messages and notifications. Supports multiple variants with icons and full RTL support.',
      preview: 'Preview',
      installation: 'Installation',
      usage: 'Usage',
      examples: {
        title: 'Examples',
        variants: 'Variants',
        withIcon: 'With Icons',
        withTitle: 'With Title',
        dismissible: 'Dismissible',
      },
      props: {
        title: 'Props',
        variant: 'Visual style variant of the alert',
        className: 'Additional CSS classes to apply',
      },
      accessibility: {
        title: 'Accessibility',
      },
      rtl: {
        title: 'RTL Considerations',
        description: 'Alerts automatically support RTL layout with proper icon and text alignment.',
      },
    },

stepperComponent: {
      title: 'Stepper',
      description: 'Multi-step progress indicator for forms and wizards',
      actions: {
        previous: 'Previous',
        next: 'Next',
      },
      variants: {
        simpleVariant: 'Simple Variant',
        simpleDesc: 'Compact style ideal for top navigation',
        circlesVariant: 'Circles Variant',
        circlesDesc: 'Large circles with scale effect',
        verticalOrientation: 'Vertical Orientation',
      },
      useCases: {
        registrationForms: 'Registration Forms',
        checkoutProcess: 'Checkout Process',
        setupWizards: 'Setup Wizards',
        multiStepWorkflows: 'Multi-step Workflows',
      },
      features: {
        threeVariants: 'Three visual variants (default, simple, circles)',
        orientations: 'Horizontal and vertical orientations',
        clickableSteps: 'Clickable steps with validation',
        optionalSteps: 'Optional steps support',
        visualStates: 'Visual states (complete, current, upcoming)',
        bilingualSupport: 'Full bilingual support',
        rtlSupport: 'RTL/LTR support',
        accessibility: 'Accessibility features (ARIA)',
      },
    },
}
