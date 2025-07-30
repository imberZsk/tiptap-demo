import Tiptap from '@/components/Tiptap'
import { TipTapTheme } from '@/components/Tiptap-theme'
import TipTapTitle from '@/components/Tiptap-title'

export default function Home() {
  return (
    <div className="min-w-80 max-w-180 mx-auto min-h-40 w-180 pt-14">
      <TipTapTheme />
      <TipTapTitle />
      <Tiptap />
    </div>
  )
}
