'use client'
import 'twin.macro'
import { Icons } from '../icons'

interface PaginationProps {
  totalPages: number
  currentPage: number
  setCurrentPage: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, setCurrentPage }) => {
  return (
    <div tw="mt-10 flex justify-center">
      <nav tw="relative">
        {currentPage > 1 && (
          <button
            tw="absolute -left-4 top-1/2 -translate-x-full -translate-y-1/2 p-2 transition-colors hover:text-sky-500"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <Icons.Arrow tw="w-4 rotate-180" />
          </button>
        )}
        <span tw="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages && (
          <button
            tw="absolute -right-4 top-1/2 -translate-y-1/2 translate-x-full p-2 transition-colors hover:text-sky-500"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <Icons.Arrow tw="w-4" />
          </button>
        )}
      </nav>
    </div>
  )
}

export default Pagination
