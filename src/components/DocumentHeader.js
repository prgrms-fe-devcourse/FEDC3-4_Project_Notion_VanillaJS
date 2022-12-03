export default function DocumentHeader({ $target }) {
  const $div = document.createElement('div');
  $div.className = 'document-fix document-header';
  $target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `<span>&#9889; 원다연의 Notion</span>`;
  };

  this.render();
}
