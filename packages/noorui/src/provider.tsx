import * as React from 'react';

/**
 * NoorProvider - Root provider for Noor UI components
 *
 * This provider will handle:
 * - Direction context (LTR/RTL)
 * - Locale context (en/ar)
 * - Theme context
 *
 * @example
 * ```tsx
 * import { NoorProvider } from 'noorui';
 *
 * function App() {
 *   return (
 *     <NoorProvider locale="ar" direction="rtl">
 *       <YourApp />
 *     </NoorProvider>
 *   );
 * }
 * ```
 */

interface NoorProviderProps {
  children: React.ReactNode;
  locale?: 'en' | 'ar';
  direction?: 'ltr' | 'rtl';
}

const NoorProvider: React.FC<NoorProviderProps> = ({
  children,
  locale = 'en',
  direction = 'ltr',
}) => {
  React.useEffect(() => {
    // Set HTML attributes for direction and language
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [direction, locale]);

  return <>{children}</>;
};

export default NoorProvider;
