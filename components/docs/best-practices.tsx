'use client'

import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

interface BestPracticesProps {
  dos: string[]
  donts: string[]
  className?: string
}

export function BestPractices({ dos, donts, className }: BestPracticesProps) {
  const { locale } = useDirection()
  const t = content[locale]

  return (
    <div className={className}>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Do Column */}
        <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              {t.componentPage.bestPractices.do}
            </h3>
            <ul className="text-sm space-y-2">
              {dos.map((item, index) => (
                <li key={index}>✓ {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Don't Column */}
        <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-700 dark:text-red-400">
              <XCircle className="h-5 w-5" />
              {t.componentPage.bestPractices.dont}
            </h3>
            <ul className="text-sm space-y-2">
              {donts.map((item, index) => (
                <li key={index}>✗ {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
