const addEvent = ($target, eventType, selector, callback) => {
  const children = [...$target.querySelectorAll(selector)];
  const isTarget = (target) => children.includes(target) || target.closest(selector);

  $target.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
};

const handlers = {
  onDocumentItemMouseOver: (event) => {
    const { target } = event;
    const $documentItem = target.closest("#document-item");
    const $openButton = $documentItem.querySelector(".arrow");
    const $addButton = $documentItem.querySelector(".add-btn");
    const $trashButton = $documentItem.querySelector(".trash");

    if (!$openButton || !$addButton || !$trashButton) {
      return;
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
  onDocumentItemMouseOut: (event) => {
    const { target } = event;
    const $documentItem = target.closest("#document-item");
    const $openButton = $documentItem.querySelector(".arrow");
    const $addButton = $documentItem.querySelector(".add-btn");
    const $trashButton = $documentItem.querySelector(".trash");

    if (!$openButton || !$addButton || !$trashButton) {
      return;
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
};

export { addEvent, handlers };
