import React from 'react'
import tw from 'twin.macro'
import { useEffect, useRef, useState } from 'react'
import { ISelect } from '../../utils/types'
import { Icons } from '../icons'
import { CSSTransition } from 'react-transition-group'

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
  const transitionRef = useRef(null)

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
        <div tw="relative z-10 flex h-8 w-full cursor-pointer items-center rounded border border-gray-300 px-3 text-sm font-semibold uppercase transition-all hover:border-slate-500 dark:bg-gray-700 dark:bg-transparent dark:text-gray-100 dark:hover:border-gray-500 dark:hover:bg-transparent">
          <div tw="w-full truncate">{activeTitle}</div>
        </div>
      </div>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="dropdown"
        nodeRef={transitionRef}
        unmountOnExit
      >
        <>
          {open && (
            <ul
              tw="absolute z-10 mt-[6px] flex max-h-[160px] flex-col overflow-hidden overflow-y-auto rounded border bg-white dark:border-gray-700 dark:bg-gray-700"
              css={[{ width: widthRef.current?.offsetWidth }]}
              ref={transitionRef}
            >
              {options &&
                options.map(
                  (option, index) =>
                    option !== activeTitle && (
                      <li
                        tw="flex h-10 shrink-0 cursor-pointer items-center justify-between gap-2 border-b px-4 text-sm font-semibold uppercase transition-all last:border-[0] hover:bg-slate-100 dark:border-gray-primary-700 dark:text-white dark:hover:bg-gray-800"
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
                  tw="flex h-10 shrink-0 cursor-pointer items-center justify-center  px-6 text-sm font-semibold uppercase transition-all hover:bg-slate-100 dark:border-gray-primary-700 dark:text-white dark:hover:bg-gray-800"
                  onClick={() => handleReset()}
                >
                  Reset
                </li>
              )}
            </ul>
          )}
        </>
      </CSSTransition>
    </div>
  )
}

export default Select
