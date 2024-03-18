interface FieldsTheGuardian {
  headline: string
  shortUrl: string
  standfirst: string
  thumbnail: string
}

export interface ItemTheGuardian {
  apiUrl: string
  webTitle: string
  fields: FieldsTheGuardian
  webPublicationDate: string
}

export interface TheGuardian {
  results: ItemTheGuardian[]
}
