'use client'
import tw from 'twin.macro'
import Image from 'next/image'
import { IPost } from '@/utils/types'
import { useState } from 'react'

function Post(data: IPost) {
  const [isLiked, setIsLiked] = useState(false)

  const hadnleLikeClick = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div
      tw="flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 transition-shadow duration-300 hover:shadow-2xl dark:shadow-sky-300"
      className="group"
    >
      <a href={data.url} target="_blank" tw="relative block aspect-[16/9] w-full overflow-hidden">
        {data.urlToImage && (
          <Image
            alt="post"
            src={data.urlToImage}
            width={400}
            height={192}
            tw="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div tw="absolute right-4 top-4 z-10 h-10 w-10 shrink-0 rounded-full border-sky-500 bg-white/50 p-2">
          <Image
            alt="journal-logo"
            src={`/static/images/journals/${data.journal}-sm.png`}
            width={24}
            height={24}
            tw="h-full w-full object-contain"
          />
        </div>
      </a>
      <div tw="flex grow flex-col p-4 lg:p-6">
        <div tw="mb-1 text-xs font-medium tracking-wide text-gray-400">
          {data.publishedAt?.toString().split('T')[0]}
        </div>
        <a
          href={data.url}
          target="_blank"
          tw="mb-1 line-clamp-2 text-lg font-medium text-gray-900 transition-colors hover:text-sky-500 dark:text-white"
        >
          {data.title}
        </a>
        <div tw="mb-2 flex flex-wrap gap-2">
          <a
            href={data.url}
            target="_blank"
            tw="mb-1 block text-xs font-medium tracking-widest text-gray-400 transition-colors hover:text-sky-500"
          >
            CATEGORY
          </a>
          <a
            href={data.url}
            target="_blank"
            tw="mb-1 block text-xs font-medium tracking-widest text-gray-400 transition-colors hover:text-sky-500"
          >
            CATEGORY
          </a>
          <a
            href={data.url}
            target="_blank"
            tw="mb-1 block text-xs font-medium tracking-widest text-gray-400 transition-colors hover:text-sky-500"
          >
            CATEGORY
          </a>
        </div>
        <p tw="mb-4 line-clamp-3 leading-relaxed">{data.description}</p>
        <div tw="mt-auto flex flex-wrap items-center justify-between">
          <a
            href={data.url}
            target="_blank"
            tw="hover:svg:translate-x-2 inline-flex items-center text-sky-500 md:mb-2 lg:mb-0"
          >
            Read More
            <svg
              tw="ml-2 h-4 w-4 transition-transform"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
          <div tw="cursor-pointer" onClick={hadnleLikeClick}>
            <span
              tw="block text-transparent transition-all hover:scale-110"
              css={[isLiked && tw`text-sky-500 animate-like`]}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <g
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  transform="translate(2.5 3)"
                  tw="stroke-sky-300"
                >
                  <path d="M9.26100981 17.8537669C7.09039739 16.5178915 5.07111022 14.9456454 3.2392904 13.1651694 1.95143752 11.8829466.9710055 10.3197719.373096631 8.59538613-.702856235 5.25030481.553929046 1.42082647 4.07111951.287520227 5.91961305-.307565201 7.93844933.0325524403 9.49609195 1.20147687L9.49609195 1.20147687C11.0543328.0339759987 13.0724617-.306022468 14.9210644.287520227 18.4382548 1.42082647 19.7040817 5.25030481 18.6281289 8.59538613 18.03022 10.3197719 17.049788 11.8829466 15.7619351 13.1651694 13.9301153 14.9456454 11.9108281 16.5178915 9.7402157 17.8537669L9.50513357 18 9.26100981 17.8537669zM13.2393229 4.0530216C14.3046302 4.39332197 15.061552 5.34972367 15.1561465 6.47500671" />
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
