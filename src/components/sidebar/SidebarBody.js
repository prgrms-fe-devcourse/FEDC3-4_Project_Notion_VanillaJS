import createElementHelper from '../../utils/helpers.js';

function SidebarBody({ $target, initialState, onClickDoucment }) {
  this.state = initialState;

  const $navigationBody = createElementHelper('ul', '.sidebar-body');

  this.setState = nextState => {
    this.state = nextState;

    this.render();
  };

  this.render = () => {
    $navigationBody.innerHTML = '';

    this.state.allList.forEach(({ id, title }) => {
      const $li = createElementHelper('li', '.sidebar-list');
      $li.innerHTML += `
        <button type="button" class="sidebar-toggle-btn">&#10095;</button>
        <span class="sidebar-list-title">${title}</span>
        <button type="button" class="sidebar-remove-btn">&#10060;</button>
      `;

      $li.setAttribute('data-id', id);

      $navigationBody.append($li);
    });
  };

  $navigationBody.addEventListener('click', async event => {
    const { target } = event;
    const currentDocumentId = target.closest('.sidebar-list').dataset.id;

    onClickDoucment(currentDocumentId);
  });

  $target.append($navigationBody);
}

export default SidebarBody;
