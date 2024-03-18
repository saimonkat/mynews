'use client'
import 'twin.macro'
import Image from 'next/image'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

interface IMainProps {
  children: React.ReactNode
}

const queryClient = new QueryClient()

function Main({ children }: IMainProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <Gradient />
        <div tw="container mx-auto px-4 py-10">{children}</div>
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function Gradient() {
  return (
    <div tw="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center overflow-hidden">
      <div tw="flex w-[108rem] flex-none justify-end">
        <Image
          alt="bg-gradient"
          src="/static/images/bg-gradient.png"
          width={1000}
          height={300}
          tw="w-[71.75rem] max-w-none flex-none dark:hidden"
        />
        <Image
          alt="bg-gradient"
          src="/static/images/bg-gradient-dark.png"
          width={256}
          height={128}
          tw="hidden w-[71.75rem] max-w-none flex-none dark:block"
        />
      </div>
    </div>
  )
}

export default Main
