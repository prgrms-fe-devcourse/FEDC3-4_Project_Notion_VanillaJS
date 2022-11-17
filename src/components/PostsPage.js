import { ACTIVE_LIST_KEY } from "../../config.js";
import { request } from "../../api/index.js";
import { push } from "../routes/router.js";
import { setItem } from "../utils/storage.js";
import CreatePostButton from "./CreatePostButton.js";
import PostList from "./PostList.js";
import SideNavHeader from "./SideNavHeader.js";

export default function PostsPage({ $target, initialState }) {
	const $postPage = document.createElement("div");

	this.state = initialState;

	this.setState = async (nextState) => {
		const postsList = await request("/documents");
		postList.setState({ postsList, selectedPost: nextState });
		this.render();
	};

	new SideNavHeader({ $target: $postPage });
	const postList = new PostList({
		$target: $postPage,

		onRemove: async (id) => {
			const post = await request(`/documents/${id}`, {
				method: "GET",
			});
			if (confirm(`제목 : ${post.title}\n해당 글을 삭제할까요?`)) {
				const res = await request(`/documents/${post.id}`, {
					method: "DELETE",
				});
				this.setState();
				push("/");
			}
		},

		onPostClick: async (id) => {
			setItem(ACTIVE_LIST_KEY, id);
			push(`/documents/${id}`);
		},

		addPost: (createdPost) => {
			this.setState(createdPost);
		},
	});

	new CreatePostButton({
		$target,
		initialState: { link: "/documents/new", modalOpen: false },
		addPost: (createdPost) => {
			this.setState(createdPost);
		},
	});

	this.render = () => {
		$target.appendChild($postPage);
	};

	this.render();
}
