import { $ } from '../../lib/utils.js';

// 여기서 꺼내야할 데이터 => title 새로 생긴 리스트와 같이 업데이트 해줘야 함
export default function ModalEditor({ $target }) {
  const $modalEditor = document.createElement('div');
  $modalEditor.className = 'modal-editor';
  $target.appendChild($modalEditor);

  this.render = () => {
    $modalEditor.innerHTML = `
         <input
            class="editor-title"
            type="text"
            name="title"
            id="title"
            placeholder="제목 없음"
          />
          <textarea
            class="editor-text"
            name="text"
            id="text"
            placeholder="내용을 입력하세요...😁"
          ></textarea>
        `;
  };

  this.render();

  $modalEditor.addEventListener('keyup', (e) => {
    const { target } = e;
    const nameValue = target.getAttribute('name');

    if (nameValue === 'title') {
      const value = e.target.value;
      const $label = $(`[for=new]`, document);
      const $span = ($('span', $label).textContent = value);
      console.log($span, $span.value);
    }
  });
}
