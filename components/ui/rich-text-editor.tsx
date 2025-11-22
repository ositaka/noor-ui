'use client'

import * as React from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { useDirection } from '../providers/direction-provider'

export interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  editable?: boolean
  minHeight?: string
  /** Override the direction from context. Useful when editing content in a different language than the page. */
  dir?: 'ltr' | 'rtl'
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  children: React.ReactNode
  title: string
}

const ToolbarButton = React.forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ onClick, isActive, disabled, children, title }, ref) => {
    return (
      <button
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        title={title}
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors',
          'hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isActive && 'bg-accent text-accent-foreground'
        )}
      >
        {children}
      </button>
    )
  }
)
ToolbarButton.displayName = 'ToolbarButton'

interface ToolbarProps {
  editor: Editor | null
}

const Toolbar = ({ editor }: ToolbarProps) => {
  const { direction } = useDirection()

  if (!editor) {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-background p-2">
      {/* Text Formatting */}
      <div className="flex items-center gap-1 border-e border-border pe-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          title="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Headings */}
      <div className="flex items-center gap-1 border-e border-border pe-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          title="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Lists */}
      <div className="flex items-center gap-1 border-e border-border pe-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Text Alignment */}
      <div className="flex items-center gap-1 border-e border-border pe-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign(direction === 'rtl' ? 'right' : 'left').run()}
          isActive={editor.isActive({ textAlign: direction === 'rtl' ? 'right' : 'left' })}
          title={direction === 'rtl' ? 'Align Right' : 'Align Left'}
        >
          {direction === 'rtl' ? <AlignRight className="h-4 w-4" /> : <AlignLeft className="h-4 w-4" />}
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign(direction === 'rtl' ? 'left' : 'right').run()}
          isActive={editor.isActive({ textAlign: direction === 'rtl' ? 'left' : 'right' })}
          title={direction === 'rtl' ? 'Align Left' : 'Align Right'}
        >
          {direction === 'rtl' ? <AlignLeft className="h-4 w-4" /> : <AlignRight className="h-4 w-4" />}
        </ToolbarButton>
      </div>

      {/* Blocks */}
      <div className="flex items-center gap-1 border-e border-border pe-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive('blockquote')}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          isActive={editor.isActive('codeBlock')}
          title="Code Block"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* History */}
      <div className="flex items-center gap-1">
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  )
}

export const RichTextEditor = React.forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ content = '', onChange, placeholder = 'Start writing...', className, editable = true, minHeight = '300px', dir: dirProp }, ref) => {
    const { direction: contextDirection } = useDirection()
    // Use the dir prop if provided, otherwise fall back to context
    const direction = dirProp || contextDirection

    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Underline,
        TextStyle,
        Color,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'center', 'right'],
          defaultAlignment: direction === 'rtl' ? 'right' : 'left',
        }),
        Placeholder.configure({
          placeholder,
          emptyEditorClass: 'is-editor-empty',
        }),
      ],
      content,
      editable,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
      editorProps: {
        attributes: {
          class: cn(
            'prose prose-sm sm:prose lg:prose-lg focus:outline-none max-w-none',
            'px-4 py-3',
            direction === 'rtl' && 'text-right'
          ),
          dir: direction,
        },
      },
    })

    // Update editor direction when direction changes
    React.useEffect(() => {
      if (editor && !editor.isDestroyed) {
        const editorElement = editor.view.dom
        editorElement.setAttribute('dir', direction)

        // Update text alignment for all blocks when direction changes
        const defaultAlignment = direction === 'rtl' ? 'right' : 'left'
        const oppositeAlignment = direction === 'rtl' ? 'left' : 'right'

        // Iterate through all nodes in the document
        const { state } = editor
        const { tr } = state
        let updated = false

        state.doc.descendants((node, pos) => {
          // Only update paragraph and heading nodes
          if (node.type.name === 'paragraph' || node.type.name === 'heading') {
            const currentAlignment = node.attrs.textAlign

            // If no alignment is set or it matches the opposite default, update it
            if (!currentAlignment || currentAlignment === oppositeAlignment) {
              tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                textAlign: defaultAlignment,
              })
              updated = true
            }
          }
        })

        // Apply the transaction if any updates were made
        if (updated) {
          editor.view.dispatch(tr)
        }
      }
    }, [direction, editor])

    // Update content when prop changes
    React.useEffect(() => {
      if (editor && !editor.isDestroyed && content !== editor.getHTML()) {
        editor.commands.setContent(content)
      }
    }, [content, editor])

    // Update editable state
    React.useEffect(() => {
      if (editor && !editor.isDestroyed) {
        editor.setEditable(editable)
      }
    }, [editable, editor])

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col rounded-md border border-input bg-background overflow-hidden',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
          className
        )}
      >
        {editable && <Toolbar editor={editor} />}
        <EditorContent
          editor={editor}
          className={cn('flex-1 overflow-auto')}
          style={{ minHeight }}
        />
        <style dangerouslySetInnerHTML={{ __html: `
          .ProseMirror {
            outline: none;
          }

          .ProseMirror p.is-editor-empty:first-child::before {
            color: hsl(var(--muted-foreground));
            content: attr(data-placeholder);
            float: ${direction === 'rtl' ? 'right' : 'left'};
            height: 0;
            pointer-events: none;
          }

          .ProseMirror h1 {
            font-size: 2em;
            font-weight: bold;
            margin-block: 0.67em;
          }

          .ProseMirror h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-block: 0.75em;
          }

          .ProseMirror h3 {
            font-size: 1.17em;
            font-weight: bold;
            margin-block: 0.83em;
          }

          .ProseMirror ul,
          .ProseMirror ol {
            padding-inline-start: 1.5rem;
            margin-block: 1em;
          }

          .ProseMirror ul {
            list-style-type: disc;
          }

          .ProseMirror ol {
            list-style-type: decimal;
          }

          .ProseMirror blockquote {
            padding-inline-start: 1em;
            border-inline-start: 3px solid hsl(var(--border));
            margin-inline-start: 0;
            margin-block: 1em;
            color: hsl(var(--muted-foreground));
          }

          .ProseMirror pre {
            background: hsl(var(--muted));
            color: hsl(var(--foreground));
            border-radius: 0.5rem;
            padding: 0.75rem 1rem;
            font-family: 'JetBrains Mono', monospace;
            overflow-x: auto;
            margin-block: 1em;
          }

          .ProseMirror code {
            background: hsl(var(--muted));
            color: hsl(var(--foreground));
            border-radius: 0.25rem;
            padding: 0.125rem 0.25rem;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.875em;
          }

          .ProseMirror pre code {
            background: none;
            padding: 0;
          }

          .ProseMirror strong {
            font-weight: bold;
          }

          .ProseMirror em {
            font-style: italic;
          }

          .ProseMirror u {
            text-decoration: underline;
          }

          /* RTL Support */
          .ProseMirror[dir='rtl'] {
            text-align: right;
          }

          .ProseMirror[dir='rtl'] ul,
          .ProseMirror[dir='rtl'] ol {
            padding-inline-start: 1.5rem;
            padding-inline-end: 0;
          }

          .ProseMirror[dir='rtl'] blockquote {
            border-inline-start: 3px solid hsl(var(--border));
            border-inline-end: none;
          }
        ` }} />
      </div>
    )
  }
)

RichTextEditor.displayName = 'RichTextEditor'
