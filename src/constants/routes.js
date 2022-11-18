import MainPage from "../pages/MainPage.js";
import NotFound from "../pages/NotFoundPage.js";

const HISTORY_CHANGE = "historychange";
const POP_STATE = "popstate";

const routes = [
  { path: /^\/$/, element: MainPage },
  { path: /^\/documents\/new/, element: MainPage },
  { path: /^\/documents\/[0-9+]/, element: MainPage },
  { path: /^\/404$/, element: NotFound },
];

export { HISTORY_CHANGE, POP_STATE, routes };
