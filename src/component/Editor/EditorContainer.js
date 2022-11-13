import Editor from './Editor.js';

export default function EditorContainer({ $target, intialState }) {
  const $editorContainer = document.createElement('section');
  $editorContainer.className = 'editor-container';

  $target.appendChild($editorContainer);

  console.log($target);
  new Editor({
    $target: $editorContainer,
    initialState: {},
  });
}
