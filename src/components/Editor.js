import { $editPost } from "../utils/templates.js";

export default function Editor({ $target, initialState, onEditing }) {
	const $editor = document.createElement("div");
	$editor.className = "editor";
	this.state = initialState; // {id:"", title:"", content:""}
	this.body = initialState;

	$target.appendChild($editor);

	this.setEditState = (nextEdit) => {
		this.body = nextEdit;
	};

	this.setState = (nextState) => {
		this.state = nextState;
		this.body = nextState;
		this.render();
		$editor.querySelector('div[name="title"]').innerText = this.state.title;
		$editor.querySelector('div[name="content"]').innerHTML =
			this.state.content.replace(/\n/g, "<br>");
	};

	this.render = () => {
		$editor.innerHTML = $editPost(this.state);
	};

	$editor.addEventListener("keyup", (e) => {
		const { target } = e;

		const nextBody = {
			id: this.body.id,
			title: this.body.title,
			content: this.body.content,
		};
		if (target.className.includes("title")) {
			this.body.title = target.innerText;
		} else {
			this.body.content = target.innerText;
		}

		onEditing(nextBody);
	});
}
