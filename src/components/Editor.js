import { getItem } from "../utils/storage.js";
import { $editPost, $home } from "../utils/templates.js";

export default function Editor({ $target, initialState, onEditing }) {
	const $editor = document.createElement("div");
	$editor.className = "editor";
	this.state = initialState; // {id:"", title:"", content:""}

	$target.appendChild($editor);

	// let postLocalSaveKey = `temp-post-${this.state.id}`;

	// // 저장된 내용 불러오기
	// const post = getItem(postLocalSaveKey, {
	// 	title: "",
	// 	content: "",
	// });

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
		$editor.querySelector('input[name="title"]').value = this.state.title;
		$editor.querySelector('textarea[name="content"]').value =
			this.state.content;
	};

	let isInitialize = false;
	this.render = () => {
		if (!isInitialize) {
			$editor.innerHTML = $editPost(this.state);
			isInitialize = true;
		}
	};

	$editor.addEventListener("keyup", (e) => {
		const { target } = e;
		const name = target.getAttribute("name");

		if (this.state[name] !== undefined) {
			const nextState = {
				...this.state,
				[name]: target.value,
			};
			this.setState(nextState);
			onEditing(nextState);
		}
	});
}
