'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeftRight, Moon, Sun, Code2, Copy, Check } from 'lucide-react'
import { copyToClipboard } from '@/lib/utils'

interface ComponentShowcaseProps {
  children: React.ReactNode
  className?: string
}

interface ComponentShowcaseDemoProps {
  children: React.ReactNode
  className?: string
}

interface ComponentShowcaseControlsProps {
  children?: React.ReactNode
  showDirectionToggle?: boolean
  showThemeToggle?: boolean
  onDirectionChange?: (direction: 'ltr' | 'rtl') => void
  onThemeChange?: (theme: 'light' | 'dark') => void
}

interface ComponentShowcaseComparisonProps {
  children: React.ReactNode
  ltrLabel?: string
  rtlLabel?: string
}

interface ComponentShowcaseCodeProps {
  code: string
  language?: string
  title?: string
}

function ComponentShowcase({ children, className }: ComponentShowcaseProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

function ComponentShowcaseDemo({ children, className }: ComponentShowcaseDemoProps) {
  return (
    <Card>
      <CardContent className={cn('p-6', className)}>
        <div className="flex items-center justify-center min-h-[200px]">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

function ComponentShowcaseControls({
  children,
  showDirectionToggle = true,
  showThemeToggle = true,
  onDirectionChange,
  onThemeChange,
}: ComponentShowcaseControlsProps) {
  const [direction, setDirection] = React.useState<'ltr' | 'rtl'>('ltr')
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light')

  const handleDirectionToggle = () => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr'
    setDirection(newDirection)
    onDirectionChange?.(newDirection)
  }

  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    onThemeChange?.(newTheme)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showDirectionToggle && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleDirectionToggle}
          aria-label={`Switch to ${direction === 'ltr' ? 'RTL' : 'LTR'}`}
        >
          <ArrowLeftRight className="h-4 w-4 me-2" />
          {direction === 'ltr' ? 'LTR' : 'RTL'}
        </Button>
      )}
      {showThemeToggle && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleThemeToggle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4 me-2" />
          ) : (
            <Sun className="h-4 w-4 me-2" />
          )}
          {theme === 'light' ? 'Light' : 'Dark'}
        </Button>
      )}
      {children}
    </div>
  )
}

function ComponentShowcaseComparison({
  children,
  ltrLabel = 'LTR (English)',
  rtlLabel = 'RTL (العربية)',
}: ComponentShowcaseComparisonProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{ltrLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dir="ltr" lang="en">
            {children}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">{rtlLabel}</CardTitle>
        </CardHeader>
        <CardContent>
          <div dir="rtl" lang="ar">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ComponentShowcaseCode({
  code,
  language = 'tsx',
  title,
}: ComponentShowcaseCodeProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    const success = await copyToClipboard(code)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-muted-foreground" />
          {title && <CardTitle className="text-sm font-medium">{title}</CardTitle>}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-md bg-muted p-4">
          <code className="text-sm font-mono">{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

ComponentShowcase.Demo = ComponentShowcaseDemo
ComponentShowcase.Controls = ComponentShowcaseControls
ComponentShowcase.Comparison = ComponentShowcaseComparison
ComponentShowcase.Code = ComponentShowcaseCode

export { ComponentShowcase }
