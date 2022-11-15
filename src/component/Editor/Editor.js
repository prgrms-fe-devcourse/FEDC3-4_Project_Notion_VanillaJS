export default function Editor({ $target, initialState }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor-contents';

  $target.appendChild($editor);

  this.state = initialState ? initialState : {};

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const editorContent = (title = '', content = '') => {
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
            class="editor-content"
            name="content"
            id="content"
            placeholder="내용을 입력하세요..😁"
          >${content}</textarea>
    `;
  };

  this.render = () => {
    if (!this.state) {
      $editor.innerHTML = editorContent();
    } else {
      $editor.innerHTML = editorContent(this.state.title, this.state.content);
    }
  };

  this.render();
}
