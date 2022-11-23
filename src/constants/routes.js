import MainPage from "../pages/MainPage.js";
import NotFoundPage from "../pages/NotFoundPage.js";

const HISTORY_CHANGE = "historychange";
const POP_STATE = "popstate";

const routes = [
  { path: /^\/$/, page: MainPage },
  { path: /^\/documents\/new/, page: MainPage },
  { path: /^\/documents\/[0-9+]/, page: MainPage },
  { path: /^\/404$/, page: NotFoundPage },
];

export { HISTORY_CHANGE, POP_STATE, routes };
