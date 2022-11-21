import { setSideBarDOM } from '../../lib/storage.js';
import { editorContent } from '../../lib/templates.js';
import { $ } from '../../lib/dom.js';

// 여기서 꺼내야할 데이터 => title 새로 생긴 리스트와 같이 업데이트 해줘야 함
export default function ModalEditor({ $target, setParentId }) {
  const $modalEditor = document.createElement('div');
  $modalEditor.className = 'modal-editor';
  $target.appendChild($modalEditor);

  this.render = () => {
    $modalEditor.innerHTML = editorContent();
  };

  this.render();

  $modalEditor.addEventListener('keyup', (e) => {
    const { target } = e;
    const nameValue = target.getAttribute('name');

    // 사이드 바 제목 바꿔주기
    if (nameValue === 'title') {
      const value = e.target.value;
      const $span = $('[data-id=new]');
      $span.textContent = value;

      const $ul = $span.closest('ul');
      const $li = $ul.closest('li');
      const $list = $ul.closest('.list');

      setSideBarDOM();

      // 부모에다가 넣기 위해 부모 id 값 받아와 넘기기
      const id = $li ? $li.getAttribute('id') : null;
      setParentId(id);
    }
  });
}
