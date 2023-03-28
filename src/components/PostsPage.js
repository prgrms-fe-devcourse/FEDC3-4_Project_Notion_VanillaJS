import PostsPageHeader from "./PostsPageHeader.js";
import CreatePostButton from "./CreatePostButton.js";
import PostList from "./PostList.js";
import { request } from "../api/index.js";
import { push } from "../routes/router.js";

export default function PostsPage({ $target }) {
	const $postPage = document.createElement("div");

	this.setState = async (nextState) => {
		const postsList = await request("/documents", {
			method: "GET",
		});
		postList.setState({ postsList, selectedPost: nextState });
		this.render();
	};

	new PostsPageHeader({ $target: $postPage });
	const postList = new PostList({
		$target: $postPage,

		removePost: async (id, openedId) => {
			const post = await request(`/documents/${id}`, {
				method: "GET",
			});
			if (confirm(`제목 : ${post.title}\n해당 글을 삭제할까요?`)) {
				const res = await request(`/documents/${post.id}`, {
					method: "DELETE",
				});
				if (res.id) {
					this.setState();
					postList.setOpenedLists(openedId.filter((item) => item !== id));
					push("/");
				}
			}
		},

		clickPost: (id) => {
			push(`/documents/${id}`);
		},

		createPost: (createdPost) => {
			this.setState(createdPost);
		},
	});

	new CreatePostButton({
		$target,
		initialState: { link: "/documents/new", modalOpen: false },
		createPost: (createdPost) => {
			this.setState(createdPost);
		},
	});

	this.render = () => {
		$target.appendChild($postPage);
	};

	this.render();
}
