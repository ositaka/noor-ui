# Case Study: AI/LLM Components - Design Process

**Created:** November 2024
**Status:** Historical planning document - Components implemented and live in Noor UI v0.3.x
**Related Components:** Chat Message, Thinking Indicator, Prompt Input, Model Selector, Token Counter, Message Actions, Parameter Slider, Conversation History, Workflow Canvas

> This is the actual planning document used to design and build Noor UI's AI/LLM component suite. We're sharing it publicly to help others building similar interfaces learn from our process.

**What you'll learn from this document:**
- How to plan a comprehensive AI interface component library
- User flows for AI agent interactions
- Component architecture for LLM-powered features
- RTL considerations for AI interfaces
- Progressive complexity in component design

**Potential blog topics from this case study:**
- "How We Designed AI Components for RTL Interfaces"
- "Planning LLM User Interfaces: A Case Study"
- "Building Chat Components: From Planning to Production"
- "10 Components Every AI App Needs (And Why)"

---

# Original Planning Document

## AI/LLM Shell Feature Set - Implementation Plan

## Overview
Create a comprehensive set of AI/LLM components and examples for Noor UI, showcasing modern conversational interfaces with full bilingual support and RTL layout.

## 🎯 Components to Create (10 New Components)

### 1. **ChatMessage** (`components/ui/chat-message.tsx`)
- **Purpose**: Display chat messages from user, assistant, or system
- **Features**:
  - Three roles: `user`, `assistant`, `system`
  - Avatar support with fallback
  - Timestamp display
  - RTL-aware bubble alignment (user on end, assistant on start)
  - Copy button
  - Regenerate button (assistant only)
  - Markdown rendering
  - Code block syntax highlighting
- **Variants**: `default`, `compact`
- **States**: `streaming`, `complete`, `error`

### 2. **StreamingText** (`components/ui/streaming-text.tsx`)
- **Purpose**: Animate text appearing character by character
- **Features**:
  - Typewriter effect with configurable speed
  - Cursor animation
  - Pause/resume control
  - Complete callback
  - Support for markdown chunks
- **Use Cases**: AI response streaming, notifications

### 3. **PromptInput** (`components/ui/prompt-input.tsx`)
- **Purpose**: Enhanced textarea for AI prompts
- **Features**:
  - Auto-resize as user types
  - @ mentions support (e.g., @docs, @code)
  - Slash commands (e.g., /clear, /help)
  - File attachment button
  - Voice input button (UI only)
  - Character/token counter
  - Send button with loading state
  - Shift+Enter for new line, Enter to send
  - Command palette integration
- **Bilingual**: Placeholder and hints in AR/EN

### 4. **ThinkingIndicator** (`components/ui/thinking-indicator.tsx`)
- **Purpose**: Show AI is processing
- **Features**:
  - Animated dots pattern
  - Pulse animation
  - Custom messages ("Thinking...", "Analyzing code...")
  - Bilingual messages
- **Variants**: `dots`, `pulse`, `wave`, `typing`

### 5. **MessageActions** (`components/ui/message-actions.tsx`)
- **Purpose**: Action buttons for messages
- **Features**:
  - Copy to clipboard
  - Regenerate response
  - Edit message
  - Share message
  - Flag/report
  - Thumbs up/down
  - RTL-aware positioning
- **Integration**: Works with ChatMessage

### 6. **ModelSelector** (`components/ui/model-selector.tsx`)
- **Purpose**: Choose AI model
- **Features**:
  - Dropdown with model cards
  - Show model info (speed, context length, pricing)
  - Icons for different model types
  - Recommended badge
  - Bilingual model names and descriptions
- **Models**: GPT-4, Claude, Gemini, Local models

### 7. **ParameterSlider** (`components/ui/parameter-slider.tsx`)
- **Purpose**: Control AI parameters
- **Features**:
  - Slider with value display
  - Presets (Creative, Balanced, Precise)
  - Tooltip with explanation
  - Bilingual labels and tooltips
- **Parameters**: Temperature, Max Tokens, Top-P, Frequency Penalty

### 8. **TokenCounter** (`components/ui/token-counter.tsx`)
- **Purpose**: Display token usage
- **Features**:
  - Progress bar showing usage
  - Current / Max display
  - Color coding (safe, warning, danger)
  - Estimated cost display
  - Arabic number formatting
- **Integration**: Updates in real-time

### 9. **ConversationHistory** (`components/ui/conversation-history.tsx`)
- **Purpose**: Sidebar with past conversations
- **Features**:
  - List of conversations with preview
  - Search conversations
  - Create new conversation
  - Delete/rename conversations
  - Group by date (Today, Yesterday, Last 7 days, etc.)
  - Bilingual date formatting
- **States**: Expanded, collapsed, drawer on mobile

### 10. **CodeBlock (Enhanced)** (`components/ui/code-block.tsx`)
- **Purpose**: Display AI-generated code (extends existing)
- **Additions**:
  - Run code button (mock)
  - Explain code button
  - Diff view for code changes
  - File name/language header
  - Line highlighting
  - Word wrap toggle
- **Already exists**: Copy button, syntax highlighting

## 📱 Examples to Create (5 Pages)

### 1. **Simple Chat** (`app/examples/ai-chat-simple/page.tsx`)
- **Description**: Basic conversational AI interface
- **Features**:
  - Clean chat layout
  - User input at bottom
  - Message history
  - Simple model selector
  - No advanced controls
  - Perfect for customer support, Q&A bots
