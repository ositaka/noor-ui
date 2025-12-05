'use client'

import * as React from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Skeleton } from './skeleton'
import { Input } from './input'
import { Button } from './button'
import { Badge } from './badge'
import { Card, CardContent } from './card'

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
  /** Enable internal sorting (auto-manages sort state) */
  enableSorting?: boolean
  /** Default column to sort by */
  defaultSortBy?: string
  /** Default sort direction */
  defaultSortDirection?: SortDirection
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
  // Pagination i18n
  nextLabel?: string
  previousLabel?: string
  pageLabel?: string // e.g., "Page {current} of {total}"
  // Mobile
  mobileView?: 'table' | 'cards'
  /** Show sort buttons on mobile cards */
  mobileSorting?: boolean
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

export function DataTable<T>({
  data,
  columns,
  isLoading = false,
  sortBy: externalSortBy,
  sortDirection: externalSortDirection,
  onSort: externalOnSort,
  enableSorting = false,
  defaultSortBy,
  defaultSortDirection = 'asc',
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
  nextLabel = 'Next',
  previousLabel = 'Previous',
  pageLabel,
  mobileView = 'cards',
  mobileSorting = true,
  emptyMessage = 'No results found',
  emptyMessageAr = 'لم يتم العثور على نتائج',
  className,
  striped = false,
  hoverable = true,
  compact = false,
}: DataTableProps<T>) {
  const [internalSearchValue, setInternalSearchValue] = React.useState(searchValue)
  const [internalSortBy, setInternalSortBy] = React.useState<string | undefined>(defaultSortBy)
  const [internalSortDirection, setInternalSortDirection] = React.useState<SortDirection>(defaultSortDirection)

  // Use external sort state if provided, otherwise use internal
  const sortBy = enableSorting ? internalSortBy : externalSortBy
  const sortDirection = enableSorting ? internalSortDirection : externalSortDirection

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

  const handleSort = (columnId: string) => {
    if (enableSorting) {
      // Internal sorting logic
      if (internalSortBy === columnId) {
        // Cycle through: asc -> desc -> null -> asc
        if (internalSortDirection === 'asc') {
          setInternalSortDirection('desc')
        } else if (internalSortDirection === 'desc') {
          setInternalSortDirection(null)
          setInternalSortBy(undefined)
        }
      } else {
        setInternalSortBy(columnId)
        setInternalSortDirection('asc')
      }
    } else if (externalOnSort) {
      // External sorting callback
      externalOnSort(columnId)
    }
  }

  // Apply sorting to data
  const sortedData = React.useMemo(() => {
    if (!sortBy || !sortDirection) return data

    const column = columns.find(col => col.id === sortBy)
    if (!column) return data

    return [...data].sort((a, b) => {
      const aValue = a[column.accessorKey]
      const bValue = b[column.accessorKey]

      // Handle null/undefined
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return sortDirection === 'asc' ? comparison : -comparison
      }

      // Number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue
      }

      // Date comparison
      if (aValue instanceof Date && bValue instanceof Date) {
        return sortDirection === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }

      // Fallback to string comparison
      return sortDirection === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })
  }, [data, sortBy, sortDirection, columns])

  // Note: Pagination is controlled by parent component via currentPage/onPageChange
  // Parent should slice data appropriately before passing to DataTable
  const displayData = sortedData

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
                  className="absolute top-1/2 -translate-y-1/2 end-1 h-7 w-7"
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
                className="absolute top-1/2 -translate-y-1/2 end-1 h-7 w-7"
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
                    const isSortable = column.sortable && (enableSorting || externalOnSort)
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
                            onClick={() => handleSort(column.id)}
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
              {/* Mobile Sort Controls */}
              {mobileSorting && columns.some(col => col.sortable) && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {columns
                    .filter(col => col.sortable)
                    .map((column) => {
                      const isActive = sortBy === column.id
                      return (
                        <Button
                          key={column.id}
                          variant={isActive ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => handleSort(column.id)}
                          className="gap-1.5"
                        >
                          <span>{column.header}</span>
                          <SortIcon
                            active={isActive}
                            direction={isActive ? (sortDirection ?? null) : null}
                          />
                        </Button>
                      )
                    })}
                </div>
              )}

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
                      {columns.map((column) => {
                        const isSortable = column.sortable && (enableSorting || externalOnSort)
                        const isActive = sortBy === column.id

                        return (
                          <TableHead key={column.id} className="whitespace-nowrap">
                            {isSortable ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="-ms-2 h-8 hover:bg-muted/50"
                                onClick={() => handleSort(column.id)}
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

      {/* Pagination */}
      {!isLoading && pagination && totalPages > 1 && (
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            <span>{previousLabel}</span>
          </Button>

          <div className="text-sm text-muted-foreground">
            {pageLabel || `Page ${currentPage} of ${totalPages}`}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="gap-1"
          >
            <span>{nextLabel}</span>
            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          </Button>
        </div>
      )}
    </div>
  )
}

export default DataTable
