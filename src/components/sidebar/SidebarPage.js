import createElementHelper from '../../utils/helpers.js';

class SidebarPage {
  constructor({ $target }) {
    this.$target = $target;
    this.$page = createElementHelper('div', '.sidebar-container');

    this.render();
  }

  render() {
    this.$target.appendChild(this.$page);
  }
}

export default SidebarPage;
