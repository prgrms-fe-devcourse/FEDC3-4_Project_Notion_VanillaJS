import { EVENT, EVENT_KEY, STORAGE_KEY, TEXT } from '../utils/constants.js';
import { getLowerDocuments } from '../utils/getDocuments.js';
import { getTitlesThroughRoot } from '../utils/getWayThroughRoot.js';
import { getItem } from '../utils/storage.js';
import Modal from './modal.js';

export default function Editor({
  $target,
  initialState = {
    document: {
      title: '',
      content: '',
      id: null,
    },
    documents: [],
  },
  optimisticTitleUpdate,
  onEditing,
  openDocument,
}) {
  const $editor = document.createElement('div');
  $editor.classList.add('editor', 'flex-item', 'flex-column');

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  this.setEvent = () => {
    const $title = $editor.querySelector('[name=title]');
    const $content = $editor.querySelector('[name=content]');

    if ($title) {
      $title.addEventListener(EVENT.KEYUP, (e) => {
        if (e.key === EVENT_KEY.ENTER) {
          e.preventDefault();
          $content.focus();
        }

        const nextDocument = { ...this.state.document, title: e.target.textContent };

        optimisticTitleUpdate(nextDocument);
        onEditing(nextDocument);
      });
    }
    if ($content) {
      $content.addEventListener(EVENT.KEYDOWN, (e) => {
        const selection = window.getSelection();
        const { anchorNode } = selection;
        if (e.key === EVENT_KEY.BACKSPACE && anchorNode.nodeName === '#text') {
          const $parent = anchorNode.parentNode;
          const text = $parent.innerHTML;
          removeModal($parent, text);
        }
      });

      $content.addEventListener(EVENT.KEYUP, (e) => {
        const selection = window.getSelection();
        if (!selection.rangeCount) return null;
        const { anchorNode } = selection;

        if (e.key === EVENT_KEY.ENTER) {
          const $parent = anchorNode.parentNode;
          if ($parent.classList.contains('editor-content')) {
            anchorNode.classList = '';
          } else {
            $parent.classList = '';
          }
        } else if (e.key === EVENT_KEY.SPACE) {
          if (anchorNode.nodeName === '#text' && $target.querySelector('.modal-wrapper')) {
            const $parent = anchorNode.parentNode;
            const text = $parent.innerHTML;
            const keyword = text.substr(text.lastIndexOf(EVENT_KEY.AT) + 1);

            modal.setState({ keyword });
            modal.render();
            return;
          }

          e.preventDefault();
          let $parent = anchorNode.parentNode;

          if ($parent.classList.contains('editor-content')) {
            $parent.innerHTML = `<div>${anchorNode.textContent}</div>`;
            $parent = $parent.firstChild;
          }

          let currentLine = $parent.innerHTML;
          if (currentLine.indexOf('# ') === 0) {
            currentLine = currentLine.substr(2);
            $parent.classList.remove('h2', 'h3');
            $parent.classList.contains('h1')
              ? $parent.classList.remove('h1')
              : $parent.classList.add('h1');
          } else if (currentLine.indexOf('## ') === 0) {
            currentLine = currentLine.substr(3);
            $parent.classList.remove('h1', 'h3');
            $parent.classList.contains('h2')
              ? $parent.classList.remove('h2')
              : $parent.classList.add('h2');
          } else if (currentLine.indexOf('### ') === 0) {
            currentLine = currentLine.substr(4);
            $parent.classList.remove('h1', 'h2');
            $parent.classList.contains('h3')
              ? $parent.classList.remove('h3')
              : $parent.classList.add('h3');
          } else if (currentLine.indexOf('* ') === 0) {
            currentLine = currentLine.substr(2);
            $parent.classList.contains('strong')
              ? $parent.classList.remove('strong')
              : $parent.classList.add('strong');
          } else if (currentLine.indexOf('- ') === 0) {
            currentLine = currentLine.substr(3);
            $parent.classList.contains('strike')
              ? $parent.classList.remove('strike')
              : $parent.classList.add('strike');
          } else if (currentLine.indexOf('/ ') === 0) {
            currentLine = currentLine.substr(2);
            $parent.classList.contains('italic')
              ? $parent.classList.remove('italic')
              : $parent.classList.add('italic');
          } else if (currentLine.indexOf('_ ') === 0) {
            currentLine = currentLine.substr(2);
            $parent.classList.contains('underline')
              ? $parent.classList.remove('underline')
              : $parent.classList.add('underline');
          }

          currentLine = `${currentLine === '' ? '<br>' : currentLine}`;
          if ($parent.innerHTML !== currentLine) {
            $parent.innerHTML = currentLine;
          }
        } else if (e.key === EVENT_KEY.AT) {
          const range = selection.getRangeAt(0).cloneRange();
          if (!range.getClientRects) return null;

          range.collapse(0);
          const rects = range.getClientRects();
          if (rects.length <= 0) return null;

          const { x, y } = rects[0];
          const $parent = anchorNode.parentNode;
          $parent.classList.add('current-link');

          modal.setState({ documents: this.state.documents, position: { x, y } });
          modal.render();
        } else if (e.key === EVENT_KEY.ESC) {
          const $parent = anchorNode.parentNode;
          const text = $parent.innerHTML;
          removeModal($parent, text);
        } else {
          if (anchorNode.nodeName === '#text' && $target.querySelector('.modal-wrapper')) {
            const $parent = anchorNode.parentNode;
            const text = $parent.innerHTML;
            const keyword = text.substr(text.lastIndexOf(EVENT_KEY.AT) + 1);

            modal.setState({ keyword });
            modal.render();
          }
        }

        if (Object.values(EVENT_KEY.DISABLE_API_CALL).includes(e.key)) {
          return;
        }

        const nextDocument = { ...this.state.document, content: e.target.innerHTML };

        optimisticTitleUpdate(nextDocument);
        onEditing(nextDocument);
      });
    }
  };

  const modal = new Modal({
    $target,
    initialState: {
      documents: this.state.documents,
    },
    onEditing: async (content) => {
      const nextDocument = { ...this.state.document, content };
      await optimisticTitleUpdate(nextDocument);
      await onEditing(nextDocument);
      setDocumentLinkEvents();
    },
  });

  $editor.innerHTML = `
      <div class='editor-header flex-row' name='header'></div>
      <div class='editor-title' contenteditable placeholder='${TEXT.DEFAULT_TITLE}'' name='title'></div>
      <div class='editor-content' contenteditable name='content' placeholder='${TEXT.DEFAULT_CONTENT}'></div>
      <div class='editor-footer flex-row-reverse' name='footer'></div>
    `;

  this.render = () => {
    $target.appendChild($editor);
    const { title, content, documents, id } = this.state.document;
    const titles = getTitlesThroughRoot($target, id);
    $editor.querySelector('[name=header]').innerHTML = `
      ${titles
        .map((title, index) => {
          return `
            <div class='editor-header-content'>${title}</div>
            ${index !== titles.length - 1 ? `<span class='editor-header-slash'>/</span>` : ''}
          `;
        })
        .join('')}
    `;
    $editor.querySelector('[name=title]').textContent = title;
    $editor.querySelector('[name=content]').innerHTML = content;
    $editor.querySelector('[name=footer]').innerHTML = getLowerDocuments($editor, documents);

    this.handleTitleChangedDocuments();
    setDocumentLinkEvents();
  };

  const setDocumentLinkEvents = () => {
    const $documentLinks = $editor.querySelectorAll('.document-link');

    if ($documentLinks && $documentLinks.length) {
      [].forEach.call($documentLinks, ($documentLink) => {
        $documentLink.addEventListener(EVENT.CLICK, (e) => {
          const targetDocumentId = e.target.getAttribute('key');
          openDocument(targetDocumentId);
        });
      });
    }
  };

  this.handleTitleChangedDocuments = () => {
    const $documentLinks = $editor.querySelectorAll('span.document-link');
    const changedDocuments = getItem(STORAGE_KEY.CHANGED_DOCUMENTS, []);

    if ($documentLinks && $documentLinks.length && changedDocuments && changedDocuments.length) {
      let changed = false;

      [].forEach.call(changedDocuments, (changedDocument) => {
        const { id, title } = changedDocument;
        Array.from($documentLinks)
          .filter(($documentLink) => parseInt($documentLink.getAttribute('key')) === id)
          .map((filtered) => {
            if (filtered.innerHTML !== title) {
              filtered.innerHTML = title;
              changed = true;
            }
          });
      });

      if (changed) {
        this.setState({
          document: {
            ...this.state.document,
            content: $editor.querySelector('[name=content]').innerHTML,
          },
        });
      }
    }
  };

  const removeModal = ($parent, text) => {
    if (text.at(-1) === '@' && $target.querySelector('.modal-wrapper')) {
      $parent.classList.remove('current-link');
      modal.remove();
    }
  };

  this.remove = () => {
    if ($target.querySelector('.editor')) {
      $target.removeChild($editor);
    }
  };

  this.setEvent();
}
