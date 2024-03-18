import React from 'react'
import tw from 'twin.macro'
import { useEffect, useRef, useState } from 'react'
import { SelectProps } from '../utils/types'
import { Icons } from '../components/icons'
import { CSSTransition } from 'react-transition-group'

const Select: React.FC<SelectProps> = ({ options, title, width, setActiveOption }) => {
  const [open, setOpen] = useState<boolean>(false)
  const widthRef = useRef<HTMLDivElement | null>(null)
  const selectRef = useRef<HTMLDivElement>(null)
  const [activeTitle, setActiveTitle] = useState<string>(title || 'custom select')
  const transitionRef = useRef(null)

  const handleOpenSelect = () => {
    setOpen(prev => !prev)
  }

  const handleSetActive = (event: string) => {
    setOpen(prev => !prev)
    setActiveTitle(event)
    if (setActiveOption) {
      setActiveOption(event)
    }
  }

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
    <div ref={selectRef}>
      <div
        ref={widthRef}
        onClick={handleOpenSelect}
        css={[
          tw`rounded flex bg-blue-primary-100 relative overflow-hidden`,
          {
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to right, #54f4df, #2ab6fd)',
              opacity: open ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            },
            '&:hover::after': {
              opacity: 1,
            },
          },
          {
            width: width ?? 'auto',
          },
        ]}
      >
        <div tw="p-[1px]">
          <div
            css={[
              tw`relative flex justify-center items-center uppercase cursor-pointer transition-all text-gray-primary-900 h-[34px] rounded bg-gray-primary-700 hover:bg-blue-primary-500 z-10 font-semibold text-sm`,
              {
                width: width ? `${width - 2}px` : 'auto',
              },
            ]}
          >
            {activeTitle}
          </div>
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
              ref={transitionRef}
              css={[
                tw`flex flex-col border border-blue-primary-100 bg-gray-primary-700 rounded absolute mt-[6px] overflow-hidden z-10`,
                { width: widthRef.current?.offsetWidth },
              ]}
            >
              {options &&
                options.map((optionItem, index) => (
                  <li
                    tw="text-gray-primary-100 border-gray-primary-500 flex h-[44px] cursor-pointer items-center justify-between border-b px-6 text-sm font-semibold uppercase transition-all last:border-[0] hover:bg-blue-primary-500"
                    key={index}
                    onClick={() => handleSetActive(optionItem.option)}
                  >
                    {optionItem.option} <Icons.Arrow />
                  </li>
                ))}
            </ul>
          )}
        </>
      </CSSTransition>
    </div>
  )
}

export default Select
