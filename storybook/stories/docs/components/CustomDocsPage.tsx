import React from 'react';
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';
import { DocsLink } from './DocsLink';
import { useOf } from '@storybook/blocks';

export function CustomDocsPage() {
  let title = '';
  try {
    const resolvedOf = useOf('meta');
    if (resolvedOf.type === 'meta') {
      title = (resolvedOf.preparedMeta as any)?.title || '';
    }
  } catch {
    // ignore
  }

  return (
    <>
      <Title />
      {title && <DocsLink title={title} />}
      <Primary />
      <Controls />
      <Stories />
    </>
  );
}
