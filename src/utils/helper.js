import { UNTITLED } from './contants.js';

export const isNew = (isNew) => {
  try {
    if (!isNew) {
      throw new Error('new 없이 호출됨');
    }
  } catch (e) {
    console.error(e);
  }
};

export const setDocumentTitle = (title) => {
  if (typeof title === 'string') {
    document.title = title.length > 0 ? title : UNTITLED;
  }
};
