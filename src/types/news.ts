export enum ApiStatus {
    Ok = 'ok',
    Error = 'error',
}

export interface NewsSource {
    id: string;
    name: string;
}

export type ReadonlyNewsSource = Readonly<NewsSource>;

export type NewsSourcePreview = Pick<NewsSource, 'id' | 'name'>;

export type NewsArticleUpdate = Partial<NewsArticle>;

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
    status: ApiStatus;
    sources: NewsSource[];
}

export interface NewsResponse {
    status: ApiStatus;
    totalResults: number;
    articles: NewsArticle[];
}

export function updateArticle(article: NewsArticle, updates: NewsArticleUpdate): NewsArticle {
    return {
        ...article,
        ...updates,
    };
}
