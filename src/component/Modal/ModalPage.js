// 클릭시 이벤트 세개 => 전체 화면, 닫기나 바깥 화면 클릭 시 나가짐
import { $ } from '../../lib/dom.js';
import Header from './Header.js';
import ModalEditor from './ModalEditor.js';

export default function ModalPage({
  $target,
  initialState,
  clearUntitledDocument,
  postDocument,
  switchFullScreen,
}) {
  const $modalContainer = document.createElement('section');
  const $modal = document.createElement('div');

  $modalContainer.className = 'modal-container';
  $modalContainer.setAttribute('id', 'modal');
  $modal.className = 'modal';

  $modalContainer.appendChild($modal);
  $target.appendChild($modalContainer);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
  };

  // 모달 닫기
  const onClose = () => {
    $modalContainer.classList.remove('show-modal');
  };

  // 모달 액션
  const modalActions = (type) => {
    const { id } = this.state;
    const title = $modalContainer ? $('[name=title]', $modalContainer) : '';
    const content = $modalContainer ? $('[name=content]', $modalContainer) : '';
    const titleValue = title.value + '';
    const contentValue = content.value + '';

    switch (type) {
      // document 그냥 추가 시
      case 'addDocument': {
        if (titleValue === '' || titleValue === '제목없음') {
          clearUntitledDocument();
        } else {
          postDocument(titleValue, contentValue, id);
        }
        break;
      }
      // editor로 옮길 시
      case 'fullScreen': {
        switchFullScreen(titleValue, contentValue);
        postDocument(titleValue, contentValue, id);
      }
    }

    title.value = '';
    content.value = '';
    onClose();
  };

  // Component 부분
  new Header({
    $target: $modal,
    modalActions,
  });
  new ModalEditor({
    $target: $modal,
    setParentId: (id) => {
      this.setState({
        ...this.state,
        id,
      });
    },
  });

  // modal 창 밖 클릭 시 모달창 나가기
  window.addEventListener('click', (e) => {
    if (e.target === $modalContainer) {
      modalActions('addDocument');
    }
  });

  // 처음에 esc 누르면 모달창 나가기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalActions('addDocument');
    }
  });
}
