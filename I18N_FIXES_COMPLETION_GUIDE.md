# i18n Fixes Completion Guide

## Completed

### 1. Stepper Component ✅
- **File**: `app/(docs)/components/stepper/page.tsx`
- **Changes**: Converted hardcoded props to use `getStepperProps(componentT)`
- **Translation Keys Added**:
  - EN: `lib/i18n/en/components-misc.ts` - Added `props` object with 6 keys
  - AR: `lib/i18n/ar/components-misc.ts` - Added `props` object with 6 keys

## Remaining Tasks

### PART 1: Fix Props in 9 Remaining Experimental Component Pages

Each file needs the same pattern:

#### Template Pattern
```typescript
// 1. Create getter function at top of file
const getProps = (componentT: any): PropDefinition[] => [
  { name: 'propName', type: 'type', description: componentT.props.propName },
  // ... all props
]

// 2. In component function
export default function ComponentPage() {
  const { direction, locale } = useDirection()
  const t = content[locale]
  const componentT = t.componentNameComponent  // Use correct component name

  const propDefinitions = getProps(componentT)

  // ... rest of component
}
```

#### Files to Fix:

1. **chat-message/page.tsx** (lines 15-93)
   - Has 11 props
   - Translation key: `chatMessageComponent.props`
   - Props: role, content, variant, state, timestamp, avatar, name, showCopy, showRegenerate, onCopy, onRegenerate, isRTL

2. **prompt-input/page.tsx** (lines 14-98)
   - Has 12 props
   - Translation key: `promptInputComponent.props`
   - Props: onSend, isLoading, showAttachment, showVoice, showCounter, maxLength, onAttachment, onVoice, isRTL, placeholder, placeholderAr, value, onChange

3. **thinking-indicator/page.tsx** (lines 14-35)
   - Has 3 props
   - Translation key: `thinkingIndicatorComponent.props`
   - Props: variant, size, message

4. **message-actions/page.tsx** (lines 14-113)
   - Has 13 props
   - Translation key: `messageActionsComponent.props`
   - Props: showCopy, showRegenerate, showEdit, showShare, showFlag, showFeedback, onCopy, onRegenerate, onEdit, onShare, onFlag, onThumbsUp, onThumbsDown, isRTL, compact

5. **parameter-slider/page.tsx** (lines 14-105)
   - Has 13 props
   - Translation key: `parameterSliderComponent.props`
   - Props: label, labelAr, description, descriptionAr, value, onValueChange, min, max, step, decimals, presets, showValue, isRTL, className

6. **token-counter/page.tsx** (lines 14-102)
   - Has 12 props
   - Translation key: `tokenCounterComponent.props`
   - Props: inputTokens, outputTokens, maxTokens, inputCostPer1K, outputCostPer1K, showCost, showBreakdown, variant, warningThreshold, dangerThreshold, isRTL, label, labelAr

7. **conversation-history/page.tsx** (lines 14-97)
   - Has 12 props
   - Translation key: `conversationHistoryComponent.props`
   - Props: conversations, activeId, onSelect, onCreate, onRename, onDelete, onShare, showSearch, variant, size, isRTL, title, titleAr

8. **workflow-canvas/page.tsx** (lines 16-117)
   - Has 15 props
   - Translation key: `workflowCanvasComponent.props`
   - Props: initialNodes, initialEdges, nodeTypes, onNodesChange, onEdgesChange, onConnect, readOnly, showMiniMap, showControls, showBackground, backgroundVariant, isRTL, className, fitViewOptions, defaultEdgeOptions

9. **workflow-node/page.tsx** (lines 16-78)
   - Has 10 props
   - Translation key: `workflowNodeComponent.props`
   - Props: label, labelAr, description, descriptionAr, type, typeAr, icon, status, isRTL, children

### PART 2: Convert Raw Code Tags to CodeBlock Component

#### Files to Fix:

1. **stepper/page.tsx** - NO RAW TAGS FOUND ✅ (Already uses CodeBlock)

2. **reaction-picker/page.tsx** (lines 217-220, 231-263)
   ```tsx
   // Change from:
   <pre className="text-sm"><code>npm install noorui-rtl</code></pre>

   // To:
   <CodeBlock code="npm install noorui-rtl" language="bash" />
   ```

3. **kbd/page.tsx** (lines 117-118, 128-142)
   ```tsx
   // Change from:
   <pre className="text-sm"><code>npm install noorui-rtl</code></pre>

   // To:
   <CodeBlock code="npm install noorui-rtl" language="bash" />
   ```

### PART 3: Add All Missing Translation Keys

All props are ALREADY defined in:
- `lib/i18n/en/components-experimental.ts` (lines 36-633)
- `lib/i18n/ar/components-experimental.ts` (lines 36-633)

**No additional translation keys needed!** ✅

## Quick Fix Script

To quickly complete all remaining fixes, run these replacements in order:

### Fix 1: chat-message/page.tsx
Find: `const chatMessageProps: PropDefinition[] = [`
Replace with: `const getChatMessageProps = (componentT: any): PropDefinition[] => [`

Then update all 11 descriptions to use `componentT.props.propName`

Then in component:
```typescript
const componentT = content[locale]?.chatMessageComponent || content.en.chatMessageComponent
const chatMessageProps = getChatMessageProps(componentT as any)
```

### Apply same pattern to all 9 files

## Verification Checklist

- [ ] All 10 component pages use `getProps()` function pattern
- [ ] All props use `componentT.props.propName` for descriptions
- [ ] reaction-picker uses CodeBlock for all code examples
- [ ] kbd uses CodeBlock for all code examples
- [ ] All pages successfully render in both EN and AR
- [ ] No hardcoded English strings in prop descriptions

## Final Testing

1. Start dev server: `npm run dev`
2. Test each component page in both EN and AR:
   - Navigate to `/components/stepper`
   - Navigate to `/components/chat-message`
   - Navigate to `/components/prompt-input`
   - Navigate to `/components/thinking-indicator`
   - Navigate to `/components/message-actions`
   - Navigate to `/components/parameter-slider`
   - Navigate to `/components/token-counter`
   - Navigate to `/components/conversation-history`
   - Navigate to `/components/workflow-canvas`
   - Navigate to `/components/workflow-node`
   - Navigate to `/components/reaction-picker`
   - Navigate to `/components/kbd`
3. Toggle language using language selector
4. Verify all prop descriptions change language
5. Verify code blocks render correctly with syntax highlighting
