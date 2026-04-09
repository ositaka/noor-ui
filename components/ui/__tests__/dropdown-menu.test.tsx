import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from '../dropdown-menu';

const TestDropdown = ({ onSelect }: { onSelect?: () => void }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onSelect={onSelect}>Edit</DropdownMenuItem>
      <DropdownMenuItem>Delete</DropdownMenuItem>
      <DropdownMenuItem>
        Copy<DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

describe('DropdownMenu', () => {
  it('renders trigger', () => {
    render(<TestDropdown />);
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(<TestDropdown />);
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows label and items', async () => {
    const user = userEvent.setup();
    render(<TestDropdown />);
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  it('shows keyboard shortcut', async () => {
    const user = userEvent.setup();
    render(<TestDropdown />);
    await user.click(screen.getByText('Open Menu'));
    expect(screen.getByText('⌘C')).toBeInTheDocument();
  });

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<TestDropdown onSelect={onSelect} />);
    await user.click(screen.getByText('Open Menu'));
    await user.click(screen.getByText('Edit'));
    expect(onSelect).toHaveBeenCalled();
  });

  it('closes after item selection', async () => {
    const user = userEvent.setup();
    render(<TestDropdown />);
    await user.click(screen.getByText('Open Menu'));
    await user.click(screen.getByText('Edit'));
    // Menu should close after selection
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <TestDropdown />
      </div>
    );
    expect(screen.getByText('Open Menu')).toBeInTheDocument();
  });
});
