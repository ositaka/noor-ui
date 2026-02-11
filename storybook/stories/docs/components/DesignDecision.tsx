import React from 'react';

interface DesignDecisionProps {
  title: string;
  children: React.ReactNode;
  type?: 'decision' | 'warning' | 'tip';
}

const STYLES = {
  decision: {
    border: 'border-s-4 border-s-primary',
    bg: 'bg-primary/5',
    icon: '💡',
    label: 'Design Decision',
  },
  warning: {
    border: 'border-s-4 border-s-warning',
    bg: 'bg-warning/5',
    icon: '⚠️',
    label: 'Important',
  },
  tip: {
    border: 'border-s-4 border-s-info',
    bg: 'bg-info/5',
    icon: '💎',
    label: 'Pro Tip',
  },
};

export function DesignDecision({ title, children, type = 'decision' }: DesignDecisionProps) {
  const style = STYLES[type];
  return (
    <div className={`${style.border} ${style.bg} rounded-e-lg p-4 my-4`}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-1">
        {style.icon} {style.label}
      </p>
      <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
      <div className="text-sm text-muted-foreground [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  );
}
