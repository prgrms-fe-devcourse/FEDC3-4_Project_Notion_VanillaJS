import { request } from "./api/api.js";
import PostEdit from "./components/PostEdit.js";
import PostsPage from "./components/PostsPage.js";
import HomePage from "./pages/HomePage.js";
import { initRouter } from "./routes/router.js";
import { getItem } from "./utils/storage.js";

export default function App({ $target }) {
	const $postListContainer = document.createElement("div");
	const $homeContainer = document.createElement("div");
	const $postEditContainer = document.createElement("div");

	$homeContainer.className = "post-edit-container";
	$postListContainer.className = "post-list-container";
	$postEditContainer.className = "post-edit-container";

	$target.appendChild($postListContainer);
	$target.appendChild($homeContainer);
	$target.appendChild($postEditContainer);

	const ADD_POST_SAVE_KEY = "add-new-post";
	this.state = {
		id: "",
		title: "",
		content: "",
	};

	const postsPage = new PostsPage({
		$target: $postListContainer,
		initialState: [],
	});

	const homePage = new HomePage({
		$target: $homeContainer,
	});

	const postEdit = new PostEdit({
		$target: $postEditContainer,
		initialState: this.state,
		addPost: () => {
			postsPage.setState();
		},
	});

	this.init = async () => {
		const { pathname } = window.location;
		if (pathname === "/") {
			postsPage.setState();
			$postEditContainer.style.display = "none";
		} else if (pathname.indexOf("/documents/") === 0) {
			$postEditContainer.style.display = "flex";
			$homeContainer.style.display = "none";

			const [, , id] = pathname.split("/");
			if (id === "new") {
				postEdit.setState({
					...this.state,
					id,
				});
				postsPage.setState();
			} else {
				const post = await request(`/documents/${id}`, {
					method: "GET",
				});
				postsPage.setState();
				postEdit.setState({
					...getItem(ADD_POST_SAVE_KEY),
					post,
				});
			}
		}
	};

	this.init();
	initRouter(() => this.init());

	window.addEventListener("popstate", () => {
		this.init();
	});
}
