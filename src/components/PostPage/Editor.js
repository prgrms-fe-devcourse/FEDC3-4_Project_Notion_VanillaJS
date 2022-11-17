import {
  renderChildDocuments,
  renderTextStyleMenu,
  renderTextColorStyleMenu,
} from "../../utils/template.js";

import { validateInstance } from "../../utils/validation.js";
import { DEFAULT_TEXT, STORAGE_KEY } from "../../utils/constants.js";
import { setItem } from "../../utils/storage.js";
import { customEvent } from "../../utils/custom-event.js";

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

    const type = target.getAttribute("class");

    if (this.state[type] !== undefined) {
      const nextState = { ...this.state, [type]: target.innerHTML.trim() };

      const id = nextState.postId;
      const data = {
        title: nextState.title,
        content: nextState.content,
      };

      if (type === "title") {
        onEditTitle(id, data);
      } else if (type === "content") {
        onEditContent(id, data);
      }
    }
  };

  const moveToChildDocument = (e) => {
    const $childDocument = e.target.closest("li");

    if ($childDocument) {
      const { id } = $childDocument.dataset;

      customEvent.push(`/documents/${id}`);
      setItem(STORAGE_KEY.SELECTED_DOCUMENT, id);
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
    const $styleType = e.target.closest(".text-style-menu-item");

    if ($styleType) {
      const { command } = $styleType.dataset;

      document.execCommand(command, false, null);
    }
  };

  const applyTextColorStyle = (e) => {
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
  };

  const setEvent = () => {
    $editor.addEventListener("input", editCurrentDocument);

    $editor.addEventListener("click", moveToChildDocument);

    $editor.addEventListener("pointerup", showTextStyleMenu);
    $editor.addEventListener("pointerdown", hideTextStyleMenu);

    $editor.addEventListener("click", applyTextStyle);
    $editor.addEventListener("click", applyTextColorStyle);
  };

  setEvent();
}
