import App from './App.js';

console.log(process.env.API_END_POINT);
console.log(process.env);

const $app = document.querySelector('.app');
$app.className = 'h-screen grid grid-cols-5';

new App({ $app });
