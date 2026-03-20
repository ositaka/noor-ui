/**
 * EN translations - email templates
 */

export const email_templates = {
  emailTemplates: {
    title: 'Email Templates',
    subtitle: 'Production-ready MJML email templates with full RTL, LTR, and bilingual support.',
    description: 'Copy-paste ready HTML for transactional emails, newsletters, and notifications. Themed with NoorUI colors, customizable via CLI.',
    filters: {
      all: 'All Templates',
      transactional: 'Transactional',
      auth: 'Auth',
      notifications: 'Notifications',
      marketing: 'Marketing',
      industry: 'Industry',
    },
    variants: {
      ltr: 'English (LTR)',
      rtl: 'Arabic (RTL)',
      bilingual: 'Bilingual',
    },
    device: {
      desktop: 'Desktop',
      mobile: 'Mobile',
    },
    theme: {
      label: 'Theme',
    },
    actions: {
      copyHtml: 'Copy HTML',
      copied: 'Copied!',
      downloadHtml: 'Download HTML',
      back: 'Back to Templates',
      preview: 'Preview',
    },
    templates: {
      // Transactional
      'order-confirmation': {
        name: 'Order Confirmation',
        description: 'Order summary with item images, shipping address, and delivery estimate.',
      },
      'shipping-update': {
        name: 'Shipping Update',
        description: 'Delivery status notification with tracking number and estimated arrival.',
      },
      'invoice-receipt': {
        name: 'Invoice & Receipt',
        description: 'Detailed invoice with line items, VAT calculation, and payment info.',
      },
      'banking-transfer-receipt': {
        name: 'Bank Transfer Receipt',
        description: 'Transfer confirmation with sender/receiver details and reference number.',
      },
      'hotel-booking-confirmation': {
        name: 'Hotel Booking Confirmation',
        description: 'Reservation details with hotel photo, dates, and price breakdown.',
      },
      'payment-reminder': {
        name: 'Payment Reminder',
        description: 'Payment due notice with amount, deadline badge, and pay CTA.',
      },
      // Auth
      'welcome-onboarding': {
        name: 'Welcome & Onboarding',
        description: 'Welcome new users with feature highlights and a get-started CTA.',
      },
      'password-reset': {
        name: 'Password Reset',
        description: 'Secure password reset with expiry timer and security information.',
      },
      'otp-verification': {
        name: 'OTP Verification',
        description: 'Compact verification code display with expiry countdown.',
      },
      // Notifications
      'notification-alert': {
        name: 'Notification Alert',
        description: 'Compact alert with color-coded status stripe and action button.',
      },
      'healthcare-appointment-reminder': {
        name: 'Appointment Reminder',
        description: 'Medical appointment details with doctor info and preparation instructions.',
      },
      'education-assignment-notification': {
        name: 'Assignment Notification',
        description: 'New assignment alert with due date, teacher name, and description.',
      },
      'support-ticket': {
        name: 'Support Ticket',
        description: 'Ticket confirmation with reference number, priority, and response time.',
      },
      // Marketing
      'newsletter': {
        name: 'Newsletter',
        description: 'Editorial layout with hero image, featured article, and article grid.',
      },
      'event-invitation': {
        name: 'Event Invitation',
        description: 'Event details with date, venue, speaker info, and RSVP button.',
      },
      'feedback-request': {
        name: 'Feedback Request',
        description: 'Post-service feedback with star rating and quick review CTA.',
      },
      // Industry
      'real-estate-viewing-confirmation': {
        name: 'Property Viewing',
        description: 'Viewing confirmation with property details, agent info, and address.',
      },
      'marketplace-order-notification': {
        name: 'Marketplace Order',
        description: 'Seller notification for new orders with item details and shipping deadline.',
      },
      'government-service-confirmation': {
        name: 'Government Service',
        description: 'Service request confirmation with tracking number and processing time.',
      },
      'esports-tournament-registration': {
        name: 'Tournament Registration',
        description: 'Esports registration confirmation with team details and prize pool.',
      },
      'islamic-finance-zakat-receipt': {
        name: 'Zakat Receipt',
        description: 'Zakat payment receipt with calculation breakdown and distribution info.',
      },
    },
  },
}
