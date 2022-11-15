import App from './Components/App/App.js';

const $app = document.querySelector('.app');
$app.className = 'h-screen grid grid-flow-col';

new App({
  $target: $app,
});
