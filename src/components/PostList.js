import { $emptyPage, $onLoadList } from "../utils/templates.js";

export default function PostList({
	$target,
	initialState,
	onPostClick,
	onRemove,
	onToggle,
}) {
	const $postList = document.createElement("ul");
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
		$postList.innerHTML = `
				${this.state.posts.map((post) => $onLoadList(post)).join("")}
		`;
	};

	const onToggleList = (e, item) => {
		// this.state.documents = item.documents;
		console.log(item);
		const $li = e.target.closest("li");
		$li.classList.toggle("open");

		const $child = document.createElement("ul");
		$child.className = "child-ul";

		if ($li) {
			$li.appendChild($child);
			if (item.documents.length === 0) {
				$child.innerHTML = $emptyPage();
			} else {
				$child.innerHTML = `
					${item.documents.map((post) => $onLoadList(post)).join("")}
				`;
				// makeChild(e, this.state.documents);
			}
		}
		// console.log(this.state.documents);
	};

	// 리스트들 중 하나 클릭
	$postList.addEventListener("click", (e) => {
		const posts = this.state.posts;
		const $li = e.target.closest("li");

		if ($li.dataset.id !== undefined) {
			const { className } = e.target;
			const { id } = $li.dataset;

			if (className.includes("open-folder")) {
				onToggleList(
					e,
					posts.find((item) => item.id === parseInt(id))
				);
			} else if (className.includes("delete-page-btn")) {
				onRemove(posts.find((item) => item.id === parseInt(id)));
			} else {
				onPostClick(id);
			}
		}
	});

	this.render();
}
