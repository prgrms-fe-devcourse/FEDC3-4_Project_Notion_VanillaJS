class PostEditor {
  constructor(props) {
    const { id, title, content } = props.currentDocument;

    this.props = props;
    this.state = {
      id,
      title,
      content,
    };
  }

  setState(nextState) {
    this.state = nextState;
    this.mounted();
  }

  mounted() {
    const { $target } = this.props;
    const { title, content } = this.state;
    const [$postTitle, $postContent] = [...$target.children];

    $target.innerHTML = `
      <input type="text" name="title" class="post-title" placeholder="제목없음" value="${title}" />
      <textarea name="content" class="post-content" placeholder="🥹 입력된 글이 없습니다." value="${content}" ></textarea>
    `;
    $target.children[1].value = content;
    $postTitle.value = title;
    $postContent.value = content;

    this.bindEventHandler();
  }

  bindEventHandler() {
    const { $target, onUpdateText } = this.props;

    $target.addEventListener('keyup', event => {
      const { target } = event;

      const name = target.getAttribute('name');
      const nextState = {
        ...this.state,
        [name]: target.value,
      };

      this.setState(nextState);

      onUpdateText(nextState, name);
    });
  }
}

export default PostEditor;
