import axios from 'axios'
import { DataNewsAPI, ItemDataNewsAPI } from './types'

const getNewsApi = async () => {
  const uri = `https://newsapi.org/v2/top-headlines?country=us&apiKey=5b5b235fe6084146a96b7eeed0d127d4`

  try {
    const response = await axios.get(uri)
    const result: DataNewsAPI = await response.data

    return result.articles.map((item: ItemDataNewsAPI) => ({
      title: item.title,
      description: item.description,
      imgLink: item.urlToImage,
      link: item.url,
      date: item.publishedAt,
      journal: 'newsapi',
    }))
  } catch (error) {
    console.log(error)
  }
}

export default getNewsApi