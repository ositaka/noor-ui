'use client'

import * as React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { cva, type VariantProps } from 'class-variance-authority'
import { useDirection } from '@/components/providers/direction-provider'
import { cn } from '@/lib/utils'

// Register Chart.js components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
)

// ---------------------------------------------------------------------------
// CSS variable resolver — Chart.js uses canvas so needs real color values
// ---------------------------------------------------------------------------

function useCSSColor(varName: string, fallback: string) {
  const [color, setColor] = React.useState(fallback)

  React.useEffect(() => {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim()
    if (value) setColor(value)
  }, [varName])

  return color
}

function useResolvedColors(cssColors: string[]): string[] {
  const key = cssColors.join(',')
  const [resolved, setResolved] = React.useState<string[]>(cssColors)

  React.useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    setResolved(
      cssColors.map((c) => {
        if (c.startsWith('var(')) {
          const varName = c.slice(4, -1).trim()
          return style.getPropertyValue(varName).trim() || '#6366f1'
        }
        return c
      }),
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return resolved
}

/** Add alpha to an hsl() or hex color string */
function withAlpha(color: string, alpha: number): string {
  if (color.startsWith('hsl(') && !color.includes('/')) {
    return color.replace(')', ` / ${alpha})`)
  }
  if (color.startsWith('#')) {
    const hex =
      color.length === 4
        ? color[1] + color[1] + color[2] + color[2] + color[3] + color[3]
        : color.slice(1, 7)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }
  if (color.startsWith('rgb(')) {
    return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`)
  }
  return color
}

// ---------------------------------------------------------------------------
// CVA variants
// ---------------------------------------------------------------------------

const chartVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'h-[180px]',
      md: 'h-[260px]',
      lg: 'h-[360px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// Donut charts need square dimensions (no w-full) so they sit side-by-side in flex containers
const donutSizeMap = {
  sm: 'h-[180px] w-[180px]',
  md: 'h-[260px] w-[260px]',
  lg: 'h-[360px] w-[360px]',
} as const

// ---------------------------------------------------------------------------
// Accessible data table — visually hidden, available to screen readers
// ---------------------------------------------------------------------------

function ChartDataTable({
  data,
  categoryKey,
  valueKeys,
  numberFormatter,
}: {
  data: ChartDataItem[]
  categoryKey: string
  valueKeys: string[]
  numberFormatter: Intl.NumberFormat
}) {
  return (
    <table className="sr-only">
      <thead>
        <tr>
          <th scope="col">{categoryKey}</th>
          {valueKeys.map((key) => (
            <th key={key} scope="col">{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <th scope="row">{String(item[categoryKey])}</th>
            {valueKeys.map((key) => (
              <td key={key}>{numberFormatter.format(Number(item[key]))}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function DonutDataSummary({
  value,
  innerLabel,
  innerSubLabel,
  numberFormatter,
}: {
  value: number
  innerLabel?: string
  innerSubLabel?: string
  numberFormatter: Intl.NumberFormat
}) {
  return (
    <div className="sr-only">
      {innerLabel
        ? <span>{innerLabel}</span>
        : <span>{numberFormatter.format(value)}%</span>
      }
      {innerSubLabel && <span> — {innerSubLabel}</span>}
    </div>
  )
}

function MultiDonutDataSummary({
  data,
  categoryKey,
  valueKey,
  numberFormatter,
}: {
  data: ChartDataItem[]
  categoryKey: string
  valueKey: string
  numberFormatter: Intl.NumberFormat
}) {
  return (
    <table className="sr-only">
      <thead>
        <tr>
          <th scope="col">{categoryKey}</th>
          <th scope="col">{valueKey}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <th scope="row">{String(item[categoryKey])}</th>
            <td>{numberFormatter.format(Number(item[valueKey]))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

interface ChartDataItem {
  [key: string]: string | number
}

interface ChartBaseProps extends VariantProps<typeof chartVariants> {
  /** Data array — each item needs at least a category key and a value key */
  data: ChartDataItem[]
  /** The key in each data item used for X axis / category labels */
  categoryKey?: string
  /** The key(s) in each data item used for values. String for single series, array for multi-series */
  valueKey?: string | string[]
  /** Custom colors for series — CSS color strings or CSS var references */
  colors?: string[]
  /** Locale for number formatting on axes */
  locale?: 'en' | 'ar'
  /** Override text direction (defaults to direction provider) */
  direction?: 'ltr' | 'rtl'
  /** Show grid lines */
  showGrid?: boolean
  /** Show X axis */
  showXAxis?: boolean
  /** Show Y axis */
  showYAxis?: boolean
  /** Format Y axis tick values */
  yAxisFormatter?: (value: number) => string
  /** Format X axis tick values */
  xAxisFormatter?: (value: string) => string
  /** Stroke width for lines (line/area charts) and bar border */
  strokeWidth?: number
  /** Font size for axis labels in pixels */
  fontSize?: number
  /** Accessible label describing the chart content */
  'aria-label'?: string
  /** Additional class name */
  className?: string
}

interface LineBarAreaChartProps extends ChartBaseProps {
  type: 'line' | 'bar' | 'area'
}

interface DonutChartProps extends ChartBaseProps {
  type: 'donut'
  /** Value to display (0-100 for percentage) */
  value?: number
  /** Inner label — displayed in center of donut */
  innerLabel?: string
  /** Inner sub-label — smaller text below label */
  innerSubLabel?: string
  /** Arc thickness */
  thickness?: 'thin' | 'default' | 'thick'
}

export type ChartProps = LineBarAreaChartProps | DonutChartProps

// ---------------------------------------------------------------------------
// Default semantic colors
// ---------------------------------------------------------------------------

const DEFAULT_COLORS = [
  'var(--color-primary)',
  'var(--color-secondary)',
  'var(--color-success)',
  'var(--color-warning)',
  'var(--color-info)',
  'var(--color-destructive)',
]

// Dash patterns for multi-series differentiation (a11y: not color-only)
const DASH_PATTERNS: number[][] = [[], [8, 4], [4, 4], [2, 4]]

// ---------------------------------------------------------------------------
// Chart component
// ---------------------------------------------------------------------------

export function Chart(props: ChartProps) {
  const {
    type,
    data,
    categoryKey = 'name',
    valueKey = 'value',
    colors = DEFAULT_COLORS,
    locale,
    direction: directionProp,
    showGrid = true,
    showXAxis = true,
    showYAxis = true,
    yAxisFormatter,
    xAxisFormatter,
    strokeWidth = 2.5,
    fontSize = 14,
    'aria-label': ariaLabel,
    size,
    className,
  } = props

  const { direction: providerDir, locale: dirLocale } = useDirection()
  const isRTL = (directionProp ?? providerDir) === 'rtl'
  const effectiveLocale = locale ?? dirLocale
  const fallbackLabel = `${type} chart`

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const isDarkMode =
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')

  const resolvedColors = useResolvedColors(colors)
  const mutedColor = useCSSColor('--color-muted', '#f5f5f5')
  const borderColor = useCSSColor('--color-border', '#e5e5e5')
  const mutedFgColor = useCSSColor('--color-muted-foreground', '#737373')
  const popoverBg = useCSSColor('--color-popover', '#ffffff')
  const popoverFg = useCSSColor('--color-popover-foreground', '#0a0a0a')

  const valueKeys = Array.isArray(valueKey) ? valueKey : [valueKey]

  const numberFormatter = React.useMemo(() => {
    return new Intl.NumberFormat(
      effectiveLocale === 'ar' ? 'ar-SA' : 'en-US',
      effectiveLocale === 'ar' ? { numberingSystem: 'arab' } : undefined,
    )
  }, [effectiveLocale])

  // External HTML tooltip for proper RTL support (must be before early returns)
  const externalTooltip = React.useCallback(
    (context: { chart: { canvas: HTMLCanvasElement }; tooltip: Record<string, unknown> }) => {
      const { chart, tooltip } = context
      const parent = chart.canvas.parentNode as HTMLElement
      if (!parent) return

      let el = parent.querySelector<HTMLDivElement>('[data-chart-tooltip]')
      if (!el) {
        el = document.createElement('div')
        el.setAttribute('data-chart-tooltip', '')
        el.style.cssText =
          'position:absolute;pointer-events:none;transition:opacity .15s ease;z-index:50;'
        parent.style.position = 'relative'
        parent.appendChild(el)
      }

      const tp = tooltip as Record<string, unknown>

      if (tp.opacity === 0) {
        el.style.opacity = '0'
        return
      }

      const title = (tp.title as string[])?.[0] ?? ''
      const bodyItems = tp.body as { lines: string[] }[] | undefined
      const labelColors = tp.labelColors as { backgroundColor: string }[] | undefined
      const dataPoints = tp.dataPoints as { dataset: { label?: string }; parsed: number | { y: number }; chart: { data: { datasets: unknown[] } } }[] | undefined
      const multiSeries = (dataPoints?.length ?? 0) > 1

      let rows = ''
      dataPoints?.forEach((dp, i) => {
        const color = labelColors?.[i]?.backgroundColor ?? '#6366f1'
        const rawValue = typeof dp.parsed === 'number' ? dp.parsed : dp.parsed.y
        const value = numberFormatter.format(rawValue)
        const label = multiSeries ? dp.dataset.label ?? '' : ''
        const dot = `<span style="width:8px;height:8px;border-radius:50%;background:${color};flex-shrink:0;"></span>`
        const text = label ? `${label}\u2003${value}` : value
        rows += `<div style="display:flex;align-items:center;gap:6px;">${dot}<span>${text}</span></div>`
      })

      el.innerHTML = `<div style="
        background:${popoverBg};color:${popoverFg};
        border:1px solid ${borderColor};border-radius:8px;
        padding:8px 12px;font-size:13px;line-height:1.5;
        direction:${isRTL ? 'rtl' : 'ltr'};text-align:${isRTL ? 'right' : 'left'};
        box-shadow:0 4px 12px rgba(0,0,0,.15);white-space:nowrap;
      ">
        ${title ? `<div style="font-weight:600;margin-bottom:4px;">${title}</div>` : ''}
        ${rows}
      </div>`

      const x = tp.caretX as number
      const y = tp.caretY as number
      el.style.opacity = '1'
      el.style.left = x + 'px'
      el.style.top = y + 'px'
      el.style.transform = 'translate(-50%, calc(-100% - 8px))'
    },
    [isRTL, popoverBg, popoverFg, borderColor, numberFormatter],
  )

  // -------------------------------------------------------------------------
  // Donut chart
  // -------------------------------------------------------------------------

  if (type === 'donut') {
    const donutProps = props as DonutChartProps
    const thickness = donutProps.thickness ?? 'default'
    const cutoutMap = { thin: '88%', default: '82%', thick: '72%' }
    const donutSize = donutSizeMap[size ?? 'md']
    const isMultiSegment = data.length > 1 && donutProps.value == null

    // -----------------------------------------------------------------------
    // Multi-segment donut (e.g., spending breakdown by category)
    // -----------------------------------------------------------------------
    if (isMultiSegment) {
      const chartData = {
        labels: data.map((d) => String(d[categoryKey])),
        datasets: [
          {
            data: data.map((d) => Number(d[valueKeys[0]])),
            backgroundColor: resolvedColors.slice(0, data.length),
            borderWidth: 2,
            borderColor: isDarkMode ? 'hsl(0 0% 10%)' : 'hsl(0 0% 100%)',
            borderRadius: 4,
          },
        ],
      }

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: cutoutMap[thickness],
        animation: { duration: 0 },
        plugins: {
          tooltip: {
            enabled: false,
            external: externalTooltip,
          },
          legend: { display: false },
        },
      }

      return (
        <>
          <figure
            role="img"
            className={cn(donutSize, 'relative', className)}
            aria-label={ariaLabel ?? fallbackLabel}
          >
            <div aria-hidden="true" className={cn('h-full', isRTL && '[&_canvas]:-scale-x-100')}>
              <Doughnut data={chartData} options={options as never} />
            </div>
            {(donutProps.innerLabel || donutProps.innerSubLabel) && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-[25%]"
                aria-hidden="true"
              >
                {donutProps.innerLabel && (
                  <div className="text-xl font-bold text-foreground text-center truncate max-w-full">
                    {donutProps.innerLabel}
                  </div>
                )}
                {donutProps.innerSubLabel && (
                  <div className="text-[10px] leading-tight text-muted-foreground text-center max-w-full line-clamp-2">
                    {donutProps.innerSubLabel}
                  </div>
                )}
              </div>
            )}
          </figure>
          <MultiDonutDataSummary
            data={data}
            categoryKey={categoryKey}
            valueKey={valueKeys[0]}
            numberFormatter={numberFormatter}
          />
        </>
      )
    }

    // -----------------------------------------------------------------------
    // Single-value donut (percentage ring with track)
    // -----------------------------------------------------------------------
    const displayValue =
      donutProps.value ?? (data[0]?.[valueKeys[0]] as number) ?? 0
    const cappedValue = Math.min(displayValue, 100)

    const trackColor = withAlpha(mutedFgColor, isDarkMode ? 0.15 : 0.1)

    const chartData = {
      datasets: [
        {
          data: [cappedValue, 100 - cappedValue],
          backgroundColor: [resolvedColors[0] ?? '#6366f1', 'transparent'],
          borderWidth: 0,
          borderRadius: 10,
        },
      ],
    }

    // Plugin: draw track ring behind the value arc
    const trackPlugin = {
      id: 'donutTrack',
      beforeDraw(chart: { ctx: CanvasRenderingContext2D; getDatasetMeta: (i: number) => { data: { x: number; y: number; innerRadius: number; outerRadius: number }[] } }) {
        const { ctx } = chart
        const arc = chart.getDatasetMeta(0).data[0]
        if (!arc) return
        const { x, y, innerRadius, outerRadius } = arc
        ctx.save()
        ctx.beginPath()
        ctx.arc(x, y, (innerRadius + outerRadius) / 2, 0, Math.PI * 2)
        ctx.lineWidth = outerRadius - innerRadius
        ctx.strokeStyle = trackColor
        ctx.stroke()
        ctx.restore()
      },
    }

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: cutoutMap[thickness],
      rotation: -90,
      animation: { duration: 0 },
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false },
      },
    }

    return (
      <>
        <figure
          role="img"
          className={cn(donutSize, 'relative', className)}
          aria-label={ariaLabel ?? fallbackLabel}
        >
          <div aria-hidden="true" className={cn('h-full', isRTL && '[&_canvas]:-scale-x-100')}>
            <Doughnut data={chartData} options={options} plugins={[trackPlugin as never]} />
          </div>
          {(donutProps.innerLabel || donutProps.innerSubLabel) && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-[25%]"
              aria-hidden="true"
            >
              {donutProps.innerLabel && (
                <div className="text-3xl font-bold text-foreground text-center truncate max-w-full">
                  {donutProps.innerLabel}
                </div>
              )}
              {donutProps.innerSubLabel && (
                <div className="text-xs text-muted-foreground text-center max-w-full line-clamp-2">
                  {donutProps.innerSubLabel}
                </div>
              )}
            </div>
          )}
        </figure>
        <DonutDataSummary
          value={cappedValue}
          innerLabel={donutProps.innerLabel}
          innerSubLabel={donutProps.innerSubLabel}
          numberFormatter={numberFormatter}
        />
      </>
    )
  }

  // -------------------------------------------------------------------------
  // Line / Bar / Area — shared config
  // -------------------------------------------------------------------------

  const labels = data.map((d) => String(d[categoryKey]))

  const scales: Record<string, unknown> = {
    x: {
      reverse: isRTL,
      display: showXAxis,
      grid: {
        display: showGrid,
        color: withAlpha(mutedFgColor, isDarkMode ? 0.4 : 0.2),
      },
      border: { display: false },
      ticks: {
        color: mutedFgColor,
        font: { size: fontSize },
        ...(xAxisFormatter
          ? {
              callback: (_val: unknown, idx: number) =>
                xAxisFormatter(labels[idx]),
            }
          : {}),
      },
    },
    y: {
      position: isRTL ? 'right' : 'left',
      display: showYAxis,
      grid: {
        display: showGrid,
        color: withAlpha(mutedFgColor, isDarkMode ? 0.4 : 0.2),
      },
      border: { display: false },
      ticks: {
        color: mutedFgColor,
        font: { size: fontSize },
        maxTicksLimit: 6,
        callback: (val: unknown) => {
          const num = Number(val)
          if (yAxisFormatter) return yAxisFormatter(num)
          return numberFormatter.format(num)
        },
      },
    },
  }

  const plugins: Record<string, unknown> = {
    tooltip: {
      enabled: false,
      external: externalTooltip,
    },
    legend: { display: false },
  }

  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 0 },
    interaction: { mode: 'index' as const, intersect: false },
    transitions: {
      active: { animation: { duration: reducedMotion ? 0 : 150 } },
    },
    scales,
    plugins,
  }

  // Shared accessible data table for line/bar/area
  const dataTable = (
    <ChartDataTable
      data={data}
      categoryKey={categoryKey}
      valueKeys={valueKeys}
      numberFormatter={numberFormatter}
    />
  )

  // -------------------------------------------------------------------------
  // Line chart
  // -------------------------------------------------------------------------

  if (type === 'line') {
    const chartData = {
      labels,
      datasets: valueKeys.map((key, i) => ({
        label: key,
        data: data.map((d) => Number(d[key])),
        borderColor: resolvedColors[i] ?? resolvedColors[0],
        backgroundColor: resolvedColors[i] ?? resolvedColors[0],
        borderWidth: strokeWidth,
        borderDash:
          valueKeys.length > 1
            ? DASH_PATTERNS[i % DASH_PATTERNS.length]
            : [],
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: resolvedColors[i] ?? resolvedColors[0],
      })),
    }

    return (
      <>
        <figure
          role="img"
          className={cn(chartVariants({ size }), className)}
          aria-label={ariaLabel ?? fallbackLabel}
        >
          <div aria-hidden="true" className="h-full">
            <Line data={chartData} options={baseOptions as never} />
          </div>
        </figure>
        {dataTable}
      </>
    )
  }

  // -------------------------------------------------------------------------
  // Bar chart
  // -------------------------------------------------------------------------

  if (type === 'bar') {
    const chartData = {
      labels,
      datasets: valueKeys.map((key, i) => ({
        label: key,
        data: data.map((d) => Number(d[key])),
        backgroundColor: resolvedColors[i] ?? resolvedColors[0],
        borderRadius: 6,
      })),
    }

    return (
      <>
        <figure
          role="img"
          className={cn(chartVariants({ size }), className)}
          aria-label={ariaLabel ?? fallbackLabel}
        >
          <div aria-hidden="true" className="h-full">
            <Bar data={chartData} options={baseOptions as never} />
          </div>
        </figure>
        {dataTable}
      </>
    )
  }

  // -------------------------------------------------------------------------
  // Area chart (Line with fill)
  // -------------------------------------------------------------------------

  const areaData = {
    labels,
    datasets: valueKeys.map((key, i) => {
      const color = resolvedColors[i] ?? resolvedColors[0]
      return {
        label: key,
        data: data.map((d) => Number(d[key])),
        borderColor: color,
        backgroundColor: withAlpha(color, 0.15),
        borderWidth: strokeWidth,
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHitRadius: 20,
      }
    }),
  }

  return (
    <>
      <figure
        role="img"
        className={cn(chartVariants({ size }), className)}
        aria-label={ariaLabel ?? fallbackLabel}
      >
        <div aria-hidden="true" className="h-full">
          <Line data={areaData} options={baseOptions as never} />
        </div>
      </figure>
      {dataTable}
    </>
  )
}
