import App from './App.js';
import * as dotenv from 'dotenv';
dotenv.config();
console.log(process.env.API_END_POINT);

const $app = document.querySelector('.app');
$app.className = 'h-screen grid grid-cols-5';

new App({ $app });
