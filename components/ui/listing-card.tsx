import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { Badge } from './badge'
import { Button } from './button'
import { cn } from '../../lib/utils'
import { LucideIcon } from 'lucide-react'

export interface ListingCardBadge {
  label: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  className?: string
}

export interface ListingCardStat {
  icon: LucideIcon
  value: string | number
  label?: string
}

export interface ListingCardAction {
  icon: LucideIcon
  label: string
  onClick?: () => void
}

export interface ListingCardTag {
  label: string
  variant?: 'default' | 'secondary' | 'outline'
}

export interface ListingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Main title of the listing
   */
  title: string
  /**
   * Subtitle or location text
   */
  subtitle?: string | React.ReactNode
  /**
   * Short description
   */
  description?: string
  /**
   * Price or main value to display
   */
  price?: string | React.ReactNode
  /**
   * Image URL or custom image component
   */
  image?: string | React.ReactNode
  /**
   * Icon to show as placeholder when no image provided
   */
  placeholderIcon?: LucideIcon
  /**
   * Badges to show on top left of image
   */
  badges?: ListingCardBadge[]
  /**
   * Action buttons on top right of image (heart, share, etc)
   */
  actions?: ListingCardAction[]
  /**
   * Stats/specs to display (bedrooms, bathrooms, area, etc)
   */
  stats?: ListingCardStat[]
  /**
   * Tags/amenities to display
   */
  tags?: ListingCardTag[]
  /**
   * Max number of tags to show before "+N more"
   */
  maxTags?: number
  /**
   * Type badge next to title
   */
  typeBadge?: string
  /**
   * CTA button text
   */
  ctaText?: string
  /**
   * CTA button click handler
   */
  onCtaClick?: () => void
  /**
   * Card click handler
   */
  onClick?: () => void
  /**
   * Whether card is featured
   */
  featured?: boolean
  /**
   * Image aspect ratio
   */
  imageAspect?: 'square' | 'video' | 'wide'
  /**
   * Hover effect
   */
  hoverEffect?: boolean
}

const ListingCard = React.forwardRef<HTMLDivElement, ListingCardProps>(
  (
    {
      title,
      subtitle,
      description,
      price,
      image,
      placeholderIcon: PlaceholderIcon,
      badges = [],
      actions = [],
      stats = [],
      tags = [],
      maxTags = 3,
      typeBadge,
      ctaText,
      onCtaClick,
      onClick,
      featured = false,
      imageAspect = 'video',
      hoverEffect = true,
      className,
      ...props
    },
    ref
  ) => {
    const aspectRatioClasses = {
      square: 'aspect-square',
      video: 'aspect-video',
      wide: 'h-48',
    }

    const visibleTags = tags.slice(0, maxTags)
    const remainingTagsCount = tags.length - maxTags

    return (
      <Card
        ref={ref}
        className={cn(
          'overflow-hidden',
          hoverEffect && 'hover:shadow-lg transition-shadow',
          featured && 'border-primary/30 bg-primary/5',
          onClick && 'cursor-pointer',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {/* Image Area */}
        <div className={cn('relative bg-muted', aspectRatioClasses[imageAspect])}>
          {/* Image or Placeholder */}
          {typeof image === 'string' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={title} className="w-full h-full object-cover" />
          ) : image ? (
            image
          ) : PlaceholderIcon ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <PlaceholderIcon className="h-16 w-16 text-muted-foreground/30" />
            </div>
          ) : null}

          {/* Badges - Top Left */}
          {badges.length > 0 && (
            <div className="absolute top-3 start-3 flex flex-wrap gap-2">
              {badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  variant={badge.variant || 'default'}
                  className={cn('text-xs', badge.className)}
                >
                  {badge.label}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons - Top Right */}
          {actions.length > 0 && (
            <div className="absolute top-3 end-3 flex gap-2">
              {actions.map((action, idx) => (
                <Button
                  key={idx}
                  size="icon"
                  variant="secondary"
                  className="h-8 w-8 rounded-full bg-white/90"
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick?.()
                  }}
                  aria-label={action.label}
                >
                  <action.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <CardTitle className="text-lg line-clamp-1">{title}</CardTitle>
              {subtitle && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <span className="line-clamp-1">{subtitle}</span>
                </div>
              )}
            </div>
            {typeBadge && <Badge variant="outline">{typeBadge}</Badge>}
          </div>
          {description && <CardDescription className="line-clamp-2">{description}</CardDescription>}
        </CardHeader>

        <CardContent>
          {/* Stats */}
          {stats.length > 0 && (
            <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex items-center gap-1" title={stat.label}>
                  <stat.icon className="h-4 w-4" />
                  <span>{stat.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {visibleTags.map((tag, idx) => (
                <Badge key={idx} variant={tag.variant || 'secondary'} className="text-xs">
                  {tag.label}
                </Badge>
              ))}
              {remainingTagsCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  +{remainingTagsCount}
                </Badge>
              )}
            </div>
          )}

          {/* Footer - Price & CTA */}
          {(price || ctaText) && (
            <div className="flex items-center justify-between pt-4 border-t">
              {price && (
                <div className="flex-1">
                  {typeof price === 'string' ? (
                    <div className="text-2xl font-bold">{price}</div>
                  ) : (
                    price
                  )}
                </div>
              )}
              {ctaText && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    onCtaClick?.()
                  }}
                >
                  {ctaText}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }
)

ListingCard.displayName = 'ListingCard'

export { ListingCard }
