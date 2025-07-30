'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import { useDebouncedCallback } from 'use-debounce'
// import { BubbleMenu } from '@tiptap/react/menus'
// import BubbleMenu from '@tiptap/extension-bubble-menu'

import { cn } from '@/lib/utils'

const theme1 = 'var(--theme1)'
const theme2 = 'var(--theme2)'

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
      })
      // BubbleMenu.configure({
      //   element: document.querySelector('.bubble-menu') as HTMLElement
      // })
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: classNames
      }
    }
  })

  return (
    <>
      <EditorContent
        editor={editor}
        className={cn('editor-content', TextClassNames, HeadingClassNames)}
      />

      {editor && (
        // <BubbleMenu
        //   editor={editor}
        //   options={{ placement: 'bottom', offset: 8 }}
        // >
        <div className="bubble-menu">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            type="button"
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            type="button"
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            type="button"
          >
            Strike
          </button>
        </div>
        // </BubbleMenu>
      )}
    </>
  )
}

export default Tiptap
