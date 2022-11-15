import createElementHelper from '../../utils/helpers.js';

class PostPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$page = createElementHelper('div', '.post-container');

    this.render();
  }

  render() {
    this.$target.appendChild(this.$page);
  }
}

export default PostPage;
