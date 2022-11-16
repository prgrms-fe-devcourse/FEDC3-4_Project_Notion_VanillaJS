export const $ = (selector, target = document) => {
  return target.querySelector(`${selector}`);
};

export const $all = (selector, target = document) => {
  return target.querySelectorAll(`${selector}`);
};

export const $createElement = (element) => {
  return document.createElement(`${element}`);
};

export const validateState = (state) => {
  return state !== undefined && state !== null;
};

export const showModal = () => {
  const $modal = $('#modal');
  $modal.classList.add('show-modal');
};

export const ListItem = (id, title) => {
  return `
  <li id=${id}>
     <div class="list-item">
        <button class="toggler"></button>
          <span data-id="${id}"class="text-title">${title}</span>
        <div class="show list-buttons">
          <button class="add-child-btn">+</button>
          <button class="remove-btn">&#128465;</button>
        </div>
    </div>
  </li>
    `;
};
