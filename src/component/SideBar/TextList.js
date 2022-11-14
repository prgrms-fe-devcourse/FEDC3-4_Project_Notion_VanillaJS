// state => DocumentList가 올 것
import { $, $createElement, ListItem, validateState } from '../../lib/utils.js';
// 폴더 add 버튼, 삭제 버튼, 리스트 아이템 클릭
export default function TextList({ $target, initialState }) {
  const $list = $createElement('div');
  const $ul = $createElement('ul');
  $list.className = 'list';

  console.log($target);
  $target.appendChild($list);
  $list.appendChild($ul);

  this.state = initialState ?? [];

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      this.render();
    }
  };

  this.render = () => {
    if (this.state.list?.length) {
      $ul.innerHTML = `
        ${this.state.list
          .map(({ id, title }) => `${ListItem(id, title)} `)
          .join('')}
          `;
    }
  };

  this.render();

  $ul.addEventListener('click', (e) => {
    const { list } = this.state;
    const $li = e.target.closest('li');

    if (!$li) return;

    // toggle list 기능 구현
    const toggleList = () => {
      const toggler = $('.toggler', $li);
      const id = $li.getAttribute('id');

      if (e.target !== toggler) return;

      const childState = list.filter((item) => item.id === +id)[0];
      if (!childState) return;

      if (validateState(childState.documents)) {
        if (childState.documents.length === 0) return;
        if (toggler.classList.contains('active')) {
          // active 지우고, 밑의 childNodes를 삭제한다
          const $ul = $('ul', $li);
          $li.removeChild($ul);
        } else {
          // 아닐 경우 List를 돔에 추가한다.
          $li.insertAdjacentHTML(
            'beforeend',
            `
            <ul>
            ${childState.documents
              .map(({ id, title }) => `${ListItem(id, title)}`)
              .join('')}
            </ul>`
          );
        }
        toggler.classList.toggle('active');
      }
    };

    toggleList();
  });
}
