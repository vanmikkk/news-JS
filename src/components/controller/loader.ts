interface RequestOptions {
    [key: string]: string;
}

interface RequestConfig {
    endpoint: string;
    options?: RequestOptions;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    public constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>({ endpoint, options = {} }: RequestConfig, callback: (data: T) => void): void {
        this.load<T>('GET', endpoint, callback, options);
    }

    private errorHandler(response: Response): Response {
        if (!response.ok) {
            if (response.status === 401 || response.status === 404) {
                console.log(`Sorry, but there is ${response.status} error: ${response.statusText}`);
            }

            throw new Error(response.statusText);
        }

        return response;
    }

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        const url = new URL(endpoint, this.baseLink);

        Object.entries(urlOptions).forEach(([key, value]) => {
            url.searchParams.set(key, value);
        });

        return url.toString();
    }

    private load<T>(
        method: HttpMethod,
        endpoint: string,
        callback: (data: T) => void,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then((response) => this.errorHandler(response))
            .then((response) => response.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((error: unknown) => console.error(error));
    }
}

export default Loader;
