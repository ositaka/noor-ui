'use client'

import * as React from 'react'
import { cn } from '../../lib/utils'
import { Check } from 'lucide-react'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'

export interface Step {
  id: string
  title: string
  titleAr?: string
  description?: string
  descriptionAr?: string
  optional?: boolean
}

export interface StepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'simple' | 'circles'
  allowSkip?: boolean
  className?: string
}

export function Stepper({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  variant = 'default',
  allowSkip = false,
  className,
}: StepperProps) {
  const { locale, direction } = useDirection()
  const t = content[locale]
  const isRTL = direction === 'rtl'

  const getStepStatus = (index: number): 'complete' | 'current' | 'upcoming' => {
    if (index < currentStep) return 'complete'
    if (index === currentStep) return 'current'
    return 'upcoming'
  }

  const handleStepClick = (index: number) => {
    if (!onStepClick) return

    // Allow clicking on completed steps or current step
    if (index <= currentStep || allowSkip) {
      onStepClick(index)
    }
  }

  const isClickable = (index: number): boolean => {
    return Boolean(onStepClick) && (index <= currentStep || allowSkip)
  }

  if (orientation === 'vertical') {
    return (
      <div className={cn('space-y-4', className)}>
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const clickable = isClickable(index)

          return (
            <div key={step.id} className="flex gap-4">
              {/* Step Indicator */}
              <div className="flex flex-col items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!clickable}
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                    status === 'complete' &&
                      'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
                    status === 'current' &&
                      'border-primary bg-background text-primary shadow-sm',
                    status === 'upcoming' &&
                      'border-muted bg-background text-muted-foreground',
                    clickable && 'cursor-pointer hover:border-primary',
                    !clickable && 'cursor-not-allowed'
                  )}
                  aria-current={status === 'current' ? 'step' : undefined}
                >
                  {status === 'complete' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 flex-1 mt-2 mb-2 min-h-[2rem]',
                      index < currentStep ? 'bg-primary' : 'bg-muted'
                    )}
                  />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pb-8">
                <div
                  className={cn(
                    'font-semibold',
                    status === 'current' && 'text-foreground',
                    status === 'complete' && 'text-foreground',
                    status === 'upcoming' && 'text-muted-foreground'
                  )}
                >
                  {isRTL && step.titleAr ? step.titleAr : step.title}
                  {step.optional && (
                    <span className="ms-2 text-xs font-normal text-muted-foreground">
                      ({t.ui.components.optional})
                    </span>
                  )}
                </div>
                {(step.description || step.descriptionAr) && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {isRTL && step.descriptionAr ? step.descriptionAr : step.description}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Horizontal orientation
  if (variant === 'simple') {
    return (
      <div className={cn('flex items-center justify-between', className)}>
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const clickable = isClickable(index)

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => handleStepClick(index)}
                disabled={!clickable}
                className={cn(
                  'flex items-center gap-2 text-sm font-medium transition-colors',
                  status === 'current' && 'text-foreground',
                  status === 'complete' && 'text-primary',
                  status === 'upcoming' && 'text-muted-foreground',
                  clickable && 'hover:text-foreground cursor-pointer',
                  !clickable && 'cursor-not-allowed'
                )}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <span
                  className={cn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs',
                    status === 'complete' && 'bg-primary text-primary-foreground',
                    status === 'current' && 'bg-primary/20 text-primary',
                    status === 'upcoming' && 'bg-muted text-muted-foreground'
                  )}
                >
                  {status === 'complete' ? <Check className="h-3 w-3" /> : index + 1}
                </span>
                <span className="hidden sm:inline">
                  {isRTL && step.titleAr ? step.titleAr : step.title}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-2',
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  if (variant === 'circles') {
    return (
      <div className={cn('flex items-center justify-between', className)}>
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const clickable = isClickable(index)

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => handleStepClick(index)}
                  disabled={!clickable}
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                    status === 'complete' &&
                      'border-primary bg-primary text-primary-foreground hover:bg-primary/90',
                    status === 'current' &&
                      'border-primary bg-background text-primary shadow-md scale-110',
                    status === 'upcoming' &&
                      'border-muted bg-background text-muted-foreground',
                    clickable && 'cursor-pointer hover:border-primary',
                    !clickable && 'cursor-not-allowed'
                  )}
                  aria-current={status === 'current' ? 'step' : undefined}
                >
                  {status === 'complete' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <div className="text-center">
                  <div
                    className={cn(
                      'text-xs font-medium',
                      status === 'current' && 'text-foreground',
                      status === 'complete' && 'text-foreground',
                      status === 'upcoming' && 'text-muted-foreground'
                    )}
                  >
                    {isRTL && step.titleAr ? step.titleAr : step.title}
                  </div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-4',
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </React.Fragment>
          )
        })}
      </div>
    )
  }

  // Default variant
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const clickable = isClickable(index)

          return (
            <li
              key={step.id}
              className={cn(
                'flex items-center',
                index < steps.length - 1 && 'flex-1'
              )}
            >
              <button
                onClick={() => handleStepClick(index)}
                disabled={!clickable}
                className={cn(
                  'group flex flex-col items-center',
                  clickable && 'cursor-pointer',
                  !clickable && 'cursor-not-allowed'
                )}
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all',
                    status === 'complete' &&
                      'border-primary bg-primary text-primary-foreground group-hover:bg-primary/90',
                    status === 'current' &&
                      'border-primary bg-background text-primary shadow-sm',
                    status === 'upcoming' &&
                      'border-muted bg-background text-muted-foreground',
                    clickable && 'group-hover:border-primary'
                  )}
                >
                  {status === 'complete' ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </span>
                <span
                  className={cn(
                    'mt-2 text-xs font-medium text-center max-w-[6rem]',
                    status === 'current' && 'text-foreground',
                    status === 'complete' && 'text-foreground',
                    status === 'upcoming' && 'text-muted-foreground'
                  )}
                >
                  {isRTL && step.titleAr ? step.titleAr : step.title}
                  {step.optional && (
                    <span className="block text-[10px] text-muted-foreground">
                      ({t.ui.components.optional})
                    </span>
                  )}
                </span>
              </button>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'h-0.5 flex-1 mx-4',
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
