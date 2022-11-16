import request from '../../api/index.js';
import createElementHelper from '../../utils/helpers.js';

const USER_NAME = '박명재';

class SidebarPage {
  constructor({
    $target,
    initialState,
    onClickDoucmentList,
    onAddRootDocumentList,
  }) {
    this.state = initialState;

    this.$target = $target;
    this.$navigation = createElementHelper('nav', '.sidebar-container');
    this.$navigationHeader = createElementHelper('h1', '.sidebar-header');
    this.$navigationBody = createElementHelper('ul', '.sidebar-body');
    this.$navigationFooter = createElementHelper('footer', '.sidebar-footer');
    this.$newDocumentListBtn = createElementHelper('button', '.sidebar-new-btn');

    this.initialization();
    this.bindClickDocumentList(onClickDoucmentList);
    this.bindAddRootDocumentList(onAddRootDocumentList);
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  bindClickDocumentList(onClickDoucmentList) {
    this.$navigationBody.addEventListener('click', async event => {
      const { target } = event;
      const $sidebarList = target.closest('.sidebar-list');
      const data = await request(`documents/${$sidebarList.dataset.id}`);

      onClickDoucmentList(data, event);
    });
  }

  bindAddRootDocumentList(onAddRootDocumentList) {
    this.$navigation.addEventListener('click', event => {
      const { target } = event;

      if (target.classList.contains('sidebar-new-btn')) {
        onAddRootDocumentList();
      }
    });
  }

  render() {
    this.$navigationBody.innerHTML = '';

    this.state.forEach(({ id, title }) => {
      const $li = createElementHelper('li', '.sidebar-list');
      $li.innerHTML += `
        <button type="button" class="sidebar-toggle-btn">&#10095;</button>
        <span class="sidebar-list-title">${title}</span>
        <button type="button" class="sidebar-remove-btn">&#10060;</button>
      `;

      $li.setAttribute('data-id', id);

      this.$navigationBody.append($li);
    });

    this.$navigation.append(this.$navigationBody);
    this.$target.append(this.$navigation);
  }

  initialization() {
    this.$navigationHeader.textContent = `🧑🏿‍🚀 ${USER_NAME}의 Notion`;
    this.$newDocumentListBtn.textContent = '+ 새 페이지';

    this.$navigationFooter.append(this.$newDocumentListBtn);
    this.$navigation.append(
      this.$navigationHeader,
      this.$navigationBody,
      this.$navigationFooter
    );
  }
}

export default SidebarPage;
