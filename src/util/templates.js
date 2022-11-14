import { addClass } from "./helper.js";

export const makeLi = (state) => {
  const { id, title } = state;
  const $li = document.createElement("li");
  $li.dataset.documentId = id;
  $li.classList.add("list-item");
  $li.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="container">
        <a href="#" class="title"><i class="xi-angle-right-min view-more"><span>하위 게시글 보기</span></i>${title ? title : "Untitled"}</a>
        <div class=btn-container>
          <button class="remove">
            <i class="xi-trash-o remove"><span>삭제하기</span></i>
          </button>
          <button class="add">
            <i class="xi-plus add"><span>추가하기</span></i>
          </button>
        </div>
      </div>
  `
  );

  return $li;
};

export const makeUl = (name) => {
  const $ul = document.createElement("ul");
  $ul.classList.add(name);
  return $ul;
};

export const makeElement = (element, ...names) => {
  const $element = document.createElement(element);
  addClass($element, ...names);
  return $element;
};

export const makeButton = ({name, iconName, spanText = '', textContent = ''}) => {
  const $button = document.createElement("button");
  addClass($button, name);
  $button.innerHTML = `
    <i class="${iconName}"><span>${spanText}</span></i>
    ${textContent}
  `;
  return $button;
};
