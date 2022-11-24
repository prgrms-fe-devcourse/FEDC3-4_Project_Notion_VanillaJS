import App from './App.js ';
import PostEditPage from './pages/PostEditPage.js';

const $app = document.querySelector('#app');

// new App({ $target: $app });

const postEditPage = new PostEditPage({
  $target: $app,
  props: { postId: 61994 },
});
postEditPage.render();
