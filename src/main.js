import App from './App.js';

const $app = document.querySelector('.app');
$app.className = 'h-screen grid grid-cols-5';

new App({ $app });
