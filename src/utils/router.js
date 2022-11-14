export const handleLocationChange = (e, route) => {
  const { href } = e.detail;
  const { pathname } = window.location;

  if (pathname === href) return;

  window.history.pushState(null, null, href);
  route();
};

export const navigate = (url) => {
  const locationChangeEvent = new CustomEvent("onChangeLocation", {
    composed: true,
    detail: {
      href: url,
    },
  });
  window.dispatchEvent(locationChangeEvent);
};
