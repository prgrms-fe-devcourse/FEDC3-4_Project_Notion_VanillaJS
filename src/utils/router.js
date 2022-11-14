const ROUTE_CHANGE_EVENT_NAME = 'route-change';

const initRouter = (onRoute) => {
	window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (event) => {
		const { nextUrl, action } = event.detail;

		if (nextUrl && action === 'push') {
			history.pushState(null, null, nextUrl);
			onRoute();
		}

		if (nextUrl && action === 'replace') {
			history.replaceState(null, null, nextUrl);
			onRoute();
		}
	});
};

const push = (nextUrl) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
			detail: {
				nextUrl,
				action: 'push',
			},
		})
	);
};

const replace = (nextUrl) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
			detail: {
				nextUrl,
				action: 'replace',
			},
		})
	);
};

export { ROUTE_CHANGE_EVENT_NAME, initRouter, push, replace };
