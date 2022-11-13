import { request } from '../../api/request.js';
import { USER_NAME } from '../../lib/constants.js';
import Footer from './Footer.js';
import Header from './Header.js';
import TextList from './TextList.js';

export default function SideBarContainer({ $target, initialState }) {
  const $sideBar = document.createElement('div');
  $sideBar.className = 'sideBar-container';
  $target.appendChild($sideBar);

  this.state = initialState ?? {};

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      textList.setState(this.state.list);
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
    initialState: this.state.list,
  });

  new Footer({
    $target: $sideBar,
    addRootDocument: async () => {
      const data = await request('/documents', {
        method: 'POST',
        body: JSON({
          title: '어쩌구',
          parent: null,
        }),
      });
      // 여기서 받아온 데이터를 this.state.list에 더하고,
      // 더한 것을 nextState로 만든 후 this.setState로 합친다.
      console.log(data);
    },
  });
}
