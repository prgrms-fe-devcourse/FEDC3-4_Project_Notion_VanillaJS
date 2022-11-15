export const clearDiv = ($className) => {
  const $div = document.querySelector($className);
  if ($div) {
    $div.remove();
  }
};
