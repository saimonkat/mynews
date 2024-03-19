import axios from 'axios'
import { TheGuardian, ItemTheGuardian } from './types'

const getTheGuardian = async () => {
  const uri =
    `https://content.guardianapis.com/search?show-fields=headline,standfirst,thumbnail,short-url&api-key=${process.env.NEXT_PUBLIC_THE_GUARDIAN_API_TOKEN}`
  try {
    const response = await axios.get(uri)
    const result: TheGuardian = response.data.response

    return result.results.map((item: ItemTheGuardian) => ({
      title: item.webTitle,
      description: item.fields.standfirst,
      img: item.fields.thumbnail,
      url: item.webUrl,
      date: item.webPublicationDate,
      author: item.fields.byline,
      journal: 'theguardian',
    }))
  } catch (error) {
    console.log(error)
  }
}

export default getTheGuardian
