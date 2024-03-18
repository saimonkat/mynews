'use client'
import 'twin.macro'
import { ReactNode, useState } from 'react'
import Category from '../category/Category'
import Post from '../post/Post'
import useContent from '@/app/api/utils/createContent/api'
import Pagination from '../pagination/Pagination'
import Select from '@/ui/select'
import { selectData } from '@/helpers/selectProps'
import { IContent } from '@/utils/types'

const News = () => {
  const { combinedData, isLoading, isError, error } = useContent()

  const initialJournals = ['newsapi', 'nytimes', 'theguardian']
  const [activeJournals, setActiveJournals] = useState<string[]>(initialJournals)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const handleCategoryChange = (journal: string) => {
    setActiveJournals(prevJournals =>
      prevJournals.includes(journal)
        ? prevJournals.filter(j => j !== journal)
        : [...prevJournals, journal],
    )
  }
  const [sortOrder, setSortOrder] = useState<string>('Newest first')

  if (isLoading) {
    return <div tw="text-gray-400">Loading...</div>
  }

  if (isError) {
    return <div tw="text-gray-400">{error as ReactNode}</div>
  }

  const sortBydate = (a: IContent, b: IContent) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'Newest first' ? dateB - dateA : dateA - dateB
  }

  const filteredSortedData = combinedData
    .filter(data => activeJournals.includes(data.journal) && data.imgLink)
    .sort(sortBydate)

  const totalPages = Math.ceil(filteredSortedData.length / itemsPerPage)
  const indexLastPost = currentPage * itemsPerPage
  const indexFirstPost = indexLastPost - itemsPerPage
  const currentPosts = filteredSortedData.slice(indexFirstPost, indexLastPost)

  return (
    <>
      <section tw="text-gray-600">
        <h1 tw="sr-only">News</h1>
        <div tw="container mx-auto">
          <div tw="mb-5 flex justify-center gap-2 lg:mb-10 lg:gap-6">
            {initialJournals.map(journal => (
              <li key={journal} tw="list-none">
                <Category journal={journal} onCategoryChange={handleCategoryChange} />
              </li>
            ))}
          </div>
          <div tw="flex">
            <div tw="flex">
              <Select
                options={selectData.options}
                width={selectData.width}
                title={selectData.title}
                setActiveOption={setSortOrder}
              />
            </div>
          </div>
          <ul tw="-m-2 flex flex-wrap lg:-m-4">
            {currentPosts.map(data => (
              <li key={data.title} tw="p-2 md:w-1/2 lg:w-1/3 lg:p-4">
                <Post
                  title={data.title}
                  description={data.description}
                  publishedAt={data.date}
                  url={data.link}
                  urlToImage={data.imgLink}
                  journal={data.journal}
                />
              </li>
            ))}
          </ul>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </section>
    </>
  )
}

export default News
