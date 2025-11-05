'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Search, FileText, Component, Palette, Sparkles } from 'lucide-react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { searchData, type SearchItem } from '@/lib/search-data'

const categoryIcons = {
  Component: Component,
  Documentation: FileText,
  Token: Palette,
  Theme: Sparkles,
}

export function GlobalSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)

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

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    searchData.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">Search...</span>
        <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search documentation, components, and more..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {Object.entries(groupedItems).map(([category, items], index) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]

            return (
              <React.Fragment key={category}>
                {index > 0 && <CommandSeparator />}
                <CommandGroup heading={category}>
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
