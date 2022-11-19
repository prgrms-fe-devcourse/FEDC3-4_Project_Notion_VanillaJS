import { EVENT } from './utils/constants.js';

export const initRouter = (onRoute) => {
  window.addEventListener(EVENT.ROUTECHANGE, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(EVENT.ROUTECHANGE, {
      detail: {
        nextUrl,
      },
    }),
  );
};
