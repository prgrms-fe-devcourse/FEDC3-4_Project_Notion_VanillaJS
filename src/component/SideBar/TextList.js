// state => DocumentList가 올 것
import NotionApi from '../../api/notionApi.js';
import { SIDELIST_KEY } from '../../lib/constants.js';
import { push } from '../../lib/router.js';
import { getItem, setSideBarDOM } from '../../lib/storage.js';
import { ListItem, addDocumentToList } from '../../lib/templates.js';
import { $, $createElement } from '../../lib/dom.js';
import { validateState } from '../../lib/validation.js';
import { showModal } from '../../lib/utils.js';
// 폴더 add 버튼, 삭제 버튼, 리스트 아이템 클릭
export default function TextList({
  $target,
  initialState,
  requestRemoveDocument,
  requestDocumentDetail,
}) {
  // List 요소 유지를 위한 localStorage 요소
  const DOMElement = getItem(SIDELIST_KEY)
    ? getItem(SIDELIST_KEY).split('\n').join('')
    : undefined;
  const $list = $createElement('div');
  const $ul = $createElement('ul');
  $list.className = 'list';

  $target.appendChild($list);

  this.state = initialState ?? [];

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      this.render();
    }
  };

  this.render = () => {
    if (DOMElement) {
      $list.innerHTML = DOMElement;
    } else if (this.state?.length) {
      $ul.innerHTML = `
        ${this.state.map(({ id, title }) => `${ListItem(id, title)} `).join('')}
      `;
    }
  };

  this.render();
  // ul이 없는 경우도 있기 때문에 render 후 넣어줌
  $list.appendChild($ul);

  this.addRootDocument = () => {
    const $newUl = $('ul', $list);
    $newUl.insertAdjacentHTML(
      'beforeend',
      `
      ${ListItem('new', '제목없음')}
    `
    );
  };

  // Click Event(toggle, add, remove, pick)
  $list.addEventListener('click', async (e) => {
    const $li = e.target.closest('li');

    if (!$li) return;
    const id = $li.getAttribute('id');
    // tareget buttons
    const toggler = $('.toggler', $li);
    const addChildBtn = $('.add-child-btn', $li);
    const removeBtn = $('.remove-btn', $li);
    const textTitle = $(`.text-title`, $li);

    // data
    const data = await NotionApi.getDocument(id);
    const childState = data;
    const $childUl = $('ul', $li); // 자식 document 확인

    if (!validateState(childState)) return;
    const { documents } = childState;

    // toggle list 기능 구현
    const toggleList = async () => {
      if (validateState(documents)) {
        if (documents.length === 0) return;
        if (toggler.classList.contains('active')) {
          // active 지우고, 밑의 childNodes를 삭제한다
          $li.removeChild($childUl);
        } else {
          // 아닐 경우 List를 돔에 추가한다.
          addDocumentToList($li, documents);
        }
        toggler.classList.toggle('active');
        setSideBarDOM();
      }
    };

    // add Button 누르기
    const addDocument = () => {
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
          addDocumentToList($li, newChildDocuments);
        }
      }
      // toggle은 밑에 넣어주면서 이미지 바꿔주기.

      toggler.classList.contains('active')
        ? false
        : toggler.classList.toggle('active');

      // 그 외 작업들은 모달에서 해줌
      showModal();
      setSideBarDOM();
    };

    // 삭제 버튼 클릭 (더블 클릭 방지)
    let accessableCount = 1;
    const removeDocument = (id) => {
      accessableCount -= accessableCount;
      if (accessableCount < 0) {
        return;
      }
      const $parent = $li.parentNode;
      if ($parent) {
        $parent.removeChild($li);
      }
      // 삭제한 document의 자식 document 아래로 옮기기
      const $newUl = $('ul', $list);
      if (documents?.length) {
        $newUl.insertAdjacentHTML(
          'beforeend',
          `
          ${documents.map(({ id, title }) => `${ListItem(id, title)}`).join('')}
        `
        );
      }
      // 삭제했을 떄, 자식 요소가 없다면 다시 토글 시켜주기
      if (!$('li', $parent)) {
        const $parentToggler = $('.toggler', $parent.parentElement);
        $parentToggler?.classList.toggle('active');
      }
      setSideBarDOM();
      requestRemoveDocument(id);

      push('/');

      accessableCount += 1;
    };

    // pick Document
    const onClickDocument = (id) => {
      requestDocumentDetail(id);
      textTitle.classList.toggle('active');
    };

    // target에 따른 click event
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
      onClickDocument(id);
    }
  });
}
