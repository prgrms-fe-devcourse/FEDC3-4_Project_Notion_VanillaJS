const debounce = (callback, delay) => {
  let inDebounce;
  return (...args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => callback(...args), delay);
  };
};

const parseNewline = (text) => text.replaceAll("\n", "<br />");

export { debounce, parseNewline };
