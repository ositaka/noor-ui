import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Chart.js requires canvas which isn't available in jsdom.
// We mock the entire chart module to verify the component mounts.
vi.mock('react-chartjs-2', () => ({
  Line: (props: any) => <canvas data-testid="line-chart" {...props} />,
  Bar: (props: any) => <canvas data-testid="bar-chart" {...props} />,
  Doughnut: (props: any) => <canvas data-testid="doughnut-chart" {...props} />,
}));

vi.mock('chart.js', () => ({
  Chart: { register: vi.fn() },
  CategoryScale: class {},
  LinearScale: class {},
  PointElement: class {},
  LineElement: class {},
  BarElement: class {},
  ArcElement: class {},
  Filler: class {},
  Tooltip: class {},
}));

describe('Chart', () => {
  it('module can be imported without error', async () => {
    // Verify the module loads without throwing
    const mod = await import('../chart');
    expect(mod).toBeDefined();
    expect(mod.Chart).toBeDefined();
  });
});
