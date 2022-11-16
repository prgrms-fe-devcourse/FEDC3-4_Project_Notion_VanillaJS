const ROUTE_CHANGE_EVENT_NAME = 'routeChange';

export const initRouter = ({ router }) => {
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, ({ detail }) => {
        const { nextUrl } = detail;
        if (nextUrl) {
            history.pushState(null, null, nextUrl);
            router();
        }
    });
}

export const push = ({ nextUrl }) => {
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
        detail: { nextUrl }
    }));
}
