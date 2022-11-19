// 클릭시 이벤트 세개 => 전체 화면, 닫기나 바깥 화면 클릭 시 나가짐
import { $ } from '../../lib/utils.js';
import Header from './Header.js';
import ModalEditor from './ModalEditor.js';

export default function ModalContainer({
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

  // 쓰이는 함수들
  const onClose = () => {
    $modalContainer.classList.remove('show-modal');
  };

  // 이름 다시 지어야 됨 생각
  const processByTitle = () => {
    const { id } = this.state;
    const title = $modalContainer ? $('[name=title]', $modalContainer) : '';
    const content = $modalContainer ? $('[name=content]', $modalContainer) : '';
    const titleValue = title.value + '';
    const contentValue = content.value + '';

    if (titleValue === '' || titleValue === '제목없음') {
      clearUntitledDocument();
    } else {
      postDocument(titleValue, contentValue, id);
    }

    title.value = '';
    content.value = '';
    onClose();
  };

  // editor로 state 보내주기
  const sendStatesToEditor = () => {
    const { id } = this.state;
    const title = $modalContainer ? $('[name=title]', $modalContainer) : '';
    const content = $modalContainer ? $('[name=content]', $modalContainer) : '';
    const titleValue = title.value + '';
    const contentValue = content.value + '';

    switchFullScreen(titleValue, contentValue);
    postDocument(titleValue, contentValue, id);

    title.value = '';
    content.value = '';
    onClose();
  };

  // Component 부분
  new Header({ $target: $modal, onClose, processByTitle, sendStatesToEditor });
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
      processByTitle();
    }
  });

  // 처음에 esc 누르면 모달창 나가기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      processByTitle();
    }
  });
}
