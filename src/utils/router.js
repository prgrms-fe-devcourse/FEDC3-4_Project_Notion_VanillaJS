import { EVENT } from "./constants.js";

export const initRouter = (onRoute) => {
  window.addEventListener(EVENT.CHANGE_ROUTE, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(EVENT.CHANGE_ROUTE, {
      detail: {
        nextUrl,
      },
    })
  );
};
