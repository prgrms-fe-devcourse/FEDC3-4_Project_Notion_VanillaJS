import { createElement } from '../../utils/createElement.js';

export default function NotFound({ $target }) {
  const $notFound = createElement({
    element: 'div',
    $target,
    className: 'not-found',
  });

  this.render = () => {
    $notFound.innerHTML = `
      <h1>문서를 선택해주세요.</h1>
    `;
  };
}
