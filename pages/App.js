import SideBar from "../components/SideBar/SideBar.js";
import Content from "../components/Content/Content.js";
import { initRouter } from "../utils/router.js";

export default function App({ $target }) {
  const $layout = document.createElement("div");
  $layout.classList.add("layout-main");

  const sideBar = new SideBar({
    $target: $layout,
  });
  const content = new Content({
    $target: $layout,
    initialState: {
      documentId: "new",
    },
  });

  this.route = async () => {
    $target.innerHTML = ``;

    const { pathname } = window.location;

    if (pathname === "/") {
      await sideBar.setState();
      await content.setState({ documentId: "new" });
    } else if (pathname.indexOf("/documents/" === 0)) {
      const [, , documentId] = pathname.split("/");

      await sideBar.setState();
      await content.setState({ documentId });
    }

    $target.appendChild($layout);
  };

  this.route();

  initRouter(() => this.route());
}
