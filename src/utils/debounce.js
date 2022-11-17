const debounce = (callback, delay) => {
  let inDebounce;
  return (...args) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => callback(...args), delay);
  };
};

export { debounce };
