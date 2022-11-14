export default function NotFound({ $target }) {
	const $notFound = document.createElement("div");
	$notFound.className = "not-found";

	$target.appendChild($notFound);

	this.render = () => {
		$notFound.innerHTML = `
			<h1>페이지를 찾을 수 없습니다. :(</h1>
			<button>홈으로 이동</button>
		`;
	};

	this.init = () => {
		$notFound.addEventListener("click", (e) => {
			const $button = e.target.closest("button");
			if ($button) {
				window.location = window.location.origin;
			}
		});
	};

	this.init();
}
