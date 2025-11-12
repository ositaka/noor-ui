import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => {
  // Check if we're in RTL mode
  const [isRTL, setIsRTL] = React.useState(false)

  React.useEffect(() => {
    const checkRTL = () => {
      const dir = document.documentElement.dir || document.body.dir
      setIsRTL(dir === 'rtl')
    }
    checkRTL()

    // Watch for dir changes
    const observer = new MutationObserver(checkRTL)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })
    observer.observe(document.body, { attributes: true, attributeFilter: ['dir'] })

    return () => observer.disconnect()
  }, [])

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          'h-full w-full flex-1 bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-500 ease-in-out relative overflow-hidden rtl:bg-gradient-to-l',
          indicatorClassName
        )}
        style={{ transform: `translateX(${isRTL ? '' : '-'}${100 - (value || 0)}%)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer rtl:bg-gradient-to-l" />
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
