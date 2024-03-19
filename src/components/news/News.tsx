'use client'
import 'twin.macro'
import { ReactNode, useEffect, useState } from 'react'
import useContent from '@/app/api/utils/createContent/api'
import { sortSelectData } from '@/helpers/selectProps'
import { IPost } from '@/utils/types'
import Post from '../post/Post'
import Journal from '../journal/Journal'
import Pagination from '../pagination/Pagination'
import Select from '../ui/Select'
import Search from '../ui/Search'

const News = () => {
  const { combinedData, isLoading, isError, error } = useContent()

  useEffect(() => {
    console.log(combinedData)
  }, [combinedData])

  const journals = ['newsapi', 'nytimes', 'theguardian']
  const [resetToken, setResetToken] = useState(0)
  const [shouldReset, setShouldReset] = useState(false)
  const [activeJournals, setActiveJournals] = useState<string[]>(journals)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<string>('')
  const [searchText, setSearchText] = useState<string>('')
  const [authors, setAuthors] = useState<string[]>([])
  const [filteredAuthor, setFilteredAuthor] = useState<string>('')
  const [filteredSortedData, setFilteredSortedData] = useState(combinedData || [])
  const [currentPosts, setCurrentPosts] = useState(combinedData || [])
  const itemsPerPage = 12

  const handleJournalChange = (journal: string) => {
    setActiveJournals(prevJournals =>
      prevJournals.includes(journal)
        ? prevJournals.filter(j => j !== journal)
        : [...prevJournals, journal],
    )
  }

  const handleResetFilters = () => {
    setActiveJournals(journals)
    setResetToken(prevToken => prevToken + 1)
    setShouldReset(true)
    setTimeout(() => setShouldReset(false), 0)
  }

  const sortByDate = (a: IPost, b: IPost) => {
    const dateA = a.date && new Date(a.date).getTime()
    const dateB = b.date && new Date(b.date).getTime()
    if (dateA && dateB) return sortOrder === 'Newest first' ? dateB - dateA : dateA - dateB
    return 0
  }

  const searchByText = (data: IPost, text: string) => {
    return (
      data.title?.toLowerCase().includes(text.toLowerCase()) ||
      data.description?.toLowerCase().includes(text.toLowerCase())
    )
  }

  useEffect(() => {
    const authors = combinedData
      .map(post => (post.author ? post.author.toLowerCase().replace('by ', '') : ''))
      .filter(author => author !== '')
    setAuthors([...new Set(authors)])
  }, [combinedData])

  useEffect(() => {
    if (!combinedData) return

    let filteredSorted = combinedData.filter(data => {
      return data.img && data.title && data.description
    })

    if (activeJournals) {
      filteredSorted = combinedData.filter(
        data => activeJournals.includes(data.journal) && data.img,
      )
    }

    if (filteredAuthor) {
      filteredSorted = filteredSorted.filter(data =>
        data.author?.toLowerCase().includes(filteredAuthor),
      )
    }

    if (searchText) {
      filteredSorted = filteredSorted.filter(data => searchByText(data, searchText))
    }

    if (sortOrder) {
      filteredSorted = filteredSorted.sort(sortByDate)
    }

    setTotalPages(Math.ceil(filteredSorted.length / itemsPerPage))
    setFilteredSortedData(filteredSorted)
    setCurrentPosts(filteredSorted.slice(0, itemsPerPage))
    setCurrentPage(1)
  }, [combinedData, activeJournals, sortOrder, filteredAuthor, searchText])

  useEffect(() => {
    const indexLastPost = currentPage * itemsPerPage
    const indexFirstPost = indexLastPost - itemsPerPage

    setCurrentPosts(filteredSortedData.slice(indexFirstPost, indexLastPost))
  }, [currentPage])

  return (
    <section>
      <h1 tw="sr-only">News</h1>
      <div tw="container mx-auto">
        <div tw="relative mb-5 lg:mb-10">
          <ul tw="mb-3 flex justify-center gap-2 lg:mb-0 lg:gap-6">
            {journals.map(journal => (
              <li key={`${journal}-${resetToken}`} tw="w-1/3 lg:w-40">
                <Journal title={journal} onJournalChange={handleJournalChange} />
              </li>
            ))}
          </ul>
          <div tw="mb-3 flex justify-center gap-2 lg:absolute lg:left-0 lg:top-1/2 lg:z-20 lg:mb-0 lg:-translate-y-1/2 lg:flex-col">
            <div tw="w-48">
              <Select
                options={sortSelectData.options}
                title={sortSelectData.title}
                setActiveOption={setSortOrder}
                shouldReset={shouldReset}
              />
            </div>
            <div tw="w-48">
              <Select
                options={authors}
                title={'author'}
                setActiveOption={setFilteredAuthor}
                shouldReset={shouldReset}
                hasResetOption
              />
            </div>
          </div>
          <div tw="lg:absolute lg:right-0 lg:top-1/2 lg:z-20 lg:-translate-y-1/2">
            <Search updateValue={setSearchText} shouldReset={shouldReset} />
          </div>
        </div>
        {isLoading && <div tw="text-center text-gray-400">Loading news...</div>}
        {isError && <div tw="text-center text-gray-400">{error as ReactNode}</div>}
        {!isLoading && !isError && currentPosts.length == 0 && (
          <div tw="text-center">
            <p>No news found.</p>
            <p>
              Please change filters or{' '}
              <button tw="text-sky-500" onClick={handleResetFilters}>
                reset all filters
              </button>
            </p>
          </div>
        )}
        {!isLoading && !isError && currentPosts.length > 0 && (
          <ul tw="-m-2 flex flex-wrap lg:-m-4">
            {currentPosts.map(data => (
              <li key={data.title} tw="w-full p-2 md:w-1/2 lg:w-1/3 lg:p-4">
                <Post
                  title={data.title}
                  description={data.description}
                  publishedAt={data.date}
                  url={data.url}
                  img={data.img}
                  author={data.author}
                  journal={data.journal}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  )
}

export default News
