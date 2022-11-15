export default function Editor({
  $target,
  initialState = { title: '', content: '' },
  onEditing,
}) {
  const $div = document.createElement('div');
  $div.className = 'editor';
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    $div.querySelector('[name=title]').value =
      this.state.title === '제목 없음' ? '' : this.state.title;
    $div.querySelector('[name=content]').value = this.state.content;
  };

  this.render = () => {
    const { title, content } = this.state;
    $div.innerHTML = `
      <input type='text' name='title' class='title' placeholder='제목 없음' value='${
        title === '제목 없음' ? '' : title
      }'/>
      <textarea name='content' class='content' placeholder='내용을 입력하세요.'>${
        !content ? '' : content
      }</textarea>
    `;
  };

  this.render();

  $div.addEventListener('keyup', (e) => {
    const { name, value } = e.target;

    if (this.state[name] !== undefined) {
      const nextState = {
        ...this.state,
        [name]: value,
      };
      this.setState(nextState);
      onEditing(this.state);

      // editor에서 title 입력 시 document list에도 바로 반영
      const $span = document
        .querySelector(`[data-id='${this.state.id}']`)
        .querySelector('span');

      if (name === 'title' && value) {
        $span.textContent = value;
      } else if (name === 'title') {
        $span.textContent = '제목 없음';
      }
    }
  });
}
