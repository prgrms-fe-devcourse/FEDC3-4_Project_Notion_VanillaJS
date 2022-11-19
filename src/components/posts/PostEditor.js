function PostEditor({ $target, initialState, onUpdateText }) {
  this.state = initialState;

  this.$target = $target;

  this.setState = nextState => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    const { title, content } = this.state.currentDocument;

    this.$target.children[0].value = title;
    this.$target.children[1].value = content;
  };

  $target.addEventListener('keyup', event => {
    const { target } = event;
    const { allList, currentDocument } = this.state;

    const name = target.getAttribute('name');
    const nextState = {
      allList: this.state.allList,
      currentDocument: { ...this.state.currentDocument, [name]: target.value },
    };
    const index = allList.findIndex(v => Number(v.id) === currentDocument.id);
    nextState.allList[index] = currentDocument;

    onUpdateText(nextState, name);
  });

  this.$target.innerHTML = `
    <input type="text" name="title" class="post-title" placeholder="제목없음" value="${this.state.currentDocument.title}" />
    <textarea name="content" class="post-content" placeholder="🥹 입력된 글이 없습니다." value="${this.state.currentDocument.content}" ></textarea>
  `;
}

export default PostEditor;
