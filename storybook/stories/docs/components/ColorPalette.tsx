import React, { useEffect, useState } from 'react';

interface ColorSwatch {
  name: string;
  variable: string;
  value: string;
}

interface ColorGroup {
  title: string;
  colors: ColorSwatch[];
}

function getComputedColor(variable: string): string {
  if (typeof window === 'undefined') return '';
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="absolute top-1 end-1 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-background/80 backdrop-blur px-1.5 py-0.5 rounded text-foreground border border-border"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function Swatch({ name, variable, value }: ColorSwatch) {
  return (
    <div className="group relative flex flex-col gap-1.5">
      <div
        className="h-16 w-full rounded-md border border-border shadow-sm"
        style={{ backgroundColor: value }}
      />
      <CopyButton text={variable} />
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">{name}</p>
        <p className="text-[10px] text-muted-foreground font-mono">{variable}</p>
      </div>
    </div>
  );
}

const SEMANTIC_COLORS = [
  { name: 'Background', variable: '--color-background' },
  { name: 'Foreground', variable: '--color-foreground' },
  { name: 'Primary', variable: '--color-primary' },
  { name: 'Primary FG', variable: '--color-primary-foreground' },
  { name: 'Secondary', variable: '--color-secondary' },
  { name: 'Secondary FG', variable: '--color-secondary-foreground' },
  { name: 'Muted', variable: '--color-muted' },
  { name: 'Muted FG', variable: '--color-muted-foreground' },
  { name: 'Accent', variable: '--color-accent' },
  { name: 'Accent FG', variable: '--color-accent-foreground' },
  { name: 'Destructive', variable: '--color-destructive' },
  { name: 'Destructive FG', variable: '--color-destructive-foreground' },
  { name: 'Card', variable: '--color-card' },
  { name: 'Card FG', variable: '--color-card-foreground' },
  { name: 'Popover', variable: '--color-popover' },
  { name: 'Popover FG', variable: '--color-popover-foreground' },
  { name: 'Border', variable: '--color-border' },
  { name: 'Input', variable: '--color-input' },
  { name: 'Ring', variable: '--color-ring' },
];

const STATUS_COLORS = [
  { name: 'Success', variable: '--color-success' },
  { name: 'Success FG', variable: '--color-success-foreground' },
  { name: 'Warning', variable: '--color-warning' },
  { name: 'Warning FG', variable: '--color-warning-foreground' },
  { name: 'Info', variable: '--color-info' },
  { name: 'Info FG', variable: '--color-info-foreground' },
];

export function ColorPalette() {
  const [colors, setColors] = useState<ColorGroup[]>([]);

  useEffect(() => {
    function readColors() {
      const semantic: ColorSwatch[] = SEMANTIC_COLORS.map(c => ({
        name: c.name,
        variable: c.variable,
        value: getComputedColor(c.variable),
      }));
      const status: ColorSwatch[] = STATUS_COLORS.map(c => ({
        name: c.name,
        variable: c.variable,
        value: getComputedColor(c.variable),
      }));
      setColors([
        { title: 'Semantic Palette', colors: semantic },
        { title: 'Status Colors', colors: status },
      ]);
    }

    readColors();

    const observer = new MutationObserver(readColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'dir', 'style'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-8">
      {colors.map(group => (
        <div key={group.title}>
          <h3 className="text-lg font-semibold text-foreground mb-4">{group.title}</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
            {group.colors.map(color => (
              <Swatch key={color.variable} {...color} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
