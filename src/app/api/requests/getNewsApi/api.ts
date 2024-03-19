import axios from 'axios'
import { DataNewsAPI, ItemDataNewsAPI } from './types'

const getNewsApi = async () => {
  const uri = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_TOKEN}`

  try {
    const response = await axios.get(uri)
    const result: DataNewsAPI = await response.data

    return result.articles.map((item: ItemDataNewsAPI) => ({
      title: item.title,
      description: item.description,
      img: item.urlToImage,
      url: item.url,
      date: item.publishedAt,
      author: item.author,
      journal: 'newsapi',
    }))
  } catch (error) {
    console.log(error)
  }
}

export default getNewsApi