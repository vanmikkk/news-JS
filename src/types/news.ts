export interface NewsSource {
    id: string;
    name: string;
}

export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: string;
    sources: NewsSource[];
}

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}
