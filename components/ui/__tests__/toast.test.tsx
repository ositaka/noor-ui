import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from '../toast';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <DirectionProvider controlledDirection="ltr" controlledLocale="en">
      <ToastProvider>
        {ui}
        <ToastViewport />
      </ToastProvider>
    </DirectionProvider>
  );
};

describe('Toast', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <Toast open>
        <ToastTitle>Title</ToastTitle>
        <ToastDescription>Description</ToastDescription>
      </Toast>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders all variants', () => {
    const variants = ['default', 'destructive', 'success'] as const;
    for (const variant of variants) {
      const { unmount } = render(
        <DirectionProvider controlledDirection="ltr" controlledLocale="en">
          <ToastProvider>
            <Toast open variant={variant}>
              <ToastTitle>Test</ToastTitle>
            </Toast>
            <ToastViewport />
          </ToastProvider>
        </DirectionProvider>
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
      unmount();
    }
  });

  it('renders close button', () => {
    renderWithProviders(
      <Toast open>
        <ToastTitle>Title</ToastTitle>
        <ToastClose />
      </Toast>
    );
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('renders action button', () => {
    renderWithProviders(
      <Toast open>
        <ToastTitle>Title</ToastTitle>
        <ToastAction altText="undo">Undo</ToastAction>
      </Toast>
    );
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });

  it('renders in RTL context', () => {
    render(
      <DirectionProvider controlledDirection="rtl" controlledLocale="ar">
        <ToastProvider>
          <Toast open>
            <ToastTitle>عنوان</ToastTitle>
            <ToastDescription>وصف</ToastDescription>
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </DirectionProvider>
    );
    expect(screen.getByText('عنوان')).toBeInTheDocument();
    expect(screen.getByText('وصف')).toBeInTheDocument();
  });
});
