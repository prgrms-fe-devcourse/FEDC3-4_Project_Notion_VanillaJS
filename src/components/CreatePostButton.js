// import CreatePostModal from "./modal/CreatePostModal.js";

import { push } from "../routes/router.js";
import { $createPostBtn } from "../utils/templates.js";

export default function CreatePostButton({ $target, initialState }) {
	const $createPostBtnContainer = document.createElement("div");
	$createPostBtnContainer.className = "create-post-btn-container";
	$target.appendChild($createPostBtnContainer);

	this.state = initialState;

	// this.setState = (nextState) => {
	// 	this.state = nextState;
	// 	this.render();
	// };

	this.render = () => {
		$createPostBtnContainer.innerHTML = $createPostBtn();
	};

	this.render();

	$createPostBtnContainer.addEventListener("click", () => {
		push(this.state.link);
	});

	// const $createPostModal = new CreatePostModal({
	// 	$target,
	// 	initialState: this.state,
	// });
}
