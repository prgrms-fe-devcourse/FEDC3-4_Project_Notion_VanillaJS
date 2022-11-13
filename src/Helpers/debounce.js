let setDebounce;
this.$target.addEventListener('input', (e) => {
  if (setDebounce) {
    clearTimeout(setDebounce);
  }

  setDebounce = setTimeout(() => {
    SearchApi({
      value: e.target.value,
      isChangeLocalValue: true,
    });
  }, 500);
});
