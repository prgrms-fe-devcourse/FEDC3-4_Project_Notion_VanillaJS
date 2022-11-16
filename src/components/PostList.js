import { $onLoadParentList } from "../utils/templates.js";
import CreatePostModal from "./modal/CreatePostModal.js";

export default function PostList({ $target, onRemove, onPostClick, addPost }) {
	const $postList = document.createElement("div");
	$target.appendChild($postList);

	this.state = {
		posts: [],
	};

	this.setState = (nextState) => {
		this.state.posts = nextState;
		this.render();
	};

	this.render = () => {
		$postList.innerHTML = `${$onLoadParentList(this.state.posts)}`;
	};

	$postList.addEventListener("click", (e) => {
		const posts = this.state.posts;

		const $rootLi = e.target.closest(".list-flex");

		if ($rootLi.dataset.id !== undefined) {
			const { className } = e.target;
			const { id } = $rootLi.dataset;

			if (className.includes("open-folder")) {
				if (className.includes("icon-right-open")) {
					e.target.classList.replace("icon-right-open", "icon-down-open");
				} else {
					e.target.classList.replace("icon-down-open", "icon-right-open");
				}

				const $childLi = $rootLi.nextElementSibling;

				if ($childLi.className.includes("hide")) {
					$childLi.classList.remove("hide");
				} else {
					$childLi.classList.add("hide");
				}
			} else if (className.includes("delete-page-btn")) {
				onRemove(posts.find((item) => item.id === parseInt(id)));
			} else if (className.includes("create-page-btn")) {
				$createPostModal.setState({
					link: `/documents/${id}`,
					modalOpen: true,
				});
			} else {
				onPostClick(id);
			}
		}
	});

	const $createPostModal = new CreatePostModal({
		$target,
		initialState: { link: `/documents/new`, modalOpen: false },
		addPost,
	});

	this.render();
}
