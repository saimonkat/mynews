export interface IJournal {
  title: string
  onJournalChange: (journal: string) => void;
}

export interface IPost {
  id?: string
  title?: string
  publishedAt?: string
  tags?: string[]
  description?: string | undefined
  date?: string
  img?: string
  author?: string
  journal: string
  url?: string
}

export interface INews {
  post: IPost
}

export interface ISelect {
  options?: string[];
  title?: string
  setActiveOption?: (value: string) => void
  shouldReset?: boolean
  hasResetOption?: boolean
}

export interface ISearch {
  value?: string
  updateValue: (value: string) => void
  shouldReset?: boolean
  placeholder?:string
}