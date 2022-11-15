import { USER_NAME } from '../../lib/constants.js';
import { $ } from '../../lib/utils.js';

import Footer from './Footer.js';
import Header from './Header.js';
import TextList from './TextList.js';

export default function SideBarContainer({ $target, initialState }) {
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

  const addDocument = (id = '') => {
    const $modal = $('#modal');
    $modal.classList.add('show-modal');

    const newData = {
      id: 'new',
      title: '제목없음',
    };

    if (id.length > 0) {
      const nextState = {
        list: [],
      };
    }

    const nextState = {
      list: [...this.state.list, newRootData],
    };

    this.setState(nextState);
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
      const $modal = $('#modal');
      $modal.classList.add('show-modal');
    },
  });

  new Footer({
    $target: $sideBar,
    addRootDocument: () => {
      const $modal = $('#modal');
      $modal.classList.add('show-modal');

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
