import { session } from "./storage.js";

export const LIST_SCROLLTOP_SAVE_KEY = "listScrollPos";
export const SET_SCROLL_POS = 'set-scroll-position';

export const goToListScrollPos = ($list) => {
  var listScrollPos = session.getItem(LIST_SCROLLTOP_SAVE_KEY, 0);
  console.log(listScrollPos)
  if (listScrollPos > 0) {
    $list.scrollTo(0, listScrollPos);
    session.removeItem(LIST_SCROLLTOP_SAVE_KEY);
  }
};

export const setListScrollPos = ({position = 0, calculate = ''}) => {
  window.dispatchEvent(new CustomEvent(SET_SCROLL_POS, {
    detail: {
      position,
      calculate
    }
  }))
}
