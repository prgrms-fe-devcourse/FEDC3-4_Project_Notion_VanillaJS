import { isElement } from "./validate.js"

export const addClass = ($element, ...names) => {
  if(!isElement($element)) return;
  names.forEach(name => $element.classList.add(name));
}

export const removeClass = ($element, ...names) => {
  if(!isElement($element)) return;
  names.forEach(name => $element.classList.remove(name));
}

export const hasClass = ($element, name) => {
  if(!isElement($element)) return;
  return $element.classList.contains(name)
}

export const debounce = (func, timeout = 500) => {
  let timerId = null;

  return (...args) => {
    if(timerId !== null){
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => func(...args), timeout)
  };
}