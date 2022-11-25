import { createElement } from '../../utils/helpers/createElement.js';
import { historyPush } from '../../utils/helpers/router.js';
import { modifyStorage } from '../../utils/helpers/storage.js';

/**
 * state: {
 *  id: number,
 *  currentPath: string,
 *  subDocumentList: array
 * }
 */
export default function SubDocumentList({ $target, initialState }) {
  const $div = createElement({
    element: 'div',
    $target,
    className: 'sub-documents',
  });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { subDocumentList } = this.state;
    const { currentPath } = this.state;

    $div.innerHTML = `
      ${subDocumentList
        .map(
          ({ id, title }) => `
        <div class='document-item' title='${title}' data-current-path='${currentPath} > ${title}' data-id='${id}'>
          <div class='document-item__title'>${title}</div>
        </div>
      `,
        )
        .join('')}
    `;
  };

  $div.addEventListener('click', event => {
    event.stopPropagation();
    const { target } = event;
    const { id, currentPath } = target.closest('[data-id]').dataset;

    // 현재 보고 있는 문서의 하위 문서가 Sidebar에서 열려져 있지 않다면(open 되어 있지 않다면)
    // 하위 문서를 클릭하여 하위 문서로 갈 때 상위 문서인 현재 보고 있는 문서를 open 시키기 위함.
    // 이렇게 해줘야 Post의 SubDocumentList의 문서 링크를 클릭했을 때 Sidebar에도 반영이 된다.
    modifyStorage.add(this.state.id);

    historyPush(`/documents/${id}?currentPath=${currentPath}`);
  });
}
