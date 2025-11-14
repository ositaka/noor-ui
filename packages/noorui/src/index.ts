/**
 * Noor UI - Beautiful RTL-first React components for bilingual applications
 *
 * @description A comprehensive UI component library built with Radix UI and Tailwind CSS,
 * featuring full RTL support and bilingual (English/Arabic) capabilities.
 *
 * @version 0.1.0
 * @license MIT
 * @author Nuno Marques <info@ositaka.com>
 * @homepage https://noorui.com
 */

// Core components will be exported here
// For now, this is a placeholder to get the package handler ready

export const version = '0.1.0';

export const packageInfo = {
  name: 'noorui',
  description: 'Beautiful RTL-first React components for bilingual applications',
  version: '0.1.0',
  features: [
    'RTL-first design',
    'Bilingual support (English/Arabic)',
    'Built on Radix UI primitives',
    'Tailwind CSS styling',
    'Full TypeScript support',
    'Accessibility compliant',
    'GCC-specific components',
  ],
};

// Export a simple test component to verify the package works
export { default as NoorProvider } from './provider';
