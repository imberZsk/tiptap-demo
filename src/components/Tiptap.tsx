'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { useDebouncedCallback } from 'use-debounce'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

import { cn } from '@/lib/utils'
import { TextMenu } from './menus'
import TextAlign from '@tiptap/extension-text-align'

const classNames = 'h-full focus:outline-none min-h-40'

// 正文：16 1.6 2%，组件间距 16px
const TextClassNames = '[&_p]:text-base [&_p]:leading-[1.6] [&_p]:tracking-[2%]'

// 标题组件
const HeadingClassNames = cn(
  '[&_h1]:text-[22px] [&_h1]:leading-[1.5] [&_h1]:tracking-[2%] [&_h1]:mb-4 [&_h1]:font-semibold',
  '[&_h2]:text-[19px] [&_h2]:leading-[1.5] [&_h2]:tracking-[2%] [&_h2]:mb-4 [&_h2]:font-semibold',
  '[&_h3]:text-[17px] [&_h3]:leading-[1.6] [&_h3]:tracking-[2%] [&_h3]:mb-4 [&_h3]:font-semibold'
)

const Tiptap = () => {
  const updateContent = useDebouncedCallback(() => {
    if (typeof window === 'undefined') return
    const data = editor?.getJSON()
    localStorage.setItem('editor-content', JSON.stringify(data))
  }, 1000)

  const editor = useEditor({
    onUpdate() {
      updateContent()
    },
    content:
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('editor-content') || '{}')
        : '',
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `Write something, ' / ' for commands…`
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      HorizontalRule
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: classNames
      }
    }
  })

  if (!editor) return null

  return (
    <>
      <EditorContent
        editor={editor}
        className={cn('editor-content', TextClassNames, HeadingClassNames)}
      />
      <TextMenu editor={editor} />
    </>
  )
}

export default Tiptap
