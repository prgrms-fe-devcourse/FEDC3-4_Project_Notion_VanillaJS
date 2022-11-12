const ROUTE_CHANGE_EVENT_NAME = 'route-change';

export const initRouter = (onRoute) => {
	window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (event) => {
		const { nextUrl } = event.detail;

		if (nextUrl) {
			history.pushState(null, null, nextUrl);
      // 이렇게 콜백으로 해줘야 this가 전달되어서 App의 route를 실행시킬 수 있다.
			onRoute();
		}
	});
};

export const push = (nextUrl) => {
  window.dispatchEvent(new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
    detail: {
      nextUrl
    }
  }))
};
