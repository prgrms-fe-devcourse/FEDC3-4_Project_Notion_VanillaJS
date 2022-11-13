// 클릭시 이벤트 세개 => 전체 화면, 닫기나 바깥 화면 클릭 시 나가짐
import Header from './Header.js';
import ModalEditor from './ModalEditor.js';

export default function ModalContainer({ $target }) {
  const $modalContainer = document.createElement('section');
  const $modal = document.createElement('div');

  $modalContainer.className = 'modal-container';
  $modal.className = 'modal';

  $modalContainer.appendChild($modal);
  $target.appendChild($modalContainer);

  new Header({ $target: $modal });
  new ModalEditor({ $target: $modal });
}
