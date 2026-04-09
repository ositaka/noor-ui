import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '../sheet';

const TestSheet = ({ side }: { side?: 'start' | 'end' | 'top' | 'bottom' }) => (
  <Sheet>
    <SheetTrigger>Open Sheet</SheetTrigger>
    <SheetContent side={side}>
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>Sheet description</SheetDescription>
      </SheetHeader>
      <div>Sheet body</div>
      <SheetFooter>
        <SheetClose>Done</SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

describe('Sheet', () => {
  it('renders trigger', () => {
    render(<TestSheet />);
    expect(screen.getByText('Open Sheet')).toBeInTheDocument();
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(<TestSheet />);
    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Sheet Title')).toBeInTheDocument();
  });

  it('shows description and body', async () => {
    const user = userEvent.setup();
    render(<TestSheet />);
    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByText('Sheet description')).toBeInTheDocument();
    expect(screen.getByText('Sheet body')).toBeInTheDocument();
  });

  it('has close button', async () => {
    const user = userEvent.setup();
    render(<TestSheet />);
    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  });

  it('closes on close button click', async () => {
    const user = userEvent.setup();
    render(<TestSheet />);
    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on escape key', async () => {
    const user = userEvent.setup();
    render(<TestSheet />);
    await user.click(screen.getByText('Open Sheet'));
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders with different sides', async () => {
    const user = userEvent.setup();
    for (const side of ['start', 'end', 'top', 'bottom'] as const) {
      const { unmount } = render(<TestSheet side={side} />);
      await user.click(screen.getByText('Open Sheet'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders in RTL context', async () => {
    const user = userEvent.setup();
    render(
      <div dir="rtl">
        <TestSheet />
      </div>
    );
    await user.click(screen.getByText('Open Sheet'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
