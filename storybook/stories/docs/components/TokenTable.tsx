import React, { useState } from 'react';

interface Token {
  name: string;
  value: string;
  description?: string;
  preview?: React.ReactNode;
}

interface TokenTableProps {
  tokens: Token[];
  title?: string;
}

function CopyCell({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-start"
      title="Click to copy"
    >
      {copied ? 'Copied!' : text}
    </button>
  );
}

export function TokenTable({ tokens, title }: TokenTableProps) {
  return (
    <div className="space-y-3">
      {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
      <div className="overflow-x-auto border border-border rounded-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-start px-4 py-2.5 font-medium text-foreground">Token</th>
              <th className="text-start px-4 py-2.5 font-medium text-foreground">Value</th>
              {tokens.some(t => t.description) && (
                <th className="text-start px-4 py-2.5 font-medium text-foreground">Description</th>
              )}
              {tokens.some(t => t.preview) && (
                <th className="text-start px-4 py-2.5 font-medium text-foreground">Preview</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, i) => (
              <tr key={token.name} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                <td className="px-4 py-2.5">
                  <CopyCell text={token.name} />
                </td>
                <td className="px-4 py-2.5">
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded text-foreground">{token.value}</code>
                </td>
                {tokens.some(t => t.description) && (
                  <td className="px-4 py-2.5 text-xs text-muted-foreground">{token.description}</td>
                )}
                {tokens.some(t => t.preview) && (
                  <td className="px-4 py-2.5">{token.preview}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
