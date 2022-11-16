import { push } from "../routes/router.js";
import { $sideNavHeader } from "../utils/templates.js";

export default function SideNavHeader({ $target }) {
	const $navHeader = document.createElement("div");

	$target.appendChild($navHeader);

	this.render = () => {
		$navHeader.innerHTML = $sideNavHeader();
	};

	$navHeader.addEventListener("click", () => {
		window.location = window.location.origin;
	});

	this.render();
}
