import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from './card'
import { cn } from '../../lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  href?: string
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  className,
}: FeatureCardProps) {
  const content = (
    <Card className={cn('h-full transition-colors', href && 'hover:border-primary cursor-pointer', className)}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-primary/10 p-3 shrink-0">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    )
  }

  return content
}

FeatureCard.displayName = 'FeatureCard'
