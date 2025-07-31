import { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Minus
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const TextMenu = ({ editor }: { editor: Editor }) => {
  return (
    <>
      {editor && (
        <BubbleMenu
          className={cn(
            'bubble-menu',
            'flex items-center gap-1 p-2 bg-white border border-gray-200 rounded-lg shadow-lg',
            'backdrop-blur-sm bg-white/95 dark:bg-gray-800/95 dark:border-gray-700',
            'animate-in fade-in-0 zoom-in-95 duration-200'
          )}
          editor={editor}
        >
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            tooltip="粗体 (Cmd+B)"
          >
            <Bold size={14} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            tooltip="斜体 (Cmd+I)"
          >
            <Italic size={14} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            tooltip="删除线 (Cmd+Shift+X)"
          >
            <Strikethrough size={14} />
          </MenuButton>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            tooltip="下划线"
          >
            <Underline size={14} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
            tooltip="行内代码"
          >
            <Code size={14} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().toggleTextAlign('left').run()}
            isActive={editor.isActive('textAlign', 'left')}
            tooltip="左对齐"
          >
            <AlignLeft size={14} />
          </MenuButton>

          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleTextAlign('center').run()
            }
            isActive={editor.isActive('textAlign', 'center')}
            tooltip="居中对齐"
          >
            <AlignCenter size={14} />
          </MenuButton>

          <MenuButton
            onClick={() =>
              editor.chain().focus().toggleTextAlign('right').run()
            }
            isActive={editor.isActive('textAlign', 'right')}
            tooltip="右对齐"
          >
            <AlignRight size={14} />
          </MenuButton>

          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            isActive={editor.isActive('horizontalRule')}
            tooltip="分割线"
          >
            <Minus size={14} />
          </MenuButton>

          <MenuButton
            onClick={() =>
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: 'https://www.baidu.com' })
                .run()
            }
            isActive={editor.isActive('link')}
            tooltip="超链接"
          >
            <Link size={14} />
          </MenuButton>
        </BubbleMenu>
      )}
    </>
  )
}

// 通用菜单按钮组件
const MenuButton = ({
  onClick,
  isActive,
  children,
  tooltip
}: {
  onClick: () => void
  isActive: boolean
  children: React.ReactNode
  tooltip?: string
}) => (
  <button
    onClick={onClick}
    title={tooltip}
    className={cn(
      'flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200',
      'hover:bg-gray-100 dark:hover:bg-gray-700',
      'active:scale-95',
      isActive
        ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-black shadow-inner'
        : 'text-gray-700 dark:text-gray-300'
    )}
  >
    {children}
  </button>
)
