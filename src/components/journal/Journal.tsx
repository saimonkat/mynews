'use client'
import 'twin.macro'
import Image from 'next/image'
import { IJournal } from '@/utils/types'
import { useState } from 'react'

function Journal({ title, onJournalChange }: IJournal) {
  const [isActive, setIsActive] = useState(true)

  const handleJournalClick = () => {
    setIsActive(!isActive)
    onJournalChange(title)
  }

  return (
    <div
      tw="flex h-16 w-full cursor-pointer justify-center rounded-xl border p-2 transition-all hover:border-sky-500 sm:p-4 lg:h-20 lg:p-4 dark:bg-white/90"
      css={[{ opacity: isActive ? 1 : 0.5 }]}
      onClick={handleJournalClick}
    >
      <Image
        alt={title}
        src={`/static/images/journals/${title}.png`}
        width={400}
        height={120}
        tw="h-full w-auto object-contain"
      />
    </div>
  )
}

export default Journal
