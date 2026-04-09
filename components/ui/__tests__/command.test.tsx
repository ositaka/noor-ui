import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from '../command';

describe('Command', () => {
  it('renders without crashing', () => {
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders command items', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('filters items on search', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    await user.type(screen.getByPlaceholderText('Search...'), 'cal');
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    // cmdk filters by default — non-matching items are hidden
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
  });

  it('shows empty state when no matches', async () => {
    const user = userEvent.setup();
    render(
      <Command>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>Calendar</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    await user.type(screen.getByPlaceholderText('Search...'), 'xyz');
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders group headings', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup heading="Recent">
            <CommandItem>Item 1</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('Recent')).toBeInTheDocument();
  });

  it('renders shortcuts', () => {
    render(
      <Command>
        <CommandList>
          <CommandGroup>
            <CommandItem>
              Copy<CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByText('⌘C')).toBeInTheDocument();
  });

  it('merges custom className on Command', () => {
    render(
      <Command className="custom-command" data-testid="cmd">
        <CommandList>
          <CommandGroup><CommandItem>Item</CommandItem></CommandGroup>
        </CommandList>
      </Command>
    );
    expect(screen.getByTestId('cmd')).toHaveClass('custom-command');
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Command>
          <CommandInput placeholder="بحث..." />
          <CommandList>
            <CommandGroup>
              <CommandItem>عنصر</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    );
    expect(screen.getByPlaceholderText('بحث...')).toBeInTheDocument();
    expect(screen.getByText('عنصر')).toBeInTheDocument();
  });
});
