import { OPENED_LIST_KEY } from "../../config.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import { $onLoadParentList } from "../utils/templates.js";
import CreatePostModal from "./modal/CreatePostModal.js";

export default function PostList({
	$target,
	removePost,
	clickPost,
	createPost,
}) {
	const $postList = document.createElement("div");
	const $emptyPostDiv = document.createElement("div");
	$emptyPostDiv.className = "empty-posts-list";

	$target.appendChild($postList);

	this.state = {
		posts: [],
		selectedPostId: null,
		openedId: [],
	};
	this.setState = ({ postsList, selectedPost }) => {
		this.state.posts = postsList;
		this.state.selectedPostId =
			selectedPost === undefined ? null : selectedPost.id;
		this.state.openedId = getItem(OPENED_LIST_KEY, []);
		this.render();
	};

	this.setOpenedLists = (nextState) => {
		this.state.openedId = [...nextState];
		setItem(OPENED_LIST_KEY, this.state.openedId);
	};

	this.render = () => {
		if (this.state.posts.length > 0) {
			$postList.innerHTML = `${$onLoadParentList(
				this.state.posts,
				this.state.selectedPostId,
				this.state.openedId
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
		const $li = e.target.closest(".list-flex");
		const $childLi = $li.nextElementSibling;

		if ($li && $li.dataset.id !== undefined) {
			const { className } = e.target;
			const { id } = $li.dataset;

			if (className.includes("open-folder")) {
				if (className.includes("icon-right-open")) {
					e.target.classList.replace("icon-right-open", "icon-down-open");
					this.state.openedId.includes(id)
						? null
						: this.setOpenedLists([...this.state.openedId, id]);
				} else {
					e.target.classList.replace("icon-down-open", "icon-right-open");
					this.setOpenedLists(
						this.state.openedId.filter((item) => item !== id)
					);
				}

				if ($childLi.className.includes("hide")) {
					$childLi.classList.remove("hide");
				} else {
					$childLi.classList.add("hide");
				}
			} else if (className.includes("delete-page-btn")) {
				removePost(id, this.state.openedId);
			} else if (className.includes("create-child-page-btn")) {
				$createPostModal.setState({
					link: `/documents/${id}`,
					modalOpen: true,
					createdChildPost: (newChildId) => {
						if (newChildId) {
							this.setOpenedLists([...this.state.openedId, id]);
							$childLi.classList.remove("hide");
						}
					},
				});
			} else {
				clickPost(id);
			}
		}
	});

	/**
	 * 포스트 리스트 비어있을때
	 * 글 생성 버튼 클릭
	 */
	$emptyPostDiv.addEventListener("click", (e) => {
		const { className } = e.target;
		if (className.includes("first-create-page-btn")) {
			$createPostModal.setState({
				link: "/documents/new",
				modalOpen: true,
			});
		}
	});

	/**
	 * 루트 페이지 생성 모달
	 */
	const $createPostModal = new CreatePostModal({
		$target,
		initialState: { link: `/documents/new`, modalOpen: false },
		createPost,
	});

	this.render();
}
