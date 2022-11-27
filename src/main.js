import App from "./App.js";

const $target = document.querySelector("#app");

new App({
  $bodyPage: $target,
  initialState: {
    curEdit: {
      id: null,
      title: "",
      content: "",
      documents: [],
    },
  },
});
