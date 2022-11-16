export const getElementWidth = ($target) => {
  return parseInt(window.getComputedStyle($target).width);
}