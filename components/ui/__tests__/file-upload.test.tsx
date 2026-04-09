import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload } from '../file-upload';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

describe('FileUpload', () => {
  it('renders without crashing', () => {
    renderWithDirection(<FileUpload />);
    expect(screen.getByRole('button', { name: 'Upload files' })).toBeInTheDocument();
  });

  it('renders drop zone with upload text', () => {
    renderWithDirection(<FileUpload />);
    expect(screen.getByText('Click to upload or drag and drop')).toBeInTheDocument();
  });

  it('shows file type info when accept is set', () => {
    renderWithDirection(<FileUpload accept=".pdf,.doc" />);
    expect(screen.getByText(/Accepted formats.*\.pdf,\.doc/)).toBeInTheDocument();
  });

  it('shows max size info', () => {
    renderWithDirection(<FileUpload maxSize={10 * 1024 * 1024} />);
    expect(screen.getByText(/Max size.*10 MB/)).toBeInTheDocument();
  });

  it('is disabled when disabled prop is set', () => {
    renderWithDirection(<FileUpload disabled />);
    const dropZone = screen.getByRole('button', { name: 'Upload files' });
    expect(dropZone).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders in RTL context with Arabic text', () => {
    renderWithDirection(<FileUpload />, 'rtl');
    expect(screen.getByText('انقر للتحميل أو اسحب وأسقط')).toBeInTheDocument();
  });

  it('has hidden file input', () => {
    renderWithDirection(<FileUpload />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('sr-only');
  });

  it('shows max files info when multiple', () => {
    renderWithDirection(<FileUpload multiple maxFiles={3} />);
    expect(screen.getByText(/Max 3 files/)).toBeInTheDocument();
  });
});
