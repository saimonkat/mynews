import React from 'react'
import tw from 'twin.macro'
import { useEffect, useRef, useState } from 'react'
import { ISelect } from '../../utils/types'
import { Icons } from '../icons'

const Select: React.FC<ISelect> = ({
  options,
  title,
  setActiveOption,
  shouldReset,
  hasResetOption,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const widthRef = useRef<HTMLDivElement | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const [activeTitle, setActiveTitle] = useState<string>(title || 'title')

  const handleOpenSelect = () => {
    setOpen(prev => !prev)
  }

  const handleSetActive = (option: string) => {
    setOpen(false)
    setActiveTitle(option)
    setActiveOption && setActiveOption(option)
  }

  const handleReset = () => {
    setOpen(false)
    title && setActiveTitle(title)
    setActiveOption && setActiveOption('')
  }

  useEffect(() => {
    if (shouldReset) handleReset()
  }, [shouldReset])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={selectRef} tw="relative w-full" css={open && tw`z-20`}>
      <div
        ref={widthRef}
        onClick={handleOpenSelect}
        tw="relative flex w-full overflow-hidden rounded"
        css={!options?.length && tw`pointer-events-none opacity-30`}
      >
        <div tw="relative z-10 flex h-8 w-full cursor-pointer items-center justify-center rounded border border-gray-300 text-sm font-semibold uppercase transition-all hover:border-slate-500 dark:bg-gray-700 dark:bg-transparent dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-transparent">
          {activeTitle}
        </div>
      </div>
      {open && (
        <ul
          tw="absolute z-10 mt-[6px] flex flex-col overflow-hidden rounded border bg-white dark:border-gray-700 dark:bg-gray-700"
          css={[{ width: widthRef.current?.offsetWidth }]}
        >
          {options &&
            options.map(
              (option, index) =>
                option !== activeTitle && (
                  <li
                    tw="flex h-10 cursor-pointer items-center justify-between gap-2 border-b px-4 text-sm font-semibold uppercase transition-all last:border-[0] hover:bg-slate-100 dark:border-gray-primary-700 dark:text-white dark:hover:bg-gray-800"
                    css={activeTitle == option && tw`font-bold pointer-events-none`}
                    key={index}
                    onClick={() => handleSetActive(option)}
                  >
                    <span tw="w-full truncate">{option}</span>
                    <span tw="w-3">
                      <Icons.Arrow />
                    </span>
                  </li>
                ),
            )}
          {hasResetOption && (
            <li
              tw="flex h-10 cursor-pointer items-center justify-between px-6 text-sm font-semibold uppercase transition-all hover:bg-slate-100 dark:border-gray-primary-700 dark:text-white dark:hover:bg-gray-800"
              onClick={() => handleReset()}
            >
              Reset
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default Select