import { ROUTE_CHANGE_NAME } from './util.js';

export const initRouter = onRoute => {
  window.addEventListener(ROUTE_CHANGE_NAME, e => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const route = nextUrl => {
  if (nextUrl) {
    window.dispatchEvent(
      new CustomEvent(ROUTE_CHANGE_NAME, {
        detail: {
          nextUrl,
        },
      }),
    );
  }
};

