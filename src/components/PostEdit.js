import { request } from "../api/api.js";
import { getItem, removeItem, setItem } from "../utils/storage.js";
import { $editPost, $home } from "../utils/templates.js";
import Editor from "./Editor.js";

export default function PostEdit({ $target, initialState, addPost }) {
	this.state = initialState;

	let timer = null;
	const editor = new Editor({
		$target,
		initialState: this.state,
		onEditing: (post) => {
			if (timer !== null) {
				clearTimeout(timer);
			}
			timer = setTimeout(async () => {
				await request(`/documents/${post.id}`, {
					method: "PUT",
					body: JSON.stringify(post),
				});
				addPost(false);
			}, 1000);
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
			this.state || {
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
		if (id !== "new") {
			const post = await request(`/documents/${id}`);
			this.setState({
				...this.state,
				post,
			});
		}
	};
}
