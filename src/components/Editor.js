export default function Editor({ $target }) {
  const $div = document.createElement('div');
  $div.className = 'editor';
  $target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
      <input class='title' placeholder='제목 없음' />
      <textarea class='content' placeholder='내용을 입력하세요'></textarea>
    `;
  };

  this.render();
}
