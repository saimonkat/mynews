export interface ItemDataNewsAPI {
  title: string
  url: string
  urlToImage: string
  description: string
  publishedAt: string
}

export interface DataNewsAPI {
  articles: ItemDataNewsAPI[]
}
