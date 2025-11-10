'use client'

import * as React from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

export type SortDirection = 'asc' | 'desc' | null

export interface ColumnDef<T> {
  id: string
  header: string
  headerAr?: string
  accessorKey: keyof T
  cell?: (row: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  align?: 'start' | 'center' | 'end'
  width?: string
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  isLoading?: boolean
  // Sorting
  sortBy?: string
  sortDirection?: SortDirection
  onSort?: (columnId: string) => void
  // Filtering
  searchable?: boolean
  searchPlaceholder?: string
  searchPlaceholderAr?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filterBy?: (keyof T)[]
  // Pagination
  pagination?: boolean
  currentPage?: number
  totalPages?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  // Mobile
  mobileView?: 'table' | 'cards'
  // Empty state
  emptyMessage?: string
  emptyMessageAr?: string
  // Styling
  className?: string
  striped?: boolean
  hoverable?: boolean
  compact?: boolean
}

function DataTableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

function SortIcon({
  active,
  direction
}: {
  active: boolean
  direction: SortDirection
}) {
  if (!active) {
    return <ChevronsUpDown className="h-4 w-4 opacity-50" />
  }

  if (direction === 'asc') {
    return <ChevronUp className="h-4 w-4" />
  }

  if (direction === 'desc') {
    return <ChevronDown className="h-4 w-4" />
  }

  return <ChevronsUpDown className="h-4 w-4 opacity-50" />
}

function DataTableComponent<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  sortBy,
  sortDirection,
  onSort,
  searchable = false,
  searchPlaceholder = 'Search...',
  searchPlaceholderAr = 'بحث...',
  searchValue = '',
  onSearchChange,
  pagination = false,
  currentPage = 1,
  totalPages = 1,
  pageSize = 10,
  onPageChange,
  mobileView = 'cards',
  emptyMessage = 'No results found',
  emptyMessageAr = 'لم يتم العثور على نتائج',
  className,
  striped = false,
  hoverable = true,
  compact = false,
}: DataTableProps<T>) {
  const [internalSearchValue, setInternalSearchValue] = React.useState(searchValue)

  React.useEffect(() => {
    setInternalSearchValue(searchValue)
  }, [searchValue])

  const handleSearchChange = (value: string) => {
    setInternalSearchValue(value)
    onSearchChange?.(value)
  }

  const handleClearSearch = () => {
    setInternalSearchValue('')
    onSearchChange?.('')
  }

  const displayData = data.slice(0, pagination ? pageSize : data.length)

  // Empty state
  if (!isLoading && data.length === 0) {
    return (
      <div className="w-full">
        {searchable && (
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 -translate-y-1/2 ms-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={internalSearchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="ps-9 pe-9"
              />
              {internalSearchValue && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 -translate-y-1/2 me-1 h-7 w-7"
                  onClick={handleClearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mx-auto max-w-sm space-y-3">
              <div className="flex justify-center">
                <Search className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">
                {emptyMessage}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Search */}
      {searchable && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 -translate-y-1/2 ms-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={internalSearchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="ps-9 pe-9"
              disabled={isLoading}
            />
            {internalSearchValue && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 -translate-y-1/2 me-1 h-7 w-7"
                onClick={handleClearSearch}
                disabled={isLoading}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && <DataTableSkeleton rows={5} columns={columns.length} />}

      {/* Desktop Table View */}
      {!isLoading && (
        <>
          <div className="hidden md:block rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => {
                    const isSortable = column.sortable && onSort
                    const isActive = sortBy === column.id
                    const align = column.align || 'start'

                    return (
                      <TableHead
                        key={column.id}
                        className={cn(
                          compact ? 'h-10 py-2' : 'h-12',
                          column.width && `w-[${column.width}]`,
                          `text-${align}`
                        )}
                      >
                        {isSortable ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ms-3 h-8 hover:bg-muted/50"
                            onClick={() => onSort(column.id)}
                          >
                            <span>{column.header}</span>
                            <SortIcon
                              active={isActive}
                              direction={isActive ? (sortDirection ?? null) : null}
                            />
                          </Button>
                        ) : (
                          column.header
                        )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((row, rowIndex) => (
                  <TableRow
                    key={rowIndex}
                    className={cn(
                      hoverable && 'hover:bg-muted/50',
                      striped && rowIndex % 2 === 0 && 'bg-muted/20'
                    )}
                  >
                    {columns.map((column) => {
                      const align = column.align || 'start'
                      const cellContent = column.cell
                        ? column.cell(row)
                        : String(row[column.accessorKey] ?? '')

                      return (
                        <TableCell
                          key={column.id}
                          className={cn(
                            compact ? 'py-2' : 'p-4',
                            `text-${align}`
                          )}
                        >
                          {cellContent}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards View */}
          {mobileView === 'cards' && (
            <div className="block md:hidden space-y-4">
              {displayData.map((row, rowIndex) => (
                <Card key={rowIndex}>
                  <CardContent className="p-4 space-y-3">
                    {columns.map((column) => {
                      const cellContent = column.cell
                        ? column.cell(row)
                        : String(row[column.accessorKey] ?? '')

                      return (
                        <div key={column.id} className="grid grid-cols-3 gap-2">
                          <div className="font-medium text-muted-foreground text-sm">
                            {column.header}
                          </div>
                          <div className="col-span-2 text-sm">
                            {cellContent}
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Mobile Table View (Horizontal Scroll) */}
          {mobileView === 'table' && (
            <div className="block md:hidden">
              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column.id} className="whitespace-nowrap">
                          {column.header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayData.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {columns.map((column) => {
                          const cellContent = column.cell
                            ? column.cell(row)
                            : String(row[column.accessorKey] ?? '')

                          return (
                            <TableCell key={column.id} className="whitespace-nowrap">
                              {cellContent}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Pagination Info */}
      {!isLoading && pagination && totalPages > 1 && (
        <div className="flex items-center justify-center">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </div>
  )
}

// Memoize DataTable to prevent unnecessary re-renders when props don't change
// This is critical for performance since DataTable does expensive .map() operations
export const DataTable = React.memo(DataTableComponent) as typeof DataTableComponent

export default DataTable
