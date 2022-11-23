import App from "./App.js";
import { navigate } from "./utils/navigate.js";

const $app = document.querySelector("#app");

try {
  new App({
    $target: $app,
  });
} catch (e) {
  console.error(e);
  navigate("/");
}
