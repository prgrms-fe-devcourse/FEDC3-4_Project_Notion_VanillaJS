import App from "./component/App.js";
import { request } from "./utils/api.js";

const $app = document.querySelector("#app");
$app.style.display = "flex";

const tempData = await request("documents", {
  method: "GET",
});

new App({
  $target: $app,
  initialState: tempData,
});
