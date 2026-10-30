import './sources.css';
import type { NewsSource } from '../../../types/news';

class Sources {
    draw(data: NewsSource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            throw new Error('Source item template was not found');
        }

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const name = sourceClone.querySelector<HTMLElement>('.source__item-name');
            const source = sourceClone.querySelector<HTMLElement>('.source__item');

            if (name && source) {
                name.textContent = item.name;
                source.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources');

        if (!sourcesContainer) {
            throw new Error('Sources container was not found');
        }

        sourcesContainer.append(fragment);
    }
}

export default Sources;
