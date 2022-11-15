export const debounceFunction = ({ $target, type, cycle, callback }) => {
  let setDebounce;
  $target.addEventListener(type, (e) => {
    if (setDebounce) {
      clearTimeout(setDebounce);
    }
    setDebounce = setTimeout(() => callback({ $target: e.target }), cycle);
  });
};
