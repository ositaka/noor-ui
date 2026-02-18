import React from 'react';

interface DirectionComparisonProps {
  children: React.ReactNode;
}

export function DirectionComparison({ children }: DirectionComparisonProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">LTR (English)</p>
        <div
          dir="ltr"
          lang="en"
          className="rounded-lg border border-border overflow-hidden bg-background text-foreground p-4"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          {children}
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground">RTL (Arabic)</p>
        <div
          dir="rtl"
          lang="ar"
          className="rounded-lg border border-border overflow-hidden bg-background text-foreground p-4"
          style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
