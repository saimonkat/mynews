'use client'
import 'twin.macro'
import React from 'react'
import { useEffect, useState } from 'react'
import { ISearch } from '../../utils/types'
import { Icons } from '../icons'

const Search: React.FC<ISearch> = ({ updateValue, shouldReset }) => {
  const [value, setValue] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateValue(value)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleReset = () => {
    setValue('')
    updateValue && updateValue('')
  }

  useEffect(() => {
    if (shouldReset) handleReset()
  }, [shouldReset])

  return (
    <form tw="relative mx-auto h-8 w-full max-w-[390px]" onSubmit={handleSubmit}>
      <input
        tw="h-full w-full rounded border border-gray-300 bg-transparent pl-3 pr-14 outline-none transition-colors focus:border-sky-500 lg:w-48 dark:text-white"
        value={value}
        onChange={handleChange}
      ></input>
      {value !== '' && (
        <button
          type="button"
          onClick={handleReset}
          tw="absolute right-8 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform hover:scale-110 dark:text-white"
        >
          <Icons.Cross />
        </button>
      )}
      <button
        type="submit"
        tw="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transition-transform hover:scale-110 dark:text-white"
      >
        <Icons.Loupe />
      </button>
    </form>
  )
}

export default Search
