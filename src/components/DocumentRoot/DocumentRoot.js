import img from '../../public/images/greeting.png';
export function DocumentRoot({ $target }) {
	const generateHTML = () => {
		return `<img class="greeting-img" src="${img}" alt="greeting-img"/>`;
	};

	this.render = () => {
		$target.innerHTML = generateHTML();
	};
}
