import { $createPostBtn } from "../utils/templates.js";
import CreatePostModal from "./modal/CreatePostModal.js";

export default function CreatePostButton({
	$target,
	initialState,
	createPost,
}) {
	const $createPostBtnContainer = document.createElement("div");
	$createPostBtnContainer.className = "create-post-btn-container";
	$target.appendChild($createPostBtnContainer);

	this.state = initialState;

	this.setState = (nextState) => {
		this.state = nextState;
	};

	this.render = () => {
		$createPostBtnContainer.innerHTML = $createPostBtn();
	};

	this.render();

	$createPostBtnContainer.addEventListener("click", () => {
		$createPostModal.setState({
			link: "/documents/new",
			modalOpen: true,
		});
	});

	const $createPostModal = new CreatePostModal({
		$target,
		initialState: { link: "/documents/new", modalOpen: false },
		createPost,
	});
}
