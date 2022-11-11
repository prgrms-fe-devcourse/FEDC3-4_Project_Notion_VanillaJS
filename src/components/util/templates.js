export const makeLi = (state) => {
  const { id, title } = state;
  const $li = document.createElement("li");
  $li.dataset.documentId = id;
  $li.classList.add('doc-item');
  $li.insertAdjacentHTML(
    "afterbegin",
    `
      ${title ? title : "Untitled"}
      <button class="remove">x</button>
      <button class="add">+</button>
  `
  );

  return $li;
};

export const makeUl = (name = '') => {
  const $ul = document.createElement("ul");
  $ul.classList.add(name);
  return $ul;
};
