import createElementHelper from '../../utils/helpers.js';

import PostTitle from './PostTitle.js';
import PostContent from './PostContent.js';

class PostPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$page = createElementHelper('div', '.post-container');

    new PostTitle({ $target: this.$page });
    new PostContent({ $target: this.$page });
    this.render();
  }

  render() {
    this.$target.appendChild(this.$page);
  }
}

export default PostPage;
