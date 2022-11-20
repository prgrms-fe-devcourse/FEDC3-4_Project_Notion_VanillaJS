import { request } from '../../api/request.js';
import { USER_NAME } from '../../lib/constants.js';
import { push } from '../../lib/router.js';
import { $, $all, showModal } from '../../lib/utils.js';
import Footer from './Footer.js';
import Header from './Header.js';
import TextList from './TextList.js';

export default function SideBarContainer({
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
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
      await getData();
      setEditor(id);
    },
    // document 정보 받아오기
    requestDocumentDetail: async (id) => {
      const documentDetail = await request(`/documents/${id}`);

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
    holdListScroll: () => {
      const $list = $('.list', $target);
      $list.scrollTop = $list.scrollHeight;
    },
  });
}
