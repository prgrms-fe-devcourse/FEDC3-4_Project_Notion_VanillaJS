import request from '../../api/index.js';
import createElementHelper from '../../utils/helpers.js';

class SidebarPage {
  constructor($target, props) {
    this.props = props;
    this.state = props.documentsListData;

    this.$target = $target;
    this.$navigation = createElementHelper('nav', '.sidebar-container');
    this.$navigationHeader = createElementHelper('h1', '.sidebar-header');
    this.$navigationBody = createElementHelper('ul', '.sidebar-body');
    this.$navigationFooter = createElementHelper('footer', '.sidebar-footer');

    this.onToggleDocumentList = this.onToggleDocumentList.bind(this);
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  render() {
    this.$navigationBody.innerHTML = '';

    this.state.forEach(({ id, title }) => {
      const $li = createElementHelper('li', '.sidebar-list-title');
      $li.textContent = title;
      $li.setAttribute('data-id', id);

      this.$navigationBody.append($li);
    });

    this.$navigation.append(
      this.$navigationHeader,
      this.$navigationBody,
      this.$navigationFooter
    );
    this.$target.append(this.$navigation);

    // bindEventHandler
    this.$navigationBody.addEventListener('click', this.onToggleDocumentList);
  }

  async onToggleDocumentList(event) {
    const { target } = event; // type === 'string'

    const data = await request(`documents/${target.dataset.id}`);

    this.props.onParentSetState(data, event);
  }
}

export default SidebarPage;
