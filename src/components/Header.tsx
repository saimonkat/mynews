'use client'
import 'twin.macro'
import Link from 'next/link'
import ThemeToggler from '@/components/ThemeToggler'
import { Logo } from './Logo'

const Header = () => {
  return (
    <header tw="sticky top-0 z-40 w-full flex-none bg-white/60 backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] dark:bg-transparent">
      <div tw="container mx-auto flex justify-between p-4">
        <Logo />
        <ul tw="ml-auto flex items-center justify-center gap-5">
          <li>
            <Link href="/" tw="hover:text-sky-500 dark:hover:text-sky-400">
              News
            </Link>
          </li>
          <li>
            <Link href="/profile" tw="hover:text-sky-500 dark:hover:text-sky-400">
              Profile
            </Link>
          </li>
        </ul>
        <ThemeToggler />
      </div>
    </header>
  )
}

export default Header
