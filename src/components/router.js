const ROUTE_CHANGE = "route-change";
export const ROOT = "/";

export const initRouter = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE, (e) => {
    const { nextURL } = e.detail;

    if (!nextURL) return;

    history.pushState(null, null, nextURL);

    onRoute();
  });
};

export const push = (nextURL) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE, {
      detail: {
        nextURL
      },
    })
  );
};
