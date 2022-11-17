let timer = null;

export const debounce = (callback, time = 100) => {
  if (timer !== null) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    callback();
  }, time);
};
