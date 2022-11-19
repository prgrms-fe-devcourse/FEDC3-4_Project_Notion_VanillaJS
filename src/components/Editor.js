import { $ } from '../utils/utils.js';

export default function Editor({ $container, initialState, onEdit }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor hide';
  $editor.innerHTML = `
		<input type="text" id="title" placeholder="제목을 입력하세요"></input>
		<textarea id="content" placeholder="내용을 입력하세요" style="height:100vh"></textarea> 
	`;
  $container.appendChild($editor);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isVisible, title, content } = this.state;
    if (!isVisible) {
      $editor.classList.add('hide');
      return;
    }

    $editor.classList.remove('hide');
    $('#title').value = title;
    $('#content').value = content;
  };

  const bindEvent = () => {
    $editor.addEventListener('input', (e) => {
      const { id } = e.target;
      if (!id) return;

      this.setState({
        ...this.state,
        [id]: e.target.value,
      });

      onEdit({ ...this.state });
    });
  };

  bindEvent();
}
