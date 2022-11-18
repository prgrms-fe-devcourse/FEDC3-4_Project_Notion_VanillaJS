export default function Editor({ $container, initialState, onEdit }) {
  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  let isMount = false;
  this.render = () => {
    if (!isMount) {
      $container.innerHTML = `
				<div class="editor" style="display:flex; flex-direction:column">
					<input type="text" id="title" placeholder="제목을 입력하세요"></input>
					<textarea id="content" placeholder="내용을 입력하세요" style="height:100vh"></textarea> 
				</div>
		`;
      isMount = true;
    }
    $container.querySelector('input').value = this.state.title;
    $container.querySelector('textarea').value = this.state.content;
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
    }, 2500);
  });
}
