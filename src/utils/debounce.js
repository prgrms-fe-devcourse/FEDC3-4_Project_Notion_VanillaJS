let timeoutId = null;

export const debounce = (callback, delay) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    callback();
  }, delay);
};
