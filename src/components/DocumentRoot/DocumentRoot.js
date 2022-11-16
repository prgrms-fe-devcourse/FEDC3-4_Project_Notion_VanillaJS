import img from '../../public/images/greeting.png';

/**
 * DocumentRoot
 *
 * 가장 최상위 문서를 랜더링하는 컴포넌트
 *
 * @param {HTMLDivElement} $target
 */
export function DocumentRoot({ $target }) {
	const generateHTML = () => {
		return `<img class="greeting-img" src="${img}" alt="greeting-img"/>`;
	};

	this.render = () => {
		$target.innerHTML = generateHTML();
	};
}
