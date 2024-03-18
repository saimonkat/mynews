import axios from 'axios'
import { TheGuardian, ItemTheGuardian } from './types'

const getTheGuardian = async () => {
  const uri =
    'https://content.guardianapis.com/search?show-fields=headline,standfirst,thumbnail,short-url&api-key=9106a940-333a-4248-ab12-d206689496d9'
  try {
    const response = await axios.get(uri)
    const result: TheGuardian = response.data.response

    return result.results.map((item: ItemTheGuardian) => ({
      title: item.webTitle,
      description: item.fields.standfirst,
      imgLink: item.fields.thumbnail,
      link: item.apiUrl,
      date: item.webPublicationDate,
      journal: 'theguardian',
    }))
  } catch (error) {
    console.log(error)
  }
}

export default getTheGuardian
