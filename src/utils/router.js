// todo : popstate 이벤트 추가해서 뒤로가기, 앞으로가기 해도 반응할 수 있도록 구현

const ROUTE_CHANGE_EVENT_NAME = 'route-change';

const initRouter = (onRoute) => {
	window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (event) => {
		const { nextUrl, action } = event.detail;

		if (nextUrl && action === 'historyPush') {
			history.pushState(null, null, nextUrl);
			onRoute();
		}

		if (nextUrl && action === 'historyReplace') {
			history.replaceState(null, null, nextUrl);
		}
	});
};

const historyPush = (nextUrl) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
			detail: {
				nextUrl,
				action: 'historyPush',
			},
		})
	);
};

const historyReplace = (nextUrl) => {
	window.dispatchEvent(
		new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
			detail: {
				nextUrl,
				action: 'historyReplace',
			},
		})
	);
};

export { ROUTE_CHANGE_EVENT_NAME, initRouter, historyPush, historyReplace };
