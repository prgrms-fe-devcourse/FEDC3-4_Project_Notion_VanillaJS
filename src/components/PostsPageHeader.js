import { $postsPageHeader } from "../utils/templates.js";

export default function PostsPageHeader({ $target }) {
	const $navHeader = document.createElement("div");

	$target.appendChild($navHeader);

	this.render = () => {
		$navHeader.innerHTML = $postsPageHeader();
	};

	$navHeader.addEventListener("click", () => {
		window.location = window.location.origin;
	});

	this.render();
}
