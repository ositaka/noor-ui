import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs';
import { DirectionProvider } from '../../providers/direction-provider';

const renderWithDirection = (ui: React.ReactElement, direction: 'ltr' | 'rtl' = 'ltr') => {
  const locale = direction === 'rtl' ? 'ar' : 'en';
  return render(
    <DirectionProvider controlledDirection={direction} controlledLocale={locale}>
      {ui}
    </DirectionProvider>
  );
};

const TestTabs = ({ defaultValue = 'tab1' }: { defaultValue?: string }) => (
  <Tabs defaultValue={defaultValue}>
    <TabsList>
      <TabsTrigger value="tab1">Tab 1</TabsTrigger>
      <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      <TabsTrigger value="tab3">Tab 3</TabsTrigger>
    </TabsList>
    <TabsContent value="tab1">Content 1</TabsContent>
    <TabsContent value="tab2">Content 2</TabsContent>
    <TabsContent value="tab3">Content 3</TabsContent>
  </Tabs>
);

describe('Tabs', () => {
  it('renders without crashing', () => {
    renderWithDirection(<TestTabs />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('shows content for default tab', () => {
    renderWithDirection(<TestTabs defaultValue="tab1" />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestTabs />);
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('marks active tab with data-state', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestTabs />);
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await user.click(tab2);
    expect(tab2).toHaveAttribute('data-state', 'active');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestTabs />);
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('merges custom className on TabsList', () => {
    renderWithDirection(
      <Tabs defaultValue="a">
        <TabsList className="custom-list" data-testid="list">
          <TabsTrigger value="a">A</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content</TabsContent>
      </Tabs>
    );
    expect(screen.getByTestId('list')).toHaveClass('custom-list');
  });

  it('renders in RTL context', () => {
    renderWithDirection(<TestTabs />, 'rtl');
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('ArrowLeft moves to next tab in RTL', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestTabs />, 'rtl');
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    tab1.focus();
    // In RTL, ArrowLeft moves forward (next)
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveFocus();
  });

  it('ArrowRight moves to previous tab in RTL', async () => {
    const user = userEvent.setup();
    renderWithDirection(<TestTabs defaultValue="tab2" />, 'rtl');
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    tab2.focus();
    // In RTL, ArrowRight moves backward (previous)
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveFocus();
  });

  it('inactive tab has data-state=inactive', () => {
    renderWithDirection(<TestTabs defaultValue="tab1" />);
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('data-state', 'inactive');
  });

  it('active tab has aria-selected=true', () => {
    renderWithDirection(<TestTabs defaultValue="tab1" />);
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
  });

  it('tab content is associated via aria-controls', () => {
    renderWithDirection(<TestTabs defaultValue="tab1" />);
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
    const controlsId = tab1.getAttribute('aria-controls');
    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId!)).toBeInTheDocument();
  });

  it('hides inactive tab content', () => {
    renderWithDirection(<TestTabs defaultValue="tab1" />);
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });
});
