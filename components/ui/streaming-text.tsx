import * as React from 'react'
import { cn } from '../../lib/utils'

export interface StreamingTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * The full text to display
   */
  text: string
  /**
   * Speed of typing in milliseconds per character
   */
  speed?: number
  /**
   * Whether to show blinking cursor
   */
  showCursor?: boolean
  /**
   * Whether streaming is enabled
   */
  isStreaming?: boolean
  /**
   * Callback when streaming completes
   */
  onComplete?: () => void
  /**
   * Start streaming immediately
   */
  autoStart?: boolean
}

const StreamingText = React.forwardRef<HTMLSpanElement, StreamingTextProps>(
  (
    {
      className,
      text,
      speed = 30,
      showCursor = true,
      isStreaming = true,
      onComplete,
      autoStart = true,
      ...props
    },
    ref
  ) => {
    const [displayedText, setDisplayedText] = React.useState('')
    const [isComplete, setIsComplete] = React.useState(false)
    const indexRef = React.useRef(0)
    const timerRef = React.useRef<NodeJS.Timeout>()

    React.useEffect(() => {
      if (!isStreaming || !autoStart) {
        setDisplayedText(text)
        setIsComplete(true)
        return
      }

      // Reset state
      setDisplayedText('')
      setIsComplete(false)
      indexRef.current = 0

      const typeNextCharacter = () => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.slice(0, indexRef.current + 1))
          indexRef.current++
          timerRef.current = setTimeout(typeNextCharacter, speed)
        } else {
          setIsComplete(true)
          onComplete?.()
        }
      }

      timerRef.current = setTimeout(typeNextCharacter, speed)

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }, [text, speed, isStreaming, autoStart, onComplete])

    return (
      <span ref={ref} className={cn('inline', className)} {...props}>
        {displayedText}
        {showCursor && !isComplete && (
          <span className="inline-block w-[2px] h-[1em] bg-current animate-blink ms-0.5 align-middle" />
        )}
      </span>
    )
  }
)

StreamingText.displayName = 'StreamingText'

// Add blink keyframe to global CSS
const blinkKeyframe = `
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
`

export { StreamingText, blinkKeyframe }
