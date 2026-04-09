import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../dialog';

const TestDialog = () => (
  <Dialog>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>Dialog description text</DialogDescription>
      </DialogHeader>
      <div>Dialog body content</div>
      <DialogFooter>
        <DialogClose>Cancel</DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

describe('Dialog', () => {
  it('renders trigger', () => {
    render(<TestDialog />);
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog description text')).toBeInTheDocument();
  });

  it('shows body content when open', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByText('Dialog body content')).toBeInTheDocument();
  });

  it('has close button', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('closes on close button click', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on escape key', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders controlled open state', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Controlled</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Controlled')).toBeInTheDocument();
  });

  it('renders in RTL context', async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <TestDialog />
      </div>
    );
    await user.click(screen.getByText('Open Dialog'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('traps focus within dialog when open', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    // Focus should be within the dialog
    const dialog = screen.getByRole('dialog');
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it('restores focus to trigger after closing', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    const trigger = screen.getByText('Open Dialog');
    await user.click(trigger);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });

  it('has accessible dialog title via aria-labelledby', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    const dialog = screen.getByRole('dialog');
    // Radix associates the title via aria-labelledby
    expect(dialog).toHaveAttribute('aria-labelledby');
  });

  it('has accessible description via aria-describedby', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-describedby');
  });

  it('close button uses logical end positioning for RTL', async () => {
    const user = userEvent.setup();
    render(<TestDialog />);
    await user.click(screen.getByText('Open Dialog'));
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    // Should use end-4 (logical property) not right-4
    expect(closeBtn).toHaveClass('end-4');
  });

  it('calls onOpenChange callback', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Desc</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    await user.click(screen.getByText('Open'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
