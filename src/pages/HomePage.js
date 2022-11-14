import { $home } from "../utils/templates.js";
import PostEdit from "../components/PostEdit.js";
import PostsPage from "../components/PostsPage.js";
import { request } from "../api/api.js";
import { initRouter } from "../routes/router.js";

export default function HomePage({ $target }) {
	const $homePage = document.createElement("div");

	$target.appendChild($homePage);

	this.render = () => {
		$homePage.innerHTML = $home();
	};

	this.render();

	// this.init = () => {
	// 	const { pathname } = window.location;
	// 	if (pathname === "/") {
	// 		postsPage.setState();
	// 		// $postEditContainer.innerHTML = $home();
	// 	} else if (pathname.indexOf("/documents/") === 0) {
	// 		const [, , id] = pathname.split("/");
	// 		if (id === "new") {
	// 			postEdit.setState({
	// 				...this.state,
	// 				id,
	// 			});
	// 			postsPage.setState();
	// 		} else {
	// 			postsPage.setState();
	// 		}
	// 	}
	// };
	// this.init();
	// initRouter(() => this.init());

	// window.addEventListener("popstate", () => {
	// 	this.init();
	// });
}
