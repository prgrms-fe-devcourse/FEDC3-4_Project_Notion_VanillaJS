import createElementHelper from '../../utils/helpers.js';

class PostTitle {
  constructor({ $target }) {
    this.$target = $target;
    this.$postTitle = createElementHelper('input', '.post-title');
    this.state = {};

    this.$postTitle.setAttribute('placeholder', '제목 없음');
    this.$target.appendChild(this.$postTitle);
  }

  setState(nextState) {
    this.state = nextState;
  }
}

export default PostTitle;
