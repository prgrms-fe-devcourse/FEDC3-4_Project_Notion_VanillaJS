const createElementHelper = (tagName, ...options) => {
  /* 예외처리 List
   - options(atrributeName)의 첫번째 자리가 # or .가 아닌 경우 예외처리하기 
   - tagName의 type이 string이 아니거나 빈값인 경우 예외처리하기
   */

  const $element = document.createElement(tagName);

  if (options.length) {
    options.forEach(option => {
      const attributeName = option.substring(1);

      if (option[0] === '#') {
        $element.setAttribute('id', attributeName);
      } else {
        $element.classList.add(attributeName);
      }
    });
  }

  return $element;
};

export default createElementHelper;