- **Components Used**: ChatMessage, PromptInput, ThinkingIndicator
- **Mock Responses**: Simulate AI replies with streaming

### 2. **Advanced Playground** (`app/examples/ai-playground/page.tsx`)
- **Description**: Full-featured AI interaction with all controls
- **Features**:
  - Split layout: chat + sidebar with controls
  - All parameter sliders (temp, max tokens, top-p)
  - Model selector with specs
  - System prompt editor
  - Token counter
  - Export conversation (JSON, Markdown)
  - Conversation history
- **Components Used**: All 10 components
- **Use Case**: Power users, developers, experimentation

### 3. **Code Assistant** (`app/examples/ai-code-assistant/page.tsx`)
- **Description**: AI assistant specialized for coding
- **Features**:
  - Code-focused UI
  - Split view: code editor mock + chat
  - Syntax highlighting for 20+ languages
  - File context selector
  - Code diff view
  - Run/test buttons (UI only)
  - Quick actions: "Explain", "Fix", "Optimize", "Add comments"
- **Components Used**: ChatMessage, CodeBlock, PromptInput, ModelSelector
- **Mock Data**: Code snippets, bug fixes, explanations

### 4. **Document Q&A** (`app/examples/ai-document-qa/page.tsx`)
- **Description**: Upload documents and ask questions
- **Features**:
  - File upload area (mock)
  - Document preview/list
  - Chat interface for questions
  - Citation/source references in responses
  - Multi-document support
  - Extract key information button
  - Bilingual document support
- **Components Used**: ChatMessage, PromptInput, File Upload (existing), ThinkingIndicator
- **Use Case**: Legal docs, research, business documents

### 5. **Multi-Agent Chat** (`app/examples/ai-multi-agent/page.tsx`)
- **Description**: Multiple AI personas/roles in conversation
- **Features**:
  - Agent selector (Expert, Teacher, Critic, Creative Writer)
  - Agent avatars with distinct personalities
  - Agent comparison mode (ask same question to multiple)
  - Debate mode (agents discuss with each other)
  - Role descriptions and specialties
  - Bilingual agent names and personalities
- **Components Used**: ChatMessage, PromptInput, ModelSelector (adapted for agents)
- **Use Case**: Creative brainstorming, decision-making, learning

## 🚀 Starter Application (Optional)

### **AI Chat Starter** (`starters/ai-chat/`)
- **Description**: Complete, deployable AI chat application
- **Tech Stack**: Next.js 14, Supabase (auth + database), OpenAI API
- **Features**:
  - User authentication
  - Persistent conversation history
  - Multiple conversations
  - API key management
  - Usage tracking and limits
  - Full bilingual support
- **Database Schema**:
  - `users` table
  - `conversations` table
  - `messages` table
  - `api_usage` table
- **README**: Complete setup guide with Supabase instructions

## 📊 Summary

**Total Components**: 10 new AI-specific components
**Total Examples**: 5 comprehensive example pages
**Total Starters**: 1 production-ready starter (optional)
**Documentation Pages**: 10 component docs + 5 example pages = 15 new pages

## 🎨 GCC/RTL Considerations

All components will include:
- ✅ Full RTL layout support
- ✅ Bilingual content (Arabic/English)
- ✅ Arabic number formatting where applicable
- ✅ RTL-aware animations and transitions
- ✅ Proper text alignment for mixed LTR/RTL content (code stays LTR)
- ✅ Culturally appropriate examples and use cases

## 🔧 Technical Requirements

**New Dependencies** (maybe):
- `@tiptap/react` (already have for Rich Text Editor)
- `react-markdown` (for markdown rendering in chat)
- `rehype-highlight` (syntax highlighting in markdown)

**Existing Components to Leverage**:
- Button, Input, Card, Badge, Tabs
- Select, Slider, Separator, Avatar
- Dialog, Sheet, Tooltip
- Code Block (enhance)
- File Upload (for document Q&A)

## 📝 Implementation Order

### Phase 1: Core Chat Components (Day 1-2)
1. ChatMessage
2. ThinkingIndicator
3. PromptInput
4. StreamingText
5. Simple Chat Example

### Phase 2: Advanced Components (Day 2-3)
6. MessageActions
7. ModelSelector
8. ParameterSlider
9. TokenCounter
10. Advanced Playground Example

### Phase 3: Specialized Examples (Day 3-4)
11. Code Assistant Example
12. Enhanced CodeBlock
13. ConversationHistory
14. Document Q&A Example
15. Multi-Agent Example

### Phase 4: Polish & Documentation (Day 4-5)
16. Component documentation pages (10 pages)
17. Update README
18. Update examples page
19. Add to navigation
20. Test RTL/bilingual in all examples

### Phase 5: Starter (Optional, Day 5-6)
21. AI Chat Starter with Supabase

## 🎯 Success Metrics

- All components have full RTL support
- All examples work in both Arabic and English
- Zero TypeScript errors
- Responsive on mobile/tablet/desktop
- Accessible (keyboard navigation, screen readers)
- Loading states for all async operations
- Professional mock data (not lorem ipsum)
- Clean, maintainable code
- Comprehensive documentation

---

**Total Estimated Time**: 4-5 days for components + examples, 1-2 days for starter
**Lines of Code**: ~5,000-7,000 LOC
**New Files**: ~30 files (10 components + 10 docs + 5 examples + 5 misc)
