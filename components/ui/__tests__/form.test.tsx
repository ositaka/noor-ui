import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  validators,
  composeValidators,
} from '../form';
import { Input } from '../input';

describe('Form', () => {
  it('renders without crashing', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <div>Form content</div>
      </Form>
    );
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('renders as a form element', () => {
    render(
      <Form onSubmit={vi.fn()} data-testid="form">
        <div>Content</div>
      </Form>
    );
    expect(screen.getByTestId('form').tagName).toBe('FORM');
  });

  it('calls onSubmit with form values', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form onSubmit={onSubmit} initialValues={{ name: 'John' }}>
        <button type="submit">Submit</button>
      </Form>
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalledWith({ name: 'John' });
  });

  it('prevents submission when validation fails', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: '' }}
        validators={{ email: validators.required('Email required') }}
      >
        <FormField name="email">
          {({ field, error }) => (
            <FormItem>
              <Input {...field} onChange={(e) => field.onChange(e.target.value)} />
              <FormMessage error={error} />
            </FormItem>
          )}
        </FormField>
        <button type="submit">Submit</button>
      </Form>
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Email required')).toBeInTheDocument();
  });

  it('merges custom className', () => {
    render(
      <Form onSubmit={vi.fn()} className="custom-form" data-testid="form">
        <div>Content</div>
      </Form>
    );
    expect(screen.getByTestId('form')).toHaveClass('custom-form');
  });
});

describe('FormField', () => {
  it('provides field props to children', () => {
    render(
      <Form onSubmit={vi.fn()} initialValues={{ name: 'Test' }}>
        <FormField name="name">
          {({ field }) => (
            <Input value={field.value} readOnly data-testid="input" />
          )}
        </FormField>
      </Form>
    );
    expect(screen.getByTestId('input')).toHaveValue('Test');
  });

  it('provides error state after validation', async () => {
    const user = userEvent.setup();
    render(
      <Form
        onSubmit={vi.fn()}
        initialValues={{ name: '' }}
        validators={{ name: validators.required('Name required') }}
      >
        <FormField name="name">
          {({ field, error }) => (
            <FormItem>
              <Input {...field} onChange={(e) => field.onChange(e.target.value)} />
              {error && <span data-testid="error">{error}</span>}
            </FormItem>
          )}
        </FormField>
        <button type="submit">Submit</button>
      </Form>
    );
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByTestId('error')).toHaveTextContent('Name required');
  });
});

describe('FormLabel', () => {
  it('renders with required indicator', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <FormField name="email">
          {() => (
            <FormItem>
              <FormLabel required>Email</FormLabel>
            </FormItem>
          )}
        </FormField>
      </Form>
    );
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});

describe('FormMessage', () => {
  it('renders error message', () => {
    render(<FormMessage error="Something went wrong" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders children when no error', () => {
    render(<FormMessage>Help text</FormMessage>);
    expect(screen.getByText('Help text')).toBeInTheDocument();
  });

  it('returns null when no error and no children', () => {
    const { container } = render(<FormMessage />);
    expect(container.firstChild).toBeNull();
  });
});

describe('FormDescription', () => {
  it('renders description text', () => {
    render(<FormDescription>This is a hint</FormDescription>);
    expect(screen.getByText('This is a hint')).toBeInTheDocument();
  });
});

describe('validators', () => {
  it('required returns error for empty string', () => {
    const validate = validators.required('Required');
    expect(validate('')).toBe('Required');
    expect(validate('  ')).toBe('Required');
    expect(validate(null)).toBe('Required');
  });

  it('required returns undefined for valid value', () => {
    const validate = validators.required();
    expect(validate('hello')).toBeUndefined();
  });

  it('email validates correctly', () => {
    const validate = validators.email();
    expect(validate('invalid')).toBeDefined();
    expect(validate('test@example.com')).toBeUndefined();
    expect(validate('')).toBeUndefined(); // empty is ok (use required for that)
  });

  it('minLength validates correctly', () => {
    const validate = validators.minLength(3);
    expect(validate('ab')).toBeDefined();
    expect(validate('abc')).toBeUndefined();
  });

  it('maxLength validates correctly', () => {
    const validate = validators.maxLength(5);
    expect(validate('abcdef')).toBeDefined();
    expect(validate('abc')).toBeUndefined();
  });

  it('pattern validates correctly', () => {
    const validate = validators.pattern(/^\d+$/, 'Numbers only');
    expect(validate('abc')).toBe('Numbers only');
    expect(validate('123')).toBeUndefined();
  });
});

describe('composeValidators', () => {
  it('runs validators in order and returns first error', () => {
    const composed = composeValidators(
      validators.required('Required'),
      validators.minLength(3, 'Too short')
    );
    expect(composed('')).toBe('Required');
    expect(composed('ab')).toBe('Too short');
    expect(composed('abc')).toBeUndefined();
  });
});
