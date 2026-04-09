import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
} from '../context-menu';

const TestContextMenu = () => (
  <ContextMenu>
    <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuLabel>Actions</ContextMenuLabel>
      <ContextMenuSeparator />
      <ContextMenuItem>Cut</ContextMenuItem>
      <ContextMenuItem>Copy</ContextMenuItem>
      <ContextMenuItem>Paste</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
);

describe('ContextMenu', () => {
  it('renders trigger', () => {
    render(<TestContextMenu />);
    expect(screen.getByText('Right-click here')).toBeInTheDocument();
  });

  it('does not show content initially', () => {
    render(<TestContextMenu />);
    expect(screen.queryByText('Cut')).not.toBeInTheDocument();
  });

  it('opens on right-click (contextmenu event)', async () => {
    render(<TestContextMenu />);
    const trigger = screen.getByText('Right-click here');
    // Radix ContextMenu uses onContextMenu event
    fireEvent.contextMenu(trigger);
    // The menu items should appear
    expect(screen.getByText('Cut')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Paste')).toBeInTheDocument();
  });

  it('shows label', async () => {
    render(<TestContextMenu />);
    fireEvent.contextMenu(screen.getByText('Right-click here'));
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <TestContextMenu />
      </div>
    );
    expect(screen.getByText('Right-click here')).toBeInTheDocument();
  });
});
