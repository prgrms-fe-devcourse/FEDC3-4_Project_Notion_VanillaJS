import { ACTIVE_LIST_KEY } from "../config.js";
import { request } from "./api/api.js";
import PostEdit from "./components/PostEdit.js";
import PostsPage from "./components/PostsPage.js";
import HomePage from "./pages/HomePage.js";
import { initRouter } from "./routes/router.js";
import { getItem } from "./utils/storage.js";
import NotFound from "./pages/NotFound.js";

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

	this.state = {
		id: "",
		title: "",
		content: "",
		selectedPost: {},
	};

	const postsPage = new PostsPage({
		$target: $postListContainer,
		initialState: [],
	});

	const homePage = new HomePage({
		$target: $homeContainer,
	});

	const notFound = new NotFound({
		$target,
	});

	const postEdit = new PostEdit({
		$target: $postEditContainer,
		initialState: this.state,
		addPost: (updatePost) => {
			postsPage.setState(updatePost);
		},
	});

	this.setState = (nextState) => {
		this.state = nextState;
		const selectedPost = this.state;
		postsPage.setState(selectedPost);
	};

	postsPage.setState();

	this.init = async () => {
		const { pathname } = window.location;
		if (pathname === "/") {
			$postEditContainer.style.display = "none";
			$homeContainer.style.display = "flex";
		} else if (pathname.indexOf("/documents/") === 0) {
			$postEditContainer.style.display = "flex";
			$homeContainer.style.display = "none";

			const [, , id] = pathname.split("/");
			if (id === "new") {
				postEdit.setState({
					...this.state,
					id,
				});
			} else {
				const post = await request(`/documents/${id}`, {
					method: "GET",
				});
				this.setState(post);
				postEdit.setState(post);
			}
		} else {
			notFound.render();
			$postListContainer.style.display = "none";
			$postEditContainer.style.display = "none";
			$homeContainer.style.display = "none";
		}

		// const id = getItem(ACTIVE_LIST_KEY);
	};

	this.init();
	initRouter(() => this.init());

	window.addEventListener("popstate", () => {
		this.init();
	});
}
