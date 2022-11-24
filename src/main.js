import App from "./component/App.js";

const $app = document.querySelector("#app");
$app.style.display = "flex";

new App({
  $target: $app,
});
