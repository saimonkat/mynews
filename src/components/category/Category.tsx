'use client'
import 'twin.macro'
import Image from 'next/image'
import { ICategory } from '@/utils/types'
import { useState } from 'react'

function Category({ journal, onCategoryChange }: ICategory) {
  const [isActive, setIsActive] = useState(true);

  const handleCategoryClick = () => {
    setIsActive(!isActive);
    onCategoryChange(journal);
  };

  return (
    <div
      tw="flex h-16 w-1/3 cursor-pointer justify-center rounded-xl border p-2 transition-all hover:border-sky-500 sm:p-4 lg:h-20 lg:w-40 lg:p-4 dark:bg-white/90"
      css={[{ opacity: isActive ? 1 : 0.5 }]}
      onClick={handleCategoryClick}
    >
      <Image
        alt={journal}
        src={`/static/images/journals/${journal}.png`}
        width={400}
        height={120}
        tw="h-full w-auto object-contain"
      />
    </div>
  );
}

export default Category
