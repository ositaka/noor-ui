import * as React from 'react'
import { cn } from '../../lib/utils'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './select'
import { Badge } from './badge'
import { Zap, Brain, Sparkles, Bot, Star } from 'lucide-react'
import { useDirection } from '../providers/direction-provider'
import { content } from '../../lib/i18n'

export interface AIModel {
  id: string
  name: string
  nameAr?: string
  provider: string
  providerAr?: string
  description: string
  descriptionAr?: string
  specs: {
    speed: 'fast' | 'medium' | 'slow'
    speedLabel?: string
    speedLabelAr?: string
    contextLength: number
    pricing?: string
    pricingAr?: string
  }
  recommended?: boolean
  icon?: 'zap' | 'brain' | 'sparkles' | 'bot'
}

export interface ModelSelectorProps {
  /**
   * Available models
   */
  models: AIModel[]
  /**
   * Selected model ID
   */
  value?: string
  /**
   * Callback when model changes
   */
  onValueChange?: (value: string) => void
  /**
   * Whether text direction is RTL
   */
  isRTL?: boolean
  /**
   * Placeholder text
   */
  placeholder?: string
  /**
   * Placeholder text in Arabic
   */
  placeholderAr?: string
  /**
   * Additional CSS classes
   */
  className?: string
}

const ModelSelector = React.forwardRef<HTMLButtonElement, ModelSelectorProps>(
  (
    {
      models,
      value,
      onValueChange,
      isRTL = false,
      placeholder,
      placeholderAr,
      className,
    },
    ref
  ) => {
    const { locale } = useDirection()
    const t = content[locale]
    const getIcon = (iconType?: string) => {
      switch (iconType) {
        case 'zap':
          return <Zap className="h-4 w-4" />
        case 'brain':
          return <Brain className="h-4 w-4" />
        case 'sparkles':
          return <Sparkles className="h-4 w-4" />
        case 'bot':
          return <Bot className="h-4 w-4" />
        default:
          return <Sparkles className="h-4 w-4" />
      }
    }

    const getSpeedColor = (speed: string) => {
      switch (speed) {
        case 'fast':
          return 'text-green-600 dark:text-green-500'
        case 'medium':
          return 'text-yellow-600 dark:text-yellow-500'
        case 'slow':
          return 'text-orange-600 dark:text-orange-500'
        default:
          return 'text-muted-foreground'
      }
    }

    const getSpeedLabel = (model: AIModel) => {
      if (isRTL && model.specs.speedLabelAr) {
        return model.specs.speedLabelAr
      }
      if (model.specs.speedLabel) {
        return model.specs.speedLabel
      }
      // Default labels
      switch (model.specs.speed) {
        case 'fast':
          return t.ui.components.fast
        case 'medium':
          return t.ui.components.medium
        case 'slow':
          return t.ui.components.slow
      }
    }

    const formatContextLength = (length: number) => {
      if (length >= 1000) {
        return `${(length / 1000).toFixed(0)}K`
      }
      return length.toString()
    }

    const defaultPlaceholder = t.ui.components.selectModel

    // Group models by provider
    const groupedModels = models.reduce((acc, model) => {
      const provider = isRTL ? (model.providerAr || model.provider) : model.provider
      if (!acc[provider]) {
        acc[provider] = []
      }
      acc[provider].push(model)
      return acc
    }, {} as Record<string, AIModel[]>)

    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger ref={ref} className={cn('w-full', className)}>
          <SelectValue
            placeholder={isRTL ? (placeholderAr || placeholder || defaultPlaceholder) : (placeholder || defaultPlaceholder)}
          />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(groupedModels).map(([provider, providerModels]) => (
            <SelectGroup key={provider}>
              <SelectLabel>{provider}</SelectLabel>
              {providerModels.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  <div className="flex items-center gap-3 py-1">
                    <div className="shrink-0">{getIcon(model.icon)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {isRTL ? (model.nameAr || model.name) : model.name}
                        </span>
                        {model.recommended && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className={cn('h-2.5 w-2.5 fill-current', isRTL ? 'ms-1' : 'me-1')} />
                            {t.ui.components.recommended}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span className={getSpeedColor(model.specs.speed)}>
                          {getSpeedLabel(model)}
                        </span>
                        <span>•</span>
                        <span>{formatContextLength(model.specs.contextLength)} {t.ui.components.tokens}</span>
                        {model.specs.pricing && (
                          <>
                            <span>•</span>
                            <span>{isRTL ? (model.specs.pricingAr || model.specs.pricing) : model.specs.pricing}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    )
  }
)

ModelSelector.displayName = 'ModelSelector'

// Default models for demo purposes
export const defaultModels: AIModel[] = [
  {
    id: 'gpt-4',
    name: 'GPT-4',
    nameAr: 'جي بي تي-٤',
    provider: 'OpenAI',
    providerAr: 'أوبن إيه آي',
    description: 'Most capable model, best for complex tasks',
    descriptionAr: 'النموذج الأكثر قدرة، الأفضل للمهام المعقدة',
    specs: {
      speed: 'medium',
      speedLabel: 'Medium',
      speedLabelAr: 'متوسط',
      contextLength: 8000,
      pricing: '$0.03/1K tokens',
      pricingAr: '٠٫٠٣$ / ١٠٠٠ رمز',
    },
    recommended: true,
    icon: 'brain',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    nameAr: 'جي بي تي-٣٫٥ تيربو',
    provider: 'OpenAI',
    providerAr: 'أوبن إيه آي',
    description: 'Fast and affordable for most tasks',
    descriptionAr: 'سريع وبأسعار معقولة لمعظم المهام',
    specs: {
      speed: 'fast',
      speedLabel: 'Fast',
      speedLabelAr: 'سريع',
      contextLength: 4000,
      pricing: '$0.002/1K tokens',
      pricingAr: '٠٫٠٠٢$ / ١٠٠٠ رمز',
    },
    icon: 'zap',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    nameAr: 'كلود ٣ أوبس',
    provider: 'Anthropic',
    providerAr: 'أنثروبيك',
    description: 'Powerful model for complex reasoning',
    descriptionAr: 'نموذج قوي للاستدلال المعقد',
    specs: {
      speed: 'medium',
      speedLabel: 'Medium',
      speedLabelAr: 'متوسط',
      contextLength: 200000,
      pricing: '$0.015/1K tokens',
      pricingAr: '٠٫٠١٥$ / ١٠٠٠ رمز',
    },
    icon: 'sparkles',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    nameAr: 'كلود ٣ سونيت',
    provider: 'Anthropic',
    providerAr: 'أنثروبيك',
    description: 'Balanced performance and speed',
    descriptionAr: 'أداء وسرعة متوازنة',
    specs: {
      speed: 'fast',
      speedLabel: 'Fast',
      speedLabelAr: 'سريع',
      contextLength: 200000,
      pricing: '$0.003/1K tokens',
      pricingAr: '٠٫٠٠٣$ / ١٠٠٠ رمز',
    },
    recommended: true,
    icon: 'sparkles',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    nameAr: 'جيميني برو',
    provider: 'Google',
    providerAr: 'جوجل',
    description: 'Google\'s advanced AI model',
    descriptionAr: 'نموذج الذكاء الاصطناعي المتقدم من جوجل',
    specs: {
      speed: 'fast',
      speedLabel: 'Fast',
      speedLabelAr: 'سريع',
      contextLength: 32000,
      pricing: '$0.0005/1K tokens',
      pricingAr: '٠٫٠٠٠٥$ / ١٠٠٠ رمز',
    },
    icon: 'bot',
  },
]

export { ModelSelector }
