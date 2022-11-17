export const toggle = ($button, $li) => {
  const { dataset, classList } = $button;
  const isOpened = JSON.parse(dataset.isOpened);
  const $ul = $li.querySelector("ul");
  if ($ul) {
    !isOpened ? $ul.classList.remove("hide") : $ul.classList.add("hide");
  }
  dataset.isOpened = !isOpened;
  if (!isOpened) {
    classList.add("open-toggle");
  } else {
    classList.add("close-toggle");
    setTimeout(() => {
      classList.remove("open-toggle", "close-toggle");
    }, 300);
  }
};
