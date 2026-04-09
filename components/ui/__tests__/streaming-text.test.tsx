import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StreamingText } from '../streaming-text';

describe('StreamingText', () => {
  it('renders without crashing', () => {
    render(<StreamingText text="Hello" />);
    // Initially may show partial text due to streaming
    expect(document.querySelector('span')).toBeInTheDocument();
  });

  it('displays full text when not streaming', () => {
    render(<StreamingText text="Full text here" isStreaming={false} />);
    expect(screen.getByText('Full text here')).toBeInTheDocument();
  });

  it('displays full text when autoStart is false', () => {
    render(<StreamingText text="No auto" autoStart={false} />);
    expect(screen.getByText('No auto')).toBeInTheDocument();
  });

  it('streams text character by character', async () => {
    vi.useFakeTimers();
    const { container } = render(<StreamingText text="Hi" speed={50} isStreaming autoStart />);

    // After first tick, the span should contain "H"
    act(() => { vi.advanceTimersByTime(50); });
    expect(container.querySelector('span')?.textContent).toContain('H');

    // After second tick, should contain "Hi"
    act(() => { vi.advanceTimersByTime(50); });
    expect(container.querySelector('span')?.textContent).toContain('Hi');

    vi.useRealTimers();
  });

  it('calls onComplete when streaming finishes', async () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<StreamingText text="AB" speed={10} onComplete={onComplete} />);

    act(() => { vi.advanceTimersByTime(10); }); // A
    act(() => { vi.advanceTimersByTime(10); }); // B
    act(() => { vi.advanceTimersByTime(10); }); // complete

    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('merges custom className', () => {
    render(<StreamingText text="Test" isStreaming={false} className="custom-class" data-testid="stream" />);
    expect(screen.getByTestId('stream')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<StreamingText ref={ref} text="Test" isStreaming={false} />);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLSpanElement));
  });
});
