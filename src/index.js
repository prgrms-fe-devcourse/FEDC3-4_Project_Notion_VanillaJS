import request from './api/index.js';
import App from './components/App.js';

const $target = document.querySelector('#app');

new App({ $target });

async function getRequestTest() {
  const temp = await request('documents');

  console.log(temp);
}

getRequestTest();
