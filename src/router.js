const ROUTE_CHANGE_EVENT_NAME = "route-change";

export default function Router() {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.initRouter = (onRoute) => {
    window.addEventListener(ROUTE_CHANGE_EVENT_NAME, (e) => {
      const { nextUrl } = e.detail;

      if (nextUrl) {
        history.pushState(null, null, nextUrl);
        onRoute();
      }
    });
  };

  this.push = (nextUrl) => {
    window.dispatchEvent(
      new CustomEvent(ROUTE_CHANGE_EVENT_NAME, {
        detail: {
          nextUrl,
        },
      })
    );
  };
}
