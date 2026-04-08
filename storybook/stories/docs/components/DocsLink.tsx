import React from 'react';

const SITE = 'https://noorui.com/components';

// Components that don't have a noorui.com page
const EXCLUDED = new Set(['loading-spinner', 'markdown-editor', 'scroll-area', 'streaming-text']);

function toSlug(title: string): string {
  // "Core/Button Arrow" → "button-arrow"
  const name = title.includes('/') ? title.split('/').pop()! : title;
  return name.toLowerCase().replace(/\s+/g, '-');
}

export function DocsLink({ title }: { title: string }) {
  const slug = toSlug(title);
  if (EXCLUDED.has(slug)) return null;

  const url = `${SITE}/${slug}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '5px 12px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: 500,
        color: 'var(--sb-color-primary, #1ea7fd)',
        border: '1px solid color-mix(in srgb, var(--sb-color-primary, #1ea7fd) 30%, transparent)',
        backgroundColor: 'color-mix(in srgb, var(--sb-color-primary, #1ea7fd) 6%, transparent)',
        textDecoration: 'none',
        marginBottom: '16px',
        transition: 'background-color 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--sb-color-primary, #1ea7fd) 12%, transparent)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'color-mix(in srgb, var(--sb-color-primary, #1ea7fd) 6%, transparent)';
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
      View full docs on noorui.com
    </a>
  );
}
