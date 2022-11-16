import { EVENT } from "./constants.js";

export const addEvent = {
  updateState(callback) {
    window.addEventListener(EVENT.UPDATE_ROOT_DOCUMENT_STATE, () => {
      callback();
    });
  },
  initRouter(callback) {
    window.addEventListener(EVENT.CHANGE_ROUTE, (e) => {
      const { nextUrl } = e.detail;

      if (nextUrl) {
        history.pushState(null, null, nextUrl);
        callback();
      }
    });
  },
};

export const customEvent = {
  updateState() {
    window.dispatchEvent(new CustomEvent(EVENT.UPDATE_ROOT_DOCUMENT_STATE));
  },
  push(nextUrl) {
    window.dispatchEvent(
      new CustomEvent(EVENT.CHANGE_ROUTE, {
        detail: {
          nextUrl,
        },
      })
    );
  },
};
