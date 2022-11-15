// state => DocumentList가 올 것
import { setItem, getItem } from '../../lib/storage.js';
import { $, $createElement, ListItem, validateState } from '../../lib/utils.js';
// 폴더 add 버튼, 삭제 버튼, 리스트 아이템 클릭
export default function TextList({
  $target,
  initialState,
  addChildDocument,
  requestRemoveDocument,
  requestDocumentDetail,
}) {
  const $list = $createElement('div');
  const $ul = $createElement('ul');
  $list.className = 'list';

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
    const $parentLi = $li.parentNode.closest('li');
    const parentId = $parentLi ? $parentLi.getAttribute('id') : '';
    const childList = getItem(parentId) ? getItem(parentId) : null;

    if (!$li) return;
    const id = $li.getAttribute('id');
    const toggler = $('.toggler', $li);
    const addChildBtn = $('.add-child-btn', $li);
    const removeBtn = $('.remove-btn', $li);
    const textTitle = $(`.text-title`, $li);
    const childState = childList
      ? childList.filter((item) => item.id === +id)[0]
      : list.filter((item) => item.id === +id)[0];
    const $childUl = $('ul', $li);

    // toggle list 기능 구현
    const toggleList = () => {
      if (!childState) return;

      if (validateState(childState.documents)) {
        if (childState.documents.length === 0) return;
        if (toggler.classList.contains('active')) {
          // active 지우고, 밑의 childNodes를 삭제한다
          $li.removeChild($childUl);
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
        setItem($li.getAttribute('id'), childState.documents);
        toggler.classList.toggle('active');
      }
    };

    // add Button 누르기
    const addDocument = () => {
      // 해결책, child로 내렸던 것들을 기억하기? state로 or storage에 저장해놓기? 해당 id 를 키로해서 저장해논다?
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
        // documents가 있을 경우 => 해당 documents 들로 ul을 초기화
        if ($childUl) {
          $childUl.innerHTML = `
            ${newChildDocuments
              .map(({ id, title }) => `${ListItem(id, title)}`)
              .join('')}
          `;
        }
        // documents가 없을 경우 => li의 뒤에 새로운 ul태그를 만들어서 넣어줌
        else {
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
      // setItem('List', $ul.innerHTML);
      setItem($li.getAttribute('id'), childState.documents);
      toggler.classList.toggle('active');
      addChildDocument();
    };

    // 더블 클릭 방지
    let accessableCount = 1;
    const removeDocument = () => {
      accessableCount -= accessableCount;
      if (accessableCount < 0) {
        return;
      } else {
        requestRemoveDocument(id);
      }
      accessableCount += 1;
    };

    if (e.target === toggler) {
      toggleList();
    }
    if (e.target === addChildBtn) {
      addDocument();
    }
    if (e.target === removeBtn) {
      removeDocument(id);
    }
    if (e.target === textTitle) {
      requestDocumentDetail(id);
    }
  });
}
