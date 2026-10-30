import './news.css';
import type { NewsArticle } from '../../../types/news';

class News {
    draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('News item template was not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const photo = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (photo) {
                photo.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const author = newsClone.querySelector<HTMLElement>('.news__meta-author');
            if (author) author.textContent = item.author || item.source.name;

            const date = newsClone.querySelector<HTMLElement>('.news__meta-date');
            if (date) {
                date.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            newsClone.querySelector('.news__description-title')!.textContent = item.title;
            newsClone.querySelector('.news__description-source')!.textContent = item.source.name;
            newsClone.querySelector('.news__description-content')!.textContent = item.description ?? '';
            newsClone.querySelector('.news__read-more a')!.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');

        if (!newsContainer) {
            throw new Error('News container was not found');
        }

        newsContainer.innerHTML = '';
        newsContainer.appendChild(fragment);
    }
}

export default News;
