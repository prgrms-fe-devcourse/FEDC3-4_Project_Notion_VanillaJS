import { $home } from "../utils/templates.js";

export default function HomePage({ $target }) {
	const $homePage = document.createElement("div");

	$target.appendChild($homePage);

	this.render = () => {
		$homePage.innerHTML = $home();
	};

	this.render();
}
