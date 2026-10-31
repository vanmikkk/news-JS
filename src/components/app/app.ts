import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    public constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesElement = document.querySelector('.sources');

        if (!sourcesElement) {
            throw new Error('Sources element was not found');
        }

        sourcesElement.addEventListener('click', (event: Event) => {
            this.controller.getNews(event, (data) => this.view.drawNews(data));
        });

        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
