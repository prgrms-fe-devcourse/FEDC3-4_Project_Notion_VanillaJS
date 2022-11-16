import MainPage from "../pages/MainPage.js";

const HISTORY_CHANGE_EVENT_NAME = "historychange";
const routes = [{ path: /^\/$/, element: MainPage }];

export { HISTORY_CHANGE_EVENT_NAME, routes };
