import MainPage from "../pages/MainPage.js";
import NotFound from "../pages/NotFound.js";

const HISTORY_CHANGE_EVENT_NAME = "historychange";
const routes = [
  { path: /^\/$/, element: MainPage },
  { path: /^\/documents\/new/, element: MainPage },
  { path: /^\/documents\//, element: MainPage },
  { path: /^\/404$/, element: NotFound },
];

export { HISTORY_CHANGE_EVENT_NAME, routes };
