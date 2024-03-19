interface FieldsTheGuardian {
  headline: string
  shortUrl: string
  standfirst: string
  thumbnail: string
  byline: string
}

export interface ItemTheGuardian {
  webUrl: string
  webTitle: string
  fields: FieldsTheGuardian
  webPublicationDate: string
}

export interface TheGuardian {
  results: ItemTheGuardian[]
}
