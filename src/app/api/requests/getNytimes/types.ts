interface MediaNytimes {
    url: string;
}

export interface ItemNytimes {
    title: string
    abstract: string
    url: string
    created_date: string
    multimedia: MediaNytimes[],
    byline: string
}

export interface Nytimes {
    results: ItemNytimes[]
}