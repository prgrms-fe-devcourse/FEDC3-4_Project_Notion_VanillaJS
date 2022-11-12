const ROUTE_CHANGE_EVENT_NAME = 'route-change';

const initRouter = (onRoute) => {
	window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (event) => {
		const { nextUrl } = event.detail;

		if (nextUrl) {
			history.pushState('hello', null, nextUrl);
			onRoute();
		}
	});
};

const push = (nextUrl) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
			detail: {
				nextUrl,
			},
		})
	);
};

export { initRouter, push };
