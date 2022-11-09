import Navigator from './components/navigator.js';
import Editor from './components/editor.js';

export default function App({ target }) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flex-row');
  wrapper.classList.add('full-size');
  target.appendChild(wrapper);

  this.render = () => {
    // 좌측 navigation bar
    new Navigator({ target: wrapper, initialState: [] });
    // 우측 editor
    new Editor({ target: wrapper, initialState: [] });
  };

  this.render();
}
