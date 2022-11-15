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
    const text = $modalContainer ? $('[name=text]', $modalContainer) : '';
    const title = $modalContainer ? $('[name=title]', $modalContainer) : '';
    const titleValue = title.value + '';

    titleValue === '' || titleValue === '제목없음'
      ? clearUntitledDocument()
      : postDocument(titleValue, id);

    title.value = '';
    text.value = '';
    onClose();
  };

  // editor로
  const sendStatesToEditor = () => {
    const { id } = this.state;
    const text = $modalContainer ? $('[name=text]', $modalContainer) : '';
    const title = $modalContainer ? $('[name=title]', $modalContainer) : '';
    const textValue = text.value + '';
    const titleValue = title.value + '';

    switchFullScreen(titleValue, textValue);
    postDocument(titleValue, id);

    title.value = '';
    text.value = '';
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
