import axios from 'axios'
import { Nytimes, ItemNytimes } from './types'

const getNytimes = async () => {
  const uri = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NEXT_PUBLIC_NEW_YORK_TIMES_API_TOKEN}`

  try {
    const response = await axios.get<Nytimes>(uri)
    const results = response.data.results

    return results.map((item: ItemNytimes) => ({
      title: item.title,
      description: item.abstract,
      img: item.multimedia?.length > 0 ? item.multimedia[0].url : '',
      url: item.url,
      date: item.created_date,
      author: item.byline,
      journal: 'nytimes',
    }))
  } catch (error) {
    console.error(error)
  }
}

export default getNytimes
