// state => DocumentList가 올 것
import { $, $createElement, ListItem, validateState } from '../../lib/utils.js';
// 폴더 add 버튼, 삭제 버튼, 리스트 아이템 클릭
export default function TextList({ $target, initialState, addChildDocument }) {
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
    const id = $li.getAttribute('id');
    const toggler = $('.toggler', $li);
    const addChildBtn = $('.add-child-btn', $li);
    const removeBtn = $('.remove-btn', $li);
    const childState = list.filter((item) => item.id === +id)[0];
    const $ul = $('ul', $li);

    // toggle list 기능 구현
    const toggleList = () => {
      if (!childState) return;

      if (validateState(childState.documents)) {
        if (childState.documents.length === 0) return;
        if (toggler.classList.contains('active')) {
          // active 지우고, 밑의 childNodes를 삭제한다
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

    // add Button 누르기
    const addDocument = () => {
      if (!childState) return;
      const { documents } = childState;
      if (validateState(documents)) {
        const newChildDocuments = [
          ...documents,
          {
            id: 'new',
            title: '제목없음',
          },
        ];
        if ($ul) {
          $ul.innerHTML = `
            ${newChildDocuments
              .map(({ id, title }) => `${ListItem(id, title)}`)
              .join('')}
          `;
        } else {
          $li.insertAdjacentHTML(
            'beforeend',
            `<ul>
            ${newChildDocuments
              .map(({ id, title }) => `${ListItem(id, title)}`)
              .join('')}
            </ul>
          `
          );
        }
      }
      toggler.classList.toggle('active');
      addChildDocument();
    };

    const removeDocument = () => {
      console.log(e.target);
    };

    if (e.target === toggler) {
      toggleList();
    } else if (e.target === addChildBtn) {
      addDocument();
    } else if (e.target === removeBtn) {
      removeDocument();
    }
  });
}
