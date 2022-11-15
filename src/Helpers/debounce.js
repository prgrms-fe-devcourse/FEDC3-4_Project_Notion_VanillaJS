export const debounceFunction = ({ $target, type, cycle, callBack }) => {
  let setDebounce;
  $target.addEventListener(type, (e) => {
    if (setDebounce) {
      clearTimeout(setDebounce);
    }
    setDebounce = setTimeout(() => callBack({ $target: e.target }), cycle);
  });
};
