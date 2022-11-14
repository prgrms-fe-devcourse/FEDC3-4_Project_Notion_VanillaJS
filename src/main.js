import App from "./App.js";
import Editor from "./components/Editor.js";

const $target = document.querySelector("#app");

// new App({ $target });

new Editor({
  $target,
  initialState: {
    title: "노션 클로닝을 하자",
    content: "아좌좌",
  },
});
