export const $ = (selector, target = document) => {
  return target.querySelector(`${selector}`);
};

export const $all = (selector, target = document) => {
  return target.querySelectorAll(`${selector}`);
};

export const $createElement = (element) => {
  return document.createElement(`${element}`);
};
