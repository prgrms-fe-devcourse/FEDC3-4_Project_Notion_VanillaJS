import { request } from '../../api/request.js';
import { USER_NAME } from '../../lib/constants.js';
import { $, showModal } from '../../lib/utils.js';

import Footer from './Footer.js';
import Header from './Header.js';
import TextList from './TextList.js';

export default function SideBarContainer({ $target, initialState, getData }) {
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
    addChildDocument: () => {
      showModal();
    },
    removeState: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      });
      await getData();
    },
  });

  new Footer({
    $target: $sideBar,
    addRootDocument: () => {
      showModal();

      const newRootData = {
        id: 'new',
        title: '제목없음',
      };

      const nextState = {
        list: [...this.state.list, newRootData],
      };

      this.setState(nextState);
    },
    holdListScroll: () => {
      const $list = $('.list', $target);
      $list.scrollTop = $list.scrollHeight;
    },
  });
}
