import { $onLoadParentList } from "../utils/templates.js";
import CreatePostModal from "./modal/CreatePostModal.js";

export default function PostList({ $target, onRemove, onPostClick, addPost }) {
	const $postList = document.createElement("div");
	const $emptyPostDiv = document.createElement("div");
	$emptyPostDiv.className = "empty-posts-list";

	$target.appendChild($postList);

	this.state = {
		posts: [],
		selectedPostId: null,
	};

	this.setState = ({ postsList, selectedPost }) => {
		this.state.posts = postsList;
		this.state.selectedPostId =
			selectedPost === undefined ? null : selectedPost.id;

		this.render();
	};

	this.render = () => {
		if (this.state.posts.length > 0) {
			$postList.innerHTML = `${$onLoadParentList(
				this.state.posts,
				this.state.selectedPostId
			)}`;
		} else {
			$postList.innerHTML = "";
			$postList.appendChild($emptyPostDiv);
			$emptyPostDiv.innerHTML = `
				<span>아직 작성된 글이 없어요.</span>
				<span>오늘 하루를 기록해보세요! 📝</span>
				<button class="first-create-page-btn">첫 글 작성하기</button>
				`;
		}
	};

	$postList.addEventListener("click", (e) => {
		const posts = this.state.posts;
		const $rootLi = e.target.closest(".list-flex");

		if ($rootLi && $rootLi.dataset.id !== undefined) {
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
				onRemove(id);
				this.render();
				console.log(this.state.posts);
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

	$emptyPostDiv.addEventListener("click", (e) => {
		const { className } = e.target;
		if (className.includes("first-create-page-btn")) {
			$createPostModal.setState({
				link: "/documents/new",
				modalOpen: true,
			});
		}
	});

	const $createPostModal = new CreatePostModal({
		$target,
		initialState: { link: `/documents/new`, modalOpen: false },
		addPost,
	});

	this.render();
}
