import { $emptyPage, $onLoadParentList } from "../utils/templates.js";

export default function PostList({
	$target,
	initialState,
	onPostClick,
	onRemove,
	onToggle,
}) {
	const $postList = document.createElement("div");
	$target.appendChild($postList);

	this.state = {
		posts: [],
		documents: [],
	};

	this.setState = (nextState) => {
		this.state.posts = nextState;
		this.render();
	};

	this.render = () => {
		$postList.innerHTML = `${$onLoadParentList(this.state.posts)}`;
	};

	const onToggleList = (e, item) => {
		console.log();
	};

	// 리스트들 중 하나 클릭
	$postList.addEventListener("click", (e) => {
		const posts = this.state.posts;

		const $rootLi = e.target.closest(".list-flex");

		if ($rootLi.dataset.id !== undefined) {
			const { className } = e.target;
			const { id } = $rootLi.dataset;
			if (className.includes("open-folder")) {
				const $childLi = $rootLi.nextElementSibling;
				if ($childLi.className.includes("hide")) {
					$childLi.classList.remove("hide");
				} else {
					$childLi.classList.add("hide");
				}
				// onToggleList(
				// 	e,
				// 	posts.find((item) => item.id === parseInt(id))
				// );
			} else if (className.includes("delete-page-btn")) {
				onRemove(posts.find((item) => item.id === parseInt(id)));
			} else {
				onPostClick(id);
			}
		}
	});

	this.render();
}
