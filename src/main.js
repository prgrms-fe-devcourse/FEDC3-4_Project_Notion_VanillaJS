import App from "./App.js";

const $target = document.querySelector("#app");

const $pageTitle = document.createElement("h1");
$pageTitle.textContent = "민형's Notion";

const $homePageLink = document.createElement("a");
$homePageLink.href = "/index.html";

$homePageLink.appendChild($pageTitle);

$target.appendChild($homePageLink);

new App({
  $bodyPage: $target,
});
