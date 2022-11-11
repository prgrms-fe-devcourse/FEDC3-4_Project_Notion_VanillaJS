import Navigator from './components/navigator.js';
import Editor from './components/editor.js';
import { request } from './utils/api.js';

export default function App({ target, initialState }) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('flex-row', 'full-size');
  target.appendChild(wrapper);

  this.init = async () => {
    const documents = await request('/documents');
    this.setState({ documents: documents });
  };

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
    this.render();
  };

  this.render = () => {
    new Navigator({
      target: wrapper,
      initialState: this.state,
    });
    new Editor({ target: wrapper, initialState: [] });
  };

  this.init();
}
