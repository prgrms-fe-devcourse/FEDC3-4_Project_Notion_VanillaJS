import { createElement } from './createElement.js';

const TRIGGERS = {
  heading1: {
    trigger: '# ',
    tagName: 'h1',
    offset: 2,
  },
  heading2: {
    trigger: '## ',
    tagName: 'h2',
    offset: 3,
  },
  heading3: {
    trigger: '### ',
    tagName: 'h3',
    offset: 4,
  },
};

const CARET_ID = 'caret';

const makeRichContent = ($editor, currentNode, parentNode) => {
  if (parentNode.tagName !== 'DIV') return;

  for (const key in TRIGGERS) {
    const { trigger, tagName, offset } = TRIGGERS[key];
    const { textContent } = currentNode;

    if (textContent.indexOf(trigger) === 0) {
      _setCaret($editor);

      const newNode = createElement({
        element: tagName,
        content: textContent.substring(offset),
      });

      parentNode.replaceChild(newNode, currentNode);

      _getCaret($editor);
    }
  }

  function _setCaret($node) {
    const spanHasCaret = createElement({ element: 'span', id: CARET_ID });
    window.getSelection().getRangeAt(0).insertNode(spanHasCaret);
    $node.blur();
  }

  function _getCaret($node) {
    $node.focus();
    const range = document.createRange();
    const spanHasCaret = document.getElementById(CARET_ID);
    range.selectNode(spanHasCaret);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    range.deleteContents();
  }
};

export default makeRichContent;
