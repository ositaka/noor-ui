import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = 'tsx', filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative my-4 rounded-lg border border-border overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between bg-muted/50 px-4 py-2 border-b border-border">
          <span className="text-xs font-mono text-muted-foreground">{filename}</span>
          <span className="text-[10px] text-muted-foreground uppercase">{language}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed" dir="ltr">
          <code className="font-mono text-foreground">{code}</code>
        </pre>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
          className="absolute top-2 end-2 text-xs bg-muted hover:bg-muted/80 text-muted-foreground px-2 py-1 rounded border border-border transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
