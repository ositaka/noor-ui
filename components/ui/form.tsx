'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

// Form Context
interface FormContextValue {
  errors: Record<string, string>
  touched: Record<string, boolean>
  values: Record<string, any>
  setFieldValue: (field: string, value: any) => void
  setFieldError: (field: string, error: string) => void
  setFieldTouched: (field: string, touched: boolean) => void
  validateField: (field: string) => boolean
  isSubmitting: boolean
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined)

export function useFormContext() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error('Form components must be used within a Form component')
  }
  return context
}

// Form Root Component
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  initialValues?: Record<string, any>
  validators?: Record<string, (value: any) => string | undefined>
  onSubmit: (values: Record<string, any>) => void | Promise<void>
}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, children, initialValues = {}, validators = {}, onSubmit, ...props }, ref) => {
    const [values, setValues] = React.useState(initialValues)
    const [errors, setErrors] = React.useState<Record<string, string>>({})
    const [touched, setTouched] = React.useState<Record<string, boolean>>({})
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const setFieldValue = React.useCallback((field: string, value: any) => {
      setValues((prev) => ({ ...prev, [field]: value }))
    }, [])

    const setFieldError = React.useCallback((field: string, error: string) => {
      setErrors((prev) => ({ ...prev, [field]: error }))
    }, [])

    const setFieldTouched = React.useCallback((field: string, touched: boolean) => {
      setTouched((prev) => ({ ...prev, [field]: touched }))
    }, [])

    const validateField = React.useCallback(
      (field: string): boolean => {
        const validator = validators[field]
        if (!validator) return true

        const error = validator(values[field])
        if (error) {
          setFieldError(field, error)
          return false
        } else {
          setErrors((prev) => {
            const next = { ...prev }
            delete next[field]
            return next
          })
          return true
        }
      },
      [validators, values, setFieldError]
    )

    const validateAllFields = React.useCallback((): boolean => {
      const fields = Object.keys(validators)
      const results = fields.map((field) => validateField(field))
      return results.every((result) => result)
    }, [validators, validateField])

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      // Mark all fields as touched
      const allTouched = Object.keys(validators).reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {}
      )
      setTouched(allTouched)

      // Validate all fields
      const isValid = validateAllFields()

      if (!isValid) {
        return
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (error) {
        // Error should be handled by the parent component
        if (process.env.NODE_ENV === 'development') {
          console.error('Form submission error:', error)
        }
      } finally {
        setIsSubmitting(false)
      }
    }

    const contextValue: FormContextValue = {
      errors,
      touched,
      values,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      validateField,
      isSubmitting,
    }

    return (
      <FormContext.Provider value={contextValue}>
        <form ref={ref} onSubmit={handleSubmit} className={cn('space-y-6', className)} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    )
  }
)

Form.displayName = 'Form'

// FormField Component
export interface FormFieldProps {
  name: string
  children: (props: {
    field: {
      name: string
      value: any
      onChange: (value: any) => void
      onBlur: () => void
    }
    error?: string
    touched: boolean
  }) => React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({ name, children }) => {
  const { values, errors, touched, setFieldValue, setFieldTouched, validateField } =
    useFormContext()

  const handleChange = (value: any) => {
    setFieldValue(name, value)
  }

  const handleBlur = () => {
    setFieldTouched(name, true)
    validateField(name)
  }

  return (
    <>
      {children({
        field: {
          name,
          value: values[name] || '',
          onChange: handleChange,
          onBlur: handleBlur,
        },
        error: errors[name],
        touched: touched[name],
      })}
    </>
  )
}

// FormItem Component
export const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn('space-y-2', className)} {...props} />
  }
)
FormItem.displayName = 'FormItem'

// FormLabel Component
export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & {
    required?: boolean
  }
>(({ className, children, required, ...props }, ref) => {
  return (
    <Label ref={ref} className={cn(className)} {...props}>
      {children}
      {required && <span className="text-destructive ms-1">*</span>}
    </Label>
  )
})
FormLabel.displayName = 'FormLabel'

// FormMessage Component
export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    error?: string
  }
>(({ className, error, children, ...props }, ref) => {
  if (!error && !children) return null

  return (
    <p
      ref={ref}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {error || children}
    </p>
  )
})
FormMessage.displayName = 'FormMessage'

// FormDescription Component
export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'

// Common validators
export const validators = {
  required: (message = 'This field is required') => (value: any) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return message
    }
    return undefined
  },
  email: (message = 'Please enter a valid email address') => (value: string) => {
    if (!value) return undefined
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return message
    }
    return undefined
  },
  minLength:
    (length: number, message?: string) =>
    (value: string) => {
      if (!value) return undefined
      if (value.length < length) {
        return message || `Must be at least ${length} characters`
      }
      return undefined
    },
  maxLength:
    (length: number, message?: string) =>
    (value: string) => {
      if (!value) return undefined
      if (value.length > length) {
        return message || `Must be no more than ${length} characters`
      }
      return undefined
    },
  pattern:
    (regex: RegExp, message: string) =>
    (value: string) => {
      if (!value) return undefined
      if (!regex.test(value)) {
        return message
      }
      return undefined
    },
  matchField:
    (fieldName: string, message = 'Fields do not match') =>
    (value: string, values: Record<string, any>) => {
      if (value !== values[fieldName]) {
        return message
      }
      return undefined
    },
}

// Compose multiple validators
export function composeValidators(...validators: Array<(value: any) => string | undefined>) {
  return (value: any) => {
    for (const validator of validators) {
      const error = validator(value)
      if (error) return error
    }
    return undefined
  }
}
