import React from 'react';
import { Source } from '@storybook/blocks';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'tsx', filename }: CodeBlockProps) {
  return (
    <div className="my-4 overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border border-border rounded-t-lg">
          <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          <span className="text-[10px] text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <Source code={code} language={language} dark />
    </div>
  );
}
