import { addClass, hasClass } from "./helper.js";

const styleDocListItem = ($li, state) => {
  const { id, title } = state;
  $li.dataset.documentId = id;
  $li.insertAdjacentHTML(
    "afterbegin",
    `
      <div class="container">
        <a href="#" class="title"><i class="xi-angle-right-min view-more"><span>하위 게시글 보기</span></i>${
          title ? title : "Untitled"
        }</a>
        <div class=btn-container>
          <button class="remove" title="Delete note">
            <i class="xi-trash-o remove"><span>삭제하기</span></i>
          </button>
          <button class="add" title="Add new note inside">
            <i class="xi-plus add"><span>추가하기</span></i>
          </button>
        </div>
      </div>
  `
  );

  return $li;
};

const styleSubdirectoryListItem = ($li, state) => {
  const { id, title } = state;
  $li.dataset.documentId = id;
  $li.insertAdjacentHTML(
    "afterbegin",
    `<a href="#" class="title">${title ? title : "Untitled"}</a>`
  );

  return $li;
};

export const makeElement = (element, ...names) => {
  const $element = document.createElement(element);
  addClass($element, ...names);
  return $element;
};

export const makeButton = ({
  name,
  iconName,
  spanText = "",
  textContent = "",
}) => {
  const $button = document.createElement("button");
  addClass($button, name);
  $button.innerHTML = `
    <i class="${iconName}"><span>${spanText}</span></i>
    ${textContent}
  `;
  return $button;
};

export const makeList = ({ $list, obj, option = {} }) => {
  if (typeof obj !== "object" || obj === null) return;

  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object" && key !== "documents") {
      const { documents, id } = value;
      const $li = makeElement("li", "list-item");

      switch (option.type) {
        case "docList":
          styleDocListItem($li, value);
          break;
        case "subdirectory":
          styleSubdirectoryListItem($li, value);
          break;
      }

      if (option.openedDocId === id.toString()) {
        addClass($li, "on");
      }

      const hasChild = documents.length > 0;
      if (hasChild) {
        const $ul = makeElement("ul", "parent");
        $ul.dataset.parentId = id;
        makeList({
          $list: $ul,
          obj: documents,
          option: option,
        });

        if ($ul.querySelector("li.on")) {
          addClass($ul, "on");
        }

        $li.appendChild($ul);

        if (hasClass($ul, "on", "parent")) {
          const $viewMore =
            $ul.previousElementSibling.querySelector(".view-more");
          addClass($viewMore, "on");
        }
      }
      $list.appendChild($li);
    }
  });
};
