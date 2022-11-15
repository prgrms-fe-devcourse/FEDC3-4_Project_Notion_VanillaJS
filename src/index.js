import App from './components/App.js';

const $target = document.querySelector('#app');

// console.log('init render');

try {
  new App($target);
} catch (error) {
  console.error(error);
}
