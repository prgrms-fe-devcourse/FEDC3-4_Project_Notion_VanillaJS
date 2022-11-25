const debounce = (callback, debounceTime) => {
  let timer;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, debounceTime);
  };
};

export default debounce;
