import App from "./App.js";

const $target = document.querySelector("#app");

const $pageTitle = document.createElement("h1");
$pageTitle.textContent = "민형's Notion";

$target.appendChild($pageTitle);

new App({
  $bodyPage: $target,
});
