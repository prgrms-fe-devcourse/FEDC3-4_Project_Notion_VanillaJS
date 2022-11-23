import { removeElementClass } from "./helper.js";

const addEvent = ($target, eventType, selector, callback) => {
  const children = [...$target.querySelectorAll(selector)];
  const isTarget = (target) => children.includes(target) || target.closest(selector);

  $target.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
};

const handlers = {
  handleDocumentItemMouseOver: (event) => {
    const { target } = event;
    const $documentItem = target.closest("#document-item");
    const $openButton = $documentItem.querySelector(".arrow");
    const $addButton = $documentItem.querySelector(".add-btn");
    const $trashButton = $documentItem.querySelector(".trash");

    if (!$openButton || !$addButton || !$trashButton) {
      return false;
    }

    $addButton.classList.remove("hidden");
    $trashButton.classList.remove("hidden");

    if ($openButton === target.closest(".arrow")) {
      $openButton.classList.add("focus");
    }
    if ($addButton === target.closest(".add-btn")) {
      $addButton.classList.add("focus");
    }
    if ($trashButton === target.closest(".trash")) {
      $trashButton.classList.add("focus");
    }
  },
  handleDocumentItemMouseOut: (event) => {
    const { target } = event;
    const $documentItem = target.closest("#document-item");
    const $openButton = $documentItem.querySelector(".arrow");
    const $addButton = $documentItem.querySelector(".add-btn");
    const $trashButton = $documentItem.querySelector(".trash");

    if (!$openButton || !$addButton || !$trashButton) {
      return false;
    }

    $addButton.classList.add("hidden");
    $trashButton.classList.add("hidden");

    if ($openButton === target.closest(".arrow")) {
      $openButton.classList.remove("focus");
    }
    if ($addButton === target.closest(".add-btn")) {
      $addButton.classList.remove("focus");
    }
    if ($trashButton === target.closest(".trash")) {
      $trashButton.classList.remove("focus");
    }
  },
  handleArrowButtonClick: (event) => {
    const $details = event.target.closest("details");
    $details.open = !$details.open;
  },
  handleDocumentItemClick: (event) => {
    event.preventDefault();

    if (
      event.target.closest(".nopage") ||
      event.target.closest(".add-btn") ||
      event.target.closest(".trash") ||
      event.target.closest(".arrow")
    ) {
      return false;
    }

    const $documentItem = event.target.closest("#document-item");

    removeElementClass("#document-item", "focus");
    $documentItem.classList.add("focus");

    return true;
  },
};

export { addEvent, handlers };
