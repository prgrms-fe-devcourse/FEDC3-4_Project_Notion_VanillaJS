import createElementHelper from '../../utils/helpers.js';

class PostContent {
  constructor({ $target }) {
    this.$target = $target;
    this.$content = createElementHelper('textarea', '.post-content');
    this.state = {};

    this.$target.appendChild(this.$content);
  }

  setState(nextState) {
    this.state = nextState;
  }
}

export default PostContent;
