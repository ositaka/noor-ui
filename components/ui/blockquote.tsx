import { cn } from '@/lib/utils'
import { Quote } from 'lucide-react'

export interface BlockquoteProps {
  children: React.ReactNode
  /** Quote author name */
  author?: string
  /** Source/book/article title */
  source?: string
  /** URL to the source */
  cite?: string
  /** Visual variant */
  variant?: 'default' | 'accent' | 'subtle'
  /** Additional CSS classes */
  className?: string
}

/**
 * Blockquote - Styled quote component with optional attribution
 *
 * Usage in MDX:
 * <Blockquote author="Ibn Arabi" source="Fusus al-Hikam">
 *   The self is an ocean without a shore.
 * </Blockquote>
 */
export function Blockquote({
  children,
  author,
  source,
  cite,
  variant = 'default',
  className,
}: BlockquoteProps) {
  const hasAttribution = author || source

  return (
    <figure className={cn('my-6 not-prose', className)}>
      <blockquote
        cite={cite}
        className={cn(
          'relative ps-6 py-4',
          // Border styling
          'border-s-4',
          // Variant styles
          variant === 'default' && 'border-primary/50 bg-transparent',
          variant === 'accent' && 'border-primary bg-primary/5 rounded-e-lg pe-6',
          variant === 'subtle' && 'border-muted-foreground/30 bg-muted/30 rounded-e-lg pe-6',
        )}
      >
        {/* Quote icon for accent variant */}
        {variant === 'accent' && (
          <Quote className="absolute top-4 end-4 h-8 w-8 text-primary/20" />
        )}

        <div className="relative text-lg italic text-foreground/90 leading-relaxed text-balance">
          {children}
        </div>
      </blockquote>

      {/* Attribution */}
      {hasAttribution && (
        <figcaption className="mt-3 ps-6 text-sm text-muted-foreground">
          {author && (
            <span className="font-medium text-foreground">
              — {author}
            </span>
          )}
          {source && (
            <cite className="not-italic">
              {author && ', '}
              {cite ? (
                <a
                  href={cite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline"
                >
                  {source}
                </a>
              ) : (
                source
              )}
            </cite>
          )}
        </figcaption>
      )}
    </figure>
  )
}

export interface PullQuoteProps {
  children: React.ReactNode
  /** Alignment of the pull quote */
  align?: 'left' | 'center' | 'right'
  /** Additional CSS classes */
  className?: string
}

/**
 * PullQuote - Large, emphasized quote for highlighting key text
 *
 * Usage in MDX:
 * <PullQuote align="center">
 *   The pen is mightier than the sword.
 * </PullQuote>
 */
export function PullQuote({
  children,
  align = 'center',
  className,
}: PullQuoteProps) {
  return (
    <aside
      className={cn(
        'my-8 py-6 not-prose',
        'border-y border-border',
        // Alignment
        align === 'left' && 'text-start',
        align === 'center' && 'text-center',
        align === 'right' && 'text-end',
        className,
      )}
    >
      <blockquote className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed text-balance">
        <span className="text-primary">&ldquo;</span>
        {children}
        <span className="text-primary">&rdquo;</span>
      </blockquote>
    </aside>
  )
}
