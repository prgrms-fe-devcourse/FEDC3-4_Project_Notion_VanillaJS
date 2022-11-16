import App from './App.js';
import LIST_API from './api/documentApi.js';
import { $ } from './util/index.js';

function Main() {

    this.init = async () => {

        try {
            const $main = $({ selector: 'main' });

            const app = new App({
                $target: $main,
                initialState: await LIST_API.getAllDocuments(),
            });

            app.render();

        } catch (e) {
            alert(e.message);
            console.error(e.message);
        }
    }

};

const main = new Main();
main.init();
