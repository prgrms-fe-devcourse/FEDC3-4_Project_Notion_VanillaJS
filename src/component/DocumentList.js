import { $, validateState } from '../lib/utils.js';

export default function DocumentList({ $target, initialState }) {
  const $ul = document.createElement('ul');
  $target.appendChild($ul);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const ListItem = (id, title) => {
    return `
     <div class="list-item">
        <button class="toggler"></button>
        <label for="${id}">
          <span class="text-title">${title}</span>
        </label>
        <div class="hidden list-buttons">
          <button class="add-btn">+</button>
          <button class="remove-btn">&#128465;</button>
        </div>
    </div>
    `;
  };

  this.render = () => {
    if (this.state?.length) {
      $ul.innerHTML = `
          ${this.state
            .map(
              ({ id, title }) => `
            <li data-id="${id}">
              ${ListItem(id, title)}
            </li>
          `
            )
            .join('')}
      `;
    }
  };

  this.render();

  // toggle list 기능 구현
  $ul.addEventListener('click', (e) => {
    const $li = e.target.closest('li');
    if (!$li) return;

    const toggler = $('.toggler', $li);
    const { id } = $li.dataset;

    if (e.target !== toggler) return;

    const childState = this.state.filter((item) => item.id === +id)[0];

    if (!childState) return;

    if (validateState(childState.documents)) {
      if (childState.documents.length === 0) return;
      if (toggler.classList.contains('active')) {
        // active 지우고, 밑의 childNodes를 삭제한다
        const $ul = $('ul', $li);
        $li.removeChild($ul);
      } else {
        // 아닐 경우 List를 돔에 추가한다.
        new DocumentList({
          $target: $li,
          initialState: childState.documents,
        });
      }
      toggler.classList.toggle('active');
    }
  });

  $ul.addEventListener('mouseover', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const $buttons = $('.list-buttons', $li);
      $buttons.classList.remove('hidden');
    }
  });

  $ul.addEventListener('mouseout', (e) => {
    const $li = e.target.closest('li');
    if ($li) {
      const $buttons = $('.list-buttons', $li);
      $buttons.classList.add('hidden');
    }
  });
}
