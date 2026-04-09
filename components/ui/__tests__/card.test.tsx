import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card';

describe('Card', () => {
  it('renders without crashing', () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<Card data-testid="card" className="custom-class">Content</Card>);
    expect(screen.getByTestId('card')).toHaveClass('custom-class');
  });

  it('forwards ref', () => {
    const ref = vi.fn();
    render(<Card ref={ref}>Content</Card>);
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement));
  });

  it('renders in RTL context', () => {
    render(
      <div dir="rtl">
        <Card data-testid="card">محتوى</Card>
      </div>
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByText('محتوى')).toBeInTheDocument();
  });
});

describe('CardHeader', () => {
  it('renders without crashing', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<CardHeader data-testid="header" className="custom">Header</CardHeader>);
    expect(screen.getByTestId('header')).toHaveClass('custom');
  });
});

describe('CardTitle', () => {
  it('renders as h3', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title');
  });

  it('merges custom className', () => {
    render(<CardTitle className="custom">Title</CardTitle>);
    expect(screen.getByRole('heading')).toHaveClass('custom');
  });
});

describe('CardDescription', () => {
  it('renders description text', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<CardDescription data-testid="desc" className="custom">Desc</CardDescription>);
    expect(screen.getByTestId('desc')).toHaveClass('custom');
  });
});

describe('CardContent', () => {
  it('renders without crashing', () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<CardContent data-testid="content" className="custom">Content</CardContent>);
    expect(screen.getByTestId('content')).toHaveClass('custom');
  });
});

describe('CardFooter', () => {
  it('renders without crashing', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(<CardFooter data-testid="footer" className="custom">Footer</CardFooter>);
    expect(screen.getByTestId('footer')).toHaveClass('custom');
  });
});

describe('Card composition', () => {
  it('renders full card with all sub-components', () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Body</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );
    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Body')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('renders full card in RTL', () => {
    render(
      <div dir="rtl">
        <Card data-testid="card">
          <CardHeader>
            <CardTitle>عنوان البطاقة</CardTitle>
            <CardDescription>وصف البطاقة</CardDescription>
          </CardHeader>
          <CardContent>محتوى البطاقة</CardContent>
          <CardFooter>تذييل البطاقة</CardFooter>
        </Card>
      </div>
    );
    expect(screen.getByRole('heading', { name: 'عنوان البطاقة' })).toBeInTheDocument();
    expect(screen.getByText('وصف البطاقة')).toBeInTheDocument();
    expect(screen.getByText('محتوى البطاقة')).toBeInTheDocument();
    expect(screen.getByText('تذييل البطاقة')).toBeInTheDocument();
  });
});
