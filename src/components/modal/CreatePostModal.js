import { $createPostModal } from "../../utils/templates.js";
import { modalClose, modalShow } from "./handler.js";
import { request } from "../../api/api.js";
import { push } from "../../routes/router.js";

export default function CreatePostModal({ $target, initialState, addPost }) {
	const $modal = document.createElement("div");
	$target.appendChild($modal);

	this.state = initialState;
	this.body = { title: "" };

	this.setState = (nextState) => {
		this.state = nextState;

		if (this.state.modalOpen) {
			modalShow($modal);
			modalEventListener();
		} else modalClose($modal);
	};

	this.setBody = (nextState) => {
		this.body = nextState;
	};

	const modalEventListener = () => {
		const $overlay = document.querySelectorAll(".overlay");
		$overlay.forEach((item) => {
			item.addEventListener("click", () => {
				modalClose($modal);
			});
		});
	};

	this.render = () => {
		$modal.innerHTML = $createPostModal();
	};

	$modal.addEventListener("keyup", (e) => {
		const { target } = e;
		const name = target.getAttribute("name");

		let state = { ...this.state };
		const [, , id] = state.link.split("/");
		this.setBody({
			parent: id === "new" ? null : id,
			[name]: target.innerText,
		});
	});

	$modal.addEventListener("click", async (e) => {
		const { target } = e;
		const $closeBtn = target.closest(".close");
		const $createBtn = target.closest(".create-post-btn");

		if ($createBtn) {
			if (this.body.title.length === 0) {
				alert("글 제목을 입력해주세요!");
				return;
			}
			const createdPost = await request("/documents", {
				method: "POST",
				body: JSON.stringify(this.body),
			});
			if (createdPost.id) {
				modalClose($modal);
				push(`/documents/${createdPost.id}`);
				addPost(false);
			}
		} else if ($closeBtn) {
			modalClose($modal);
		}
	});

	this.render();
}
