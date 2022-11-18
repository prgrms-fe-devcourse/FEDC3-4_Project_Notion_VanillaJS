export default function Editor({ $container, initialState, onEdit }) {
  const $editor = document.createElement('div');
  $editor.className = 'editor hide';
  $editor.innerHTML = `
		<input type="text" id="title" placeholder="제목을 입력하세요"></input>
		<textarea id="content" placeholder="내용을 입력하세요" style="height:100vh"></textarea> 
	`;
  $container.appendChild($editor);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { isVisible, title, content } = this.state;
    if (!isVisible) {
      $editor.classList.add('hide');
      return;
    }

    $editor.classList.remove('hide');
    $container.querySelector('input').value = title;
    $container.querySelector('textarea').value = content;
  };

  let timer = null;
  $container.addEventListener('input', (e) => {
    const { id, value } = e.target;
    if (!id) return;

    // 디바운스 아닌가? 스로틀?
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      const newState = {
        ...this.state,
        [id]: value,
      };
      console.log(id); // id로 title 변경인지, content변경인지 체크
      onEdit(newState);
    }, 1000);
  });
}
