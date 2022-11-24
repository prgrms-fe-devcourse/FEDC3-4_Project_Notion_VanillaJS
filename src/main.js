import App from './App.js ';
import Editor from './components/Editor.js';
import { getItem, setItem } from './storage.js';

const $app = document.querySelector('#app');

// new App({ $target: $app });

const TEMP_POST_SAVE_KEY = 'temp-post';
const post = getItem(TEMP_POST_SAVE_KEY, { title: '', content: '' });
let timer = null;
new Editor({
  $target: $app,
  props: {
    ...post,
    onEdit: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        // TODO 추후에 id 값 넣어서 저장해줘야 할지
        setItem(TEMP_POST_SAVE_KEY, { ...post, tempSaveDate: new Date() });
      }, 1000);
    },
  },
});
