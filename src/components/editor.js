import { TEXT, EVENT_KEY, EVENT } from '../utils/constants.js';

export default function Editor({
  target,
  initialState = {
    document: {
      title: '',
      content: '',
    },
  },
  onEditing,
}) {
  const editor = document.createElement('div');
  editor.classList.add('editor', 'flex-item', 'flex-column');

  this.state = initialState;

  this.setState = (nextState) => {
    for (const [key, value] of Object.entries(nextState)) {
      this.state[key] = value;
    }
  };

  this.setEvent = () => {
    const $title = editor.querySelector('[name=title]');
    const $content = editor.querySelector('[name=content]');
    if ($title) {
      $title.addEventListener(EVENT.KEYUP, (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          // this.setState({
          //   ...this.state.document,
          //   title: e.target.textContent,
          // });
          // this.render();
          $content.focus();
        }

        onEditing({
          ...this.state.document,
          title: e.target.textContent,
        });
      });
    }
    if ($content) {
      $content.addEventListener(EVENT.KEYUP, (e) => {
        const selection = window.getSelection();
        const { anchorNode } = selection;

        if (e.key === EVENT_KEY.ENTER) {
          e.preventDefault();
          anchorNode.classList = '';
        } else if (e.key === EVENT_KEY.SPACE) {
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
        }

        if (Object.values(EVENT_KEY.DISABLE_API_CALL).includes(e.key)) {
          return;
        }

        onEditing({
          ...this.state.document,
          content: e.target.innerHTML,
        });
      });
    }
  };

  editor.innerHTML = `
      <div class='editor-header' name='header'>${this.state.document.title}</div>
      <div class='editor-title' contenteditable placeholder=${TEXT.DEFAULT_TITLE} name='title'></div>
      <div class='editor-content' contenteditable name='content' placeholder=${TEXT.DEFAULT_CONTENT}></div>
    `;

  this.render = () => {
    target.appendChild(editor);
    const { title, content } = this.state.document;

    editor.querySelector('[name=header]').textContent = title;
    editor.querySelector('[name=title]').textContent = title;
    editor.querySelector('[name=content]').innerHTML = content;
  };

  this.empty = () => {
    target.removeChild(editor);
  };

  this.setEvent();
}
