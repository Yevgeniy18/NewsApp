export interface NewsArticle {
  id: string;
  webTitle: string;
  datePublished: string;
  apiUrl: string;
  fields?: {
    thumbnail: string;
  };
}

export interface NewResponse {
  response: {
    results: NewsArticle[];
  };
}

export interface SearchData {
  query: string;
  items: string;
  sortBy: string;
}

export interface ArticleDetail {
  headline: string;
  firstPublicationDate: string;
  bodyText: string;
}
