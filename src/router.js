const ROUTE_CHANGE_EVENT_NAME = "route-change";
const UPDATE_TEST = "move-test";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      history.pushState(null, null, nextUrl);
      onRoute();
    }
  });

  window.addEventListener(UPDATE_TEST, (e) => {
    const { nextUrl } = e.detail;

    if (nextUrl) {
      // history.replaceState(null, null, nextUrl);
      onRoute();
    }
  });
};

export const push = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
      detail: {
        nextUrl,
      },
    })
  );
};

export const update = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(UPDATE_TEST, {
      detail: {
        nextUrl,
      },
    })
  );
};
