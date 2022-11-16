import createElementHelper from '../../utils/helpers.js';

class PostPage {
  constructor({ $target, initialState, onInputTitle }) {
    this.$target = $target;
    this.$editor = createElementHelper('div', '.post-container');

    this.state = initialState;

    this.bindInputTitle(onInputTitle);
    this.initialState();
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  bindInputTitle(onInputTitle) {
    this.$editor.addEventListener('keyup', event => {
      const name = event.target.getAttribute('name');
      const nextState = {
        ...this.state,
        [name]: event.target.value,
      };

      onInputTitle(nextState);
    });
  }

  render() {
    const { title, content } = this.state;
    const [$postTitle, $postContent] = this.$editor.children;

    $postTitle.value = title;
    $postContent.value = content;
  }

  initialState() {
    const { title, content } = this.state;

    this.$editor.innerHTML = `
      <input type="text" name="title" class="post-title" placeholder="제목없음" value="${title}" />
      <textarea name="content" class="post-content" placeholder="🥹 입력된 글이 없습니다." value="${content}" ></textarea>
    `;

    this.$target.append(this.$editor);
  }
}

export default PostPage;
