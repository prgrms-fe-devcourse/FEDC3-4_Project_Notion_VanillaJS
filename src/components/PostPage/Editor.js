import { customEvent } from "../../utils/custom-event.js";
import { validateInstance } from "../../utils/validation.js";

export default function Editor({
  $target,
  initialState,
  onEditTitle,
  onEditContent,
}) {
  validateInstance(new.target);

  const $editor = document.createElement("div");
  $editor.classList.add("post-edit-page-body");

  $target.appendChild($editor);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const modalTemplate = () => {
    return `
      <div class="modal">
        <div class="text-action-menu-list">
          <div
            class="text-action-menu-item"
            role="button"
            tabindex="0"
            title="굵게"
            data-command="bold"
          >
            <span class="bold">B</span>
          </div>
          <div
            class="text-action-menu-item"
            role="button"
            tabindex="0"
            title="기울임꼴로 표시"
            data-command="italic"
          >
            <span class="italic">i</span>
          </div>
          <div
            class="text-action-menu-item"
            role="button"
            tabindex="0"
            title="밑줄"
            data-command="underline"
          >
            <span class="underline">U</span>
          </div>
          <div
            class="text-action-menu-item"
            role="button"
            tabindex="0"
            title="취소선"
            data-command="strikeThrough"
          >
            <span class="line-through">S</span>
          </div>
          <div
            class="text-action-menu-item"
            role="button"
            tabindex="0"
            style="
              user-select: none;
              transition: background 20ms ease-in 0s;
              cursor: pointer;
              display: flex;
              align-items: center;
              padding-left: 7px;
              padding-right: 6px;
              white-space: nowrap;
              box-shadow: rgba(55, 53, 47, 0.09) 1px 0px 0px;
              margin-right: 1px;
            "
          >
            <div
              style="
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 18px;
                text-align: center;
                font-size: 15px;
                border-radius: 2px;
                width: 18px;
                font-weight: 500;
                margin-bottom: 2px;
                color: rgb(55, 53, 47);
              "
            >
              A
            </div>
            <svg
              viewBox="0 0 30 30"
              class="chevronDown"
              style="
                width: 10px;
                height: 100%;
                display: block;
                fill: rgba(55, 53, 47, 0.35);
                flex-shrink: 0;
                backface-visibility: hidden;
                margin-left: 3px;
              "
            >
              <polygon points="15,17.4 4.8,7 2,9.8 15,23 28,9.8 25.2,7 "></polygon>
            </svg>
          </div>
        </div>
      </div>`;
  };

  this.render = () => {
    const { title, content, documents } = this.state;

    console.log("문서 배열", documents);

    $editor.innerHTML = `
      ${modalTemplate()}
      <div class="selected-post-title">
        ${
          title
            ? `<div class="title" spellcheck="true" contenteditable="true" placeholder="제목 없음">
                <div class="editable-element">${title}</div>
              </div>`
            : `<div class="title" spellcheck="true" contenteditable="true" placeholder="제목 없음"></div>`
        }
        
      </div>
      <div class="selected-post-content">
        ${
          content
            ? `<div class="content" spellcheck="true" contenteditable="true" placeholder="내용을 입력하세요.">
                <div class="editable-element">${content}</div>
              </div>`
            : `<div class="content" spellcheck="true" contenteditable="true" placeholder="내용을 입력하세요."></div> `
        }
      </div>
      ${
        documents.length
          ? `<div>
          <ul class="child-document-list">
            ${documents
              .map(
                (document) =>
                  `<li class="child-document-item" data-id=${document.id}>
                    <div class="child-document-item-container">
                      <div class="icon-document">
                        <img src="/src/assets/document.svg" />
                      </div>
                      <div class="child-document-title">${document.title}</div>
                    </div>
                  </li>`
              )
              .join("")}
          </ul>
        </div>`
          : ""
      }
    `;
  };

  $editor.addEventListener("input", (e) => {
    const { target } = e;

    const name = target.getAttribute("class");

    if (this.state[name] !== undefined) {
      const nextState = { ...this.state, [name]: target.innerHTML.trim() };

      const id = nextState.postId;
      const data = {
        title: nextState.title,
        content: nextState.content,
      };

      if (name === "title") {
        onEditTitle(id, data);
      } else if (name === "content") {
        onEditContent(id, data);
      }
    }
  });

  $editor.addEventListener("click", (e) => {
    const $childDocument = e.target.closest("li");

    if ($childDocument) {
      const { id } = $childDocument.dataset;
      console.log("editor", id);
      customEvent.push(`/documents/${id}`);
    }
  });

  $editor.addEventListener("pointerup", (e) => {
    const $target = e.target.closest(".editable-element");

    if (!$target) return;
    console.log("드래그 타겟", e, $target);
    console.log($target.getBoundingClientRect());
    console.log(window.getSelection());
    const { type } = window.getSelection();
    if (type !== "Range") {
      return;
    }

    const { top, left, width, height, x, y } = $target.getBoundingClientRect();
    console.log({ top, left });

    const $modal = $editor.querySelector(".modal");
    const { width: widthModal, height: heightModal } =
      $modal.getBoundingClientRect();
    $modal.classList.add("display");

    $modal.style.left = `${left - width / 2 - widthModal}px`;
    $modal.style.top = `${top - height / 2 - heightModal}px`;

    // setTimeout(() => {
    //   $modal.classList.remove("display");
    // }, 3000);
  });

  // $editor.querySelector(".modal")?.addEventListener("mouseover", (e) => {
  //   // const $modal = $editor.querySelector(".modal");
  //   $modal.classList.add("display");
  //   // if ($modal) {
  //   // }
  // });

  $editor.addEventListener("click", (e) => {
    const $modal = e.target.closest(".modal");
    console.log($modal);
    const $menu = e.target.closest(".text-action-menu-item");
    console.log($menu);

    if ($modal && $menu) {
      const { command } = $menu.dataset;
      document.execCommand(command, false, null);
    }
  });
}
