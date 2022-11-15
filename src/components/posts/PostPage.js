import createElementHelper from '../../utils/helpers.js';

class PostPage {
  constructor($target, props) {
    this.$target = $target;
    this.$page = createElementHelper('div', '.post-container');

    this.state = props.currentList;
    this.props = props;

    this.render();
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  render() {
    this.$target.append(this.$page);
  }
}

export default PostPage;
