import { request } from '../../api/request.js';
import { USER_NAME } from '../../lib/constants.js';
import { push } from '../../lib/router.js';
import { $, showModal } from '../../lib/utils.js';
import Footer from './Footer.js';
import Header from './Header.js';
import TextList from './TextList.js';

export default function SideBarContainer({
  $target,
  initialState,
  getData,
  setEditor,
  setNewRootDocument,
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
    requestRemoveDocument: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
      await getData();
      setEditor(id);
    },
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
      // 위로 올려주고, 위에서 setState를 해야지 이게 맞지
      // setNewRootDocument(nextState);
    },
    holdListScroll: () => {
      const $list = $('.list', $target);
      $list.scrollTop = $list.scrollHeight;
    },
  });
}
