export interface ICategory {
  journal: string
  onCategoryChange: (journal: string) => void;
}

export interface IPost {
  id?: string
  title?: string
  publishedAt?: string
  tags?: string[]
  description?: string | undefined
  urlToImage?: string
  authors?: string[] | undefined
  journal: string
  url?: string
}

export interface INews {
  post: IPost
}


interface SelectOprions {
  option: string;
}

export interface SelectProps {
  options?: SelectOprions[];
  title?: string
  contentWidth?: string
  width?:number
  setActiveOption?: (value: string) => void
}

export interface IContent {
  title: string;
  description: string;
  date: string;
  link: string;
  imgLink: string;
  journal: string;
}