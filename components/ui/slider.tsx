import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '../../lib/utils'

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, dir, ...props }, ref) => {
  // Auto-detect dir if not provided
  const [detectedDir, setDetectedDir] = React.useState<'ltr' | 'rtl'>('ltr')

  React.useEffect(() => {
    if (!dir) {
      const htmlDir = (document.documentElement.dir || document.body.dir || 'ltr') as 'ltr' | 'rtl'
      setDetectedDir(htmlDir)

      const observer = new MutationObserver(() => {
        const newDir = (document.documentElement.dir || document.body.dir || 'ltr') as 'ltr' | 'rtl'
        setDetectedDir(newDir)
      })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'] })
      observer.observe(document.body, { attributes: true, attributeFilter: ['dir'] })

      return () => observer.disconnect()
    }
  }, [dir])

  // Determine number of thumbs based on value/defaultValue
  const values = (props.value || props.defaultValue || [50]) as number[]
  const thumbCount = Array.isArray(values) ? values.length : 1

  return (
    <SliderPrimitive.Root
      ref={ref}
      dir={dir || detectedDir}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
