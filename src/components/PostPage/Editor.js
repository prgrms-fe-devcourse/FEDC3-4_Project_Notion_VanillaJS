import { customEvent } from "../../utils/custom-event.js";
import { validateInstance } from "../../utils/validation.js";
import { DEFAULT_TEXT, STORAGE_KEY } from "../../utils/constants.js";
import { setItem } from "../../utils/storage.js";

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

  const renderTextStyleMenu = () => {
    return `
      <div class="modal text-style-menu">
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
            class="text-action-menu-item text-color-tab"
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

  const renderTextColorStyleMenu = () => {
    return `
    <div
    class="modal text-color-style-menu"
    style="padding-top: 6px; padding-bottom: 6px"
  >
    <div
      style="
        display: flex;
        padding-left: 14px;
        padding-right: 14px;
        margin-top: 6px;
        margin-bottom: 8px;
        color: rgba(55, 53, 47, 0.65);
        font-size: 11px;
        font-weight: 500;
        line-height: 120%;
        user-select: none;
        text-transform: uppercase;
      "
    >
      <div
        style="
          align-self: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
      >
        색
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="#37352F"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: inherit;
              fill: inherit;
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            기본
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(120, 119, 116)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(120, 119, 116);
              fill: rgb(120, 119, 116);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            회색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(159, 107, 83)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(159, 107, 83);
              fill: rgb(159, 107, 83);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            갈색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(217, 115, 13)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(217, 115, 13);
              fill: rgb(217, 115, 13);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            주황색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(203, 145, 47)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(203, 145, 47);
              fill: rgb(203, 145, 47);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            노란색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(68, 131, 97)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(68, 131, 97);
              fill: rgb(68, 131, 97);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            초록색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(51, 126, 169)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(51, 126, 169);
              fill: rgb(51, 126, 169);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            파란색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(144, 101, 176)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(144, 101, 176);
              fill: rgb(144, 101, 176);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            보라색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(193, 76, 138)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(193, 76, 138);
              fill: rgb(193, 76, 138);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            분홍색
          </div>
        </div>
      </div>
    </div>
    <div
      class="text-color-style-menu-item"
      data-color="rgb(212, 76, 71)"
      role="button"
      tabindex="0"
      style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        width: calc(100% - 8px);
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 3px;
      "
    >
      <div
        style="
          display: flex;
          align-items: center;
          line-height: 120%;
          width: 100%;
          user-select: none;
          min-height: 28px;
          font-size: 14px;
        "
      >
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 10px;
            margin-right: 4px;
          "
        >
          <div
            style="
              display: inline-flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              text-align: center;
              font-size: 16px;
              border-radius: 3px;
              font-weight: 500;
              box-shadow: rgba(15, 15, 15, 0.1) 0px 0px 0px 1px inset;
              color: rgb(212, 76, 71);
              fill: rgb(212, 76, 71);
            "
          >
            A
          </div>
        </div>
        <div
          style="
            margin-left: 6px;
            margin-right: 12px;
            min-width: 0px;
            flex: 1 1 auto;
          "
        >
          <div
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            빨간색
          </div>
        </div>
      </div>
    </div>
  </div>`;
  };

  const renderChildDocuments = (documents) => {
    if (documents.length) {
      return `
        <div class="child-documents">
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
        </div>`;
    }
    return "";
  };

  this.render = () => {
    const { title, content, documents } = this.state;

    $editor.innerHTML = `
      ${renderTextStyleMenu()}
      ${renderTextColorStyleMenu()}
      <div class="selected-post-title">
        <div class="title" spellcheck="true" contenteditable="true" placeholder="${
          DEFAULT_TEXT.TITLE
        }"></div>
      </div>
      <div class="selected-post-content">
        <div class="content" spellcheck="true" contenteditable="true" placeholder="${
          DEFAULT_TEXT.CONTENT
        }"></div>
      </div>
      ${renderChildDocuments(documents)}
    `;

    $editor.querySelector(".title").innerHTML = title;
    $editor.querySelector(".content").innerHTML = content;
  };

  const editCurrentDocument = (e) => {
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
  };

  const moveToChildDocument = (e) => {
    const $childDocument = e.target.closest("li");

    if ($childDocument) {
      const { id } = $childDocument.dataset;

      customEvent.push(`/documents/${id}`);
      setItem(STORAGE_KEY.SELECTED_POST, id);
    }
  };

  const showTextStyleMenu = (e) => {
    const $content = e.target.closest(".content");

    if (!$content) {
      return;
    }

    const selectedText = window.getSelection().toString().trim();
    const isClickedTextStyleMenu = e.target.closest(".text-style-menu");
    const isClickedTextColorStyleMenu = e.target.closest(
      ".text-color-style-menu"
    );

    if (
      !isClickedTextStyleMenu &&
      !isClickedTextColorStyleMenu &&
      selectedText.length > 0
    ) {
      const $textStyleMenu = $editor.querySelector(".text-style-menu");
      const $textColorStyleMenu = $editor.querySelector(
        ".text-color-style-menu"
      );

      const { pageX, pageY } = e;

      $textStyleMenu.style.left = `${pageX - 370}px`;
      $textStyleMenu.style.top = `${pageY + 20}px`;

      $textColorStyleMenu.style.left = `${pageX - 275}px`;
      $textColorStyleMenu.style.top = `${pageY + 55}px`;

      $textStyleMenu.classList.add("display");
    }
  };

  const hideTextStyleMenu = (e) => {
    const isClickedTextStyleMenu = e.target.closest(".text-style-menu");
    const isClickedTextColorStyleMenu = e.target.closest(
      ".text-color-style-menu-item"
    );

    const $textStyleMenu = $editor.querySelector(".text-style-menu");
    const $textColorStyleMenu = $editor.querySelector(".text-color-style-menu");
    const isDisplayed = $textStyleMenu.classList.contains("display");

    if (
      isDisplayed &&
      !isClickedTextStyleMenu &&
      !isClickedTextColorStyleMenu
    ) {
      $textStyleMenu.classList.remove("display");
      $textColorStyleMenu.classList.remove("display");
      window.getSelection().empty();
    }
  };

  const applyTextStyle = (e) => {
    const $modal = e.target.closest(".modal");
    const $menu = e.target.closest(".text-action-menu-item");

    if ($modal && $menu) {
      const { command } = $menu.dataset;

      document.execCommand(command, false, null);
    }
  };

  $editor.addEventListener("click", (e) => {
    const $textColorTab = e.target.closest(".text-color-tab");
    const $textColorItem = e.target.closest(".text-color-style-menu-item");

    if ($textColorTab) {
      const $textColorStyleMenu = $editor.querySelector(
        ".text-color-style-menu"
      );
      $textColorStyleMenu.classList.toggle("display");
    }

    if ($textColorItem) {
      const { color } = $textColorItem.dataset;
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("foreColor", false, color);

      const $textStyleMenu = $editor.querySelector(".text-style-menu");
      const $textColorStyleMenu = $editor.querySelector(
        ".text-color-style-menu"
      );
      $textStyleMenu.classList.remove("display");
      $textColorStyleMenu.classList.remove("display");
    }
  });

  const setEvent = () => {
    $editor.addEventListener("input", editCurrentDocument);
    $editor.addEventListener("click", moveToChildDocument);

    $editor.addEventListener("pointerup", showTextStyleMenu);
    $editor.addEventListener("pointerdown", hideTextStyleMenu);
    $editor.addEventListener("click", applyTextStyle);
  };

  setEvent();
}
