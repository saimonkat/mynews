import axios from 'axios'
import { Nytimes, ItemNytimes } from './types'

const getNytimes = async () => {
  const uri = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=erGvi3c9s7gOyixTqGB4onxgNoGlaPJy`

  try {
    const response = await axios.get<Nytimes>(uri)
    const results = response.data.results

    return results.map((item: ItemNytimes) => ({
      title: item.title,
      description: item.abstract,
      imgLink: item.multimedia.length > 0 ? item.multimedia[0].url : '',
      link: item.url,
      date: item.created_date,
      journal: 'nytimes',
    }))
  } catch (error) {
    console.error(error)
  }
}

export default getNytimes
