import NotionApi from '../../api/notionApi.js';
import { USER_NAME } from '../../lib/constants.js';
import { push } from '../../lib/router.js';
import { setSideBarDOM } from '../../lib/storage.js';
import { $, $all } from '../../lib/dom.js';
import Footer from './Footer.js';
import Header from './Header.js';
import TextList from './TextList.js';
import { showModal } from '../../lib/utils.js';
export default function SideBarPage({
  $target,
  initialState,
  getData,
  setEditor,
}) {
  const $sideBar = document.createElement('div');
  $sideBar.className = 'sideBar-container';
  $target.appendChild($sideBar);

  this.state = {
    ...initialState,
  };

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      textList.setState(this.state);
    }
  };

  this.setBoldId = (id) => {
    const $boldLi = document.getElementById(id);
    if ($boldLi) {
      const $boldListItem = $('.list-item', $boldLi);
      $boldListItem.classList.toggle('bold');
    }
  };

  this.removeBoldId = () => {
    const $boldItems = $all('.bold');
    if ($boldItems) {
      $boldItems.forEach(($boldItem) => {
        $boldItem.classList.toggle('bold');
      });
    }
  };

  this.switchNewId = (id) => {
    const $li = document.getElementById('new');
    $li.setAttribute('id', id);
    const $span = $(`span[data-id='new']`);
    $span.setAttribute('data-id', id);

    setSideBarDOM();
  };

  this.removeUntitledDocument = () => {
    const $li = document.getElementById('new');
    const parent = $li.parentElement;
    parent.removeChild($li);
    const $toggler = $('.toggler', parent.parentElement);

    if ($('li', parent) === null) {
      $toggler.classList.toggle('active');
    }
    setSideBarDOM();
  };

  new Header({
    $target: $sideBar,
    initialState: {
      username: USER_NAME,
    },
  });

  const textList = new TextList({
    $target: $sideBar,
    initialState: {
      list: this.state,
    },
    // document 삭제
    requestRemoveDocument: async (id) => {
      await NotionApi.removeDocument(id);
      await getData();
    },
    // document 정보 받아오기
    requestDocumentDetail: async (id) => {
      const documentDetail = await NotionApi.getDocument(id);
      const { title, content } = documentDetail;
      setEditor(id, title, content);

      push(`/documents/${id}`);
    },
  });

  new Footer({
    $target: $sideBar,
    addNewDocument: () => {
      textList.addRootDocument();
      // 추후 작업들은 모달에서 알아서 함
      showModal();
    },
    // 맨 밑에 추가하면 scroll 밑으로 고정
    holdListScroll: () => {
      const $list = $('.list', $target);
      $list.scrollTop = $list.scrollHeight;
    },
  });
}
