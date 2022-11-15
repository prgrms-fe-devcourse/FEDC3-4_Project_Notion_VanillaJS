export default function Editor({ $container, initialState }) {
  const $editor = document.createElement('section');
  $editor.id = 'editor';
  $container.appendChild($editor);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    if (!this.state) {
      $editor.innerHTML = `
		<button>페이지 만들기</button>
		`;
    } else {
      const { title, content } = this.state;
      $editor.innerHTML = `
	    <input type="text" value=${title} />
			<textarea id="content">${content}</textarea> 
	  `;
    }
  };

  this.render();
}
