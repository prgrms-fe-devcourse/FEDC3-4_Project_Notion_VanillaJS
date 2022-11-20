// state => DocumentList가 올 것
import { request } from '../../api/request.js';
import { SIDELIST_KEY } from '../../lib/constants.js';
import { push } from '../../lib/router.js';
import { setItem, getItem } from '../../lib/storage.js';
import {
  $,
  $createElement,
  ListItem,
  showModal,
  validateState,
} from '../../lib/utils.js';
// 폴더 add 버튼, 삭제 버튼, 리스트 아이템 클릭
export default function TextList({
  $target,
  initialState,
  requestRemoveDocument,
  requestDocumentDetail,
}) {
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
      // this.state의 마지막에 id=new인 것이 들어오면, list의 ul의 마지막 자식으로 넣기.
      // 이 자식을 넣어준 것을. App.js의 clearUntitledDocument에서 전상태랑 이번상태랑 비교?
    } else if (this.state?.length) {
      $ul.innerHTML = `
        ${this.state.map(({ id, title }) => `${ListItem(id, title)} `).join('')}
          `;
    }
  };

  this.render();
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
    const data = await request(`/documents/${id}`);
    const childState = data;
    const $childUl = $('ul', $li);

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
          $li.insertAdjacentHTML(
            'beforeend',
            `
            <ul>
            ${documents
              .map(({ id, title }) => `${ListItem(id, title)}`)
              .join('')}
            </ul>`
          );
        }
        toggler.classList.toggle('active');
        setItem(SIDELIST_KEY, $list.innerHTML);
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
      // toggle은 밑에 넣어주면서 이미지 바꿔주기.

      toggler.classList.contains('active')
        ? false
        : toggler.classList.toggle('active');

      // 그 외 작업들은 모달에서 해줌
      showModal();
      setItem(SIDELIST_KEY, $list.innerHTML);

      // -> 모달에서 입력 시, DOM내용이 바뀔 것임. 그러니 모달에서 저장하자.
      // 근데 지금 모달에서 내려주는 방식은 state만 넘겨주는 방식임.
      // 그러니까 state도 넘겨주되, 화면도 바뀌고, setItem이 되는 상황이 나오면 좋을듯.
      // 근데 이게, 문제가 생기는 경우
      // 1. 맨 처음 업데이트 시, LocalStorage에 아이템이 없어서 알아서 된다.
      // => state를 넣기 전에 화면 바꿔주고 localStorage에 HTML넣고, state를 넣어준다.
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

      setItem(SIDELIST_KEY, $list.innerHTML);
      requestRemoveDocument(id);
      push('/');

      accessableCount += 1;
    };

    const onClickDocument = (id) => {
      requestDocumentDetail(id);
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
      onClickDocument(id);
    }
  });
}
