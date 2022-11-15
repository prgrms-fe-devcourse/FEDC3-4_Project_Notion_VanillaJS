import App from './app.js';
import { STORAGE_KEY } from './utils/constants.js';
import { getItem } from './utils/storage.js';

const root = document.querySelector('#root');
const openedDocuments = getItem(STORAGE_KEY.OPENED_DOCUMENTS, []);

new App({
  target: root,
  initialState: {
    openedDocuments,
    documents: [],
    document: {},
  },
});
