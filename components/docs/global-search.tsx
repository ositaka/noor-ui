'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search, FileText, Component, Palette, Sparkles, Layers } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { getSearchData, type SearchItem } from '@/lib/search-data-i18n'
import { useDirection } from '@/components/providers/direction-provider'
import { content } from '@/lib/i18n'

const categoryIcons = {
  Component: Component,
  Documentation: FileText,
  Token: Palette,
  Theme: Sparkles,
  Example: Layers,
}

export function GlobalSearch() {
  const router = useRouter()
  const { locale } = useDirection()
  const t = content[locale]
  const [open, setOpen] = React.useState(false)

  // Translate category names
  const translateCategory = (category: string) => {
    const categoryMap: Record<string, keyof typeof t.search.categories> = {
      'Component': 'component',
      'Documentation': 'documentation',
      'Token': 'token',
      'Theme': 'theme',
      'Example': 'example',
    }
    const key = categoryMap[category]
    return key ? t.search.categories[key] : category
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((callback: () => void) => {
    setOpen(false)
    callback()
  }, [])

  // Get locale-aware search data and group items by category
  const groupedItems = React.useMemo(() => {
    const searchData = getSearchData(locale)
    const groups: Record<string, SearchItem[]> = {}
    searchData.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [locale])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">{t.ui.form.search}...</span>
        <kbd className="pointer-events-none ms-auto hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 rtl:flex-row-reverse">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t.ui.form.searchPlaceholder} />
        <CommandList>
          <CommandEmpty>{t.ui.form.noResults}</CommandEmpty>

          {Object.entries(groupedItems).map(([category, items], index) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]

            return (
              <React.Fragment key={category}>
                {index > 0 && <CommandSeparator />}
                <CommandGroup heading={translateCategory(category)}>
                  {items.map((item) => (
                    <CommandItem
                      key={item.href}
                      value={`${item.title} ${item.description} ${item.keywords?.join(' ')}`}
                      onSelect={() => {
                        runCommand(() => router.push(item.href))
                      }}
                    >
                      <Icon className="me-2 h-4 w-4" />
                      <div className="flex flex-col">
                        <span>{item.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {item.description}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </React.Fragment>
            )
          })}
        </CommandList>
      </CommandDialog>
    </>
  )
}
