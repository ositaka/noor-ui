import React from 'react';

const THEMES = [
  { id: 'minimal', name: 'Minimal', nameAr: 'بسيط' },
  { id: 'futuristic', name: 'Futuristic', nameAr: 'مستقبلي' },
  { id: 'cozy', name: 'Cozy', nameAr: 'دافئ' },
  { id: 'artistic', name: 'Artistic', nameAr: 'فني' },
] as const;

interface ThemeComparisonProps {
  children: React.ReactNode;
  columns?: 2 | 4;
  dark?: boolean;
}

export function ThemeComparison({ children, columns = 4, dark = false }: ThemeComparisonProps) {
  return (
    <div className={`grid gap-4 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
      {THEMES.map(theme => (
        <div key={theme.id} className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">{theme.name}</p>
          <div
            className={`theme-${theme.id} ${dark ? 'dark' : ''} rounded-lg border border-border overflow-hidden`}
          >
            <div className="bg-background text-foreground p-4">
              {children}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
