'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'

const classNames = 'h-full focus:outline-none min-h-40 [&_h1]:text-[22px]'

// 正文

// 标题组件

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: `Write something, ' / ' for commands…`
      })
    ],
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: classNames
      }
    }
  })

  return <EditorContent editor={editor} className="editor-content" />
}

export default Tiptap
