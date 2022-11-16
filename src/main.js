import App from './App.js';

const samp = process.env.API_END_POINT;
console.log(samp);

const $app = document.querySelector('.app');
$app.className = 'h-screen grid grid-cols-5';

new App({ $app });
