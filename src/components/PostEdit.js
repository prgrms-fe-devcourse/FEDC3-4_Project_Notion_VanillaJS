import { request } from "../api/api.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import { $editPost, $home } from "../utils/templates.js";
import Editor from "./Editor.js";

export default function PostEdit({ $target, initialState, addPost }) {
	this.state = initialState;
	const ADD_POST_SAVE_KEY = "add-new-post";

	let timer = null;
	const editor = new Editor({
		$target,
		initialState: this.state,
		onEditing: (post) => {
			if (timer !== null) {
				clearTimeout(timer);
			}
			timer = setTimeout(async () => {
				const isNew = this.state.id === "new";
				if (isNew) {
					setItem(ADD_POST_SAVE_KEY, post);
					addPost(post);
					const createdPost = await request("/documents", {
						method: "POST",
						body: JSON.stringify(post),
					});
					console.log(createdPost);
					history.replaceState(null, null, `/documents/${createdPost.id}`);

					// this.setState({
					// 	...getItem(ADD_POST_SAVE_KEY),
					// 	id: createdPost.id,
					// });
				} else {
					await request(`/documents/${post.id}`, {
						method: "PUT",
						body: JSON.stringify(post),
					});
				}
			}, 2000);
		},
	});

	// post를 받거나 id:new를 받거나
	this.setState = async (nextState) => {
		if (this.state.id !== nextState.id) {
			this.state = nextState;

			if (this.state.id === "new") {
				this.render();
				editor.setState(this.state);
			} else {
				await fetchPost();
			}
			return;
		}

		this.state = nextState;
		this.render();

		editor.setState(
			this.state.post || {
				title: "",
				content: "",
			}
		);
	};

	this.render = () => {
		editor.setState(this.state);
	};

	const fetchPost = async () => {
		const { id } = this.state;
		console.log(id);
		if (id !== "new") {
			const post = await request(`/documents/${id}`);
			console.log(post);
			this.setState({
				...this.state,
				post,
			});
		}
	};
}
