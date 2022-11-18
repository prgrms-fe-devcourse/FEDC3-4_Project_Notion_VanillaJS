import createElementHelper from '../../utils/helpers.js';

class SidebarBody {
  constructor(props) {
    this.props = props;
    this.$navigationBody = createElementHelper('ul', '.sidebar-body');
  }

  mounted() {
    const { $navigationBody, bindEventHandler } = this;
    const { $target, allList } = this.props;

    allList.forEach(({ id, title }) => {
      const $li = createElementHelper('li', '.sidebar-list');
      $li.innerHTML += `
        <button type="button" class="sidebar-toggle-btn">&#10095;</button>
        <span class="sidebar-list-title">${title}</span>
        <button type="button" class="sidebar-remove-btn">&#10060;</button>
      `;

      $li.setAttribute('data-id', id);

      $navigationBody.append($li);
    });

    $target.append($navigationBody);
    bindEventHandler.call(this);
  }

  bindEventHandler() {
    const { $navigationBody } = this;
    const { onClickDoucment } = this.props;

    $navigationBody.addEventListener('click', async event => {
      const { target } = event;
      const currentDocumentId = target.closest('.sidebar-list').dataset.id;
      console.log(currentDocumentId);

      onClickDoucment(currentDocumentId);
    });
  }
}

export default SidebarBody;
