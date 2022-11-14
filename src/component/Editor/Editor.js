export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor-content';

  console.log($target, $editor);

  $target.appendChild($editor);

  this.state = initialState ? initialState : {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const editorContent = (title = '', text = '') => {
    return `
         <input
            class="editor-title"
            type="text"
            name="title"
            id="title"
            value="${title}"
            placeholder="제목 없음"
          />
          <textarea
            class="editor-text"
            name="text"
            id="text"
            placeholder="내용을 입력하세요..😁"
          >${text}</textarea>
    `;
  };

  this.render = () => {
    if (!this.state) {
      $editor.innerHTML = editorContent();
    } else {
      $editor.innerHTML = editorContent(this.state.title, this.state.text);
    }
  };

  this.render();
}
