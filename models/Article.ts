export interface NewsArticle {
  id: string;
  webTitle: string;
  webPublicationDate: string;
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
  content: {
    headline: string;
    webPublicationDate: string;
    body: string;
    thumbnail: string;
  };
}

export interface ArticleProps {
  headline: string;
  webPublicationDate: string;
  body: string;
  thumbnail: string;
}
