import { request } from "../api/api.js";
import { push } from "../routes/router.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import CreatePostButton from "./CreatePostButton.js";
import PostList from "./PostList.js";
import SideNavHeader from "./SideNavHeader.js";

export default function PostsPage({ $target, initialState }) {
	const $postPage = document.createElement("div");

	this.state = initialState;

	this.setState = async () => {
		const posts = await request("/documents");
		postList.setState(posts);
		this.render();
	};

	new SideNavHeader({ $target: $postPage });
	const postList = new PostList({
		$target: $postPage,
		initialState: [],

		onRemove: async (post) => {
			if (confirm(`제목 : ${post.title}\n해당 글을 삭제할까요?`)) {
				const res = await request(`/documents/${post.id}`, {
					method: "DELETE",
				});
				this.setState();
			}
		},

		onPostClick: async (id) => {
			push(`/documents/${id}`);
		},
	});

	new CreatePostButton({
		$target: $postPage,
		initialState: { link: "/documents/new" },
	});

	this.render = () => {
		$target.appendChild($postPage);
	};

	this.render();
}
