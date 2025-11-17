'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

export interface PropDefinition {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

interface PropsTableProps {
  props: PropDefinition[]
  className?: string
}

export function PropsTable({ props, className }: PropsTableProps) {
  const { locale } = useDirection()
  const t = content[locale]
  const [search, setSearch] = React.useState('')

  const filteredProps = React.useMemo(() => {
    if (!search) return props

    const searchLower = search.toLowerCase()
    return props.filter(
      (prop) =>
        prop.name.toLowerCase().includes(searchLower) ||
        prop.description.toLowerCase().includes(searchLower) ||
        prop.type.toLowerCase().includes(searchLower)
    )
  }, [props, search])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search */}
      <div className="relative">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={t.componentPage.propsTable.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ps-10"
          aria-label={t.componentPage.propsTable.searchPlaceholder}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-4 py-3 text-start font-medium">{t.componentPage.propsTable.name}</th>
              <th className="px-4 py-3 text-start font-medium">{t.componentPage.propsTable.type}</th>
              <th className="px-4 py-3 text-start font-medium">{t.componentPage.propsTable.default}</th>
              <th className="px-4 py-3 text-start font-medium">{t.componentPage.propsTable.description}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProps.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  {t.componentPage.propsTable.noPropsFound} &ldquo;{search}&rdquo;
                </td>
              </tr>
            ) : (
              filteredProps.map((prop) => (
                <tr
                  key={prop.name}
                  className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {prop.name}
                      </code>
                      {prop.required && (
                        <Badge
                          variant="destructive"
                          className="text-[10px] px-1.5 py-0"
                        >
                          {t.ui.form.required}
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    {prop.default ? (
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {prop.description}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
