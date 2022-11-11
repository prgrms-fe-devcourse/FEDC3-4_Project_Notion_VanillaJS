export default function DocumentFooter({ $target }) {
  const $button = document.createElement('button');
  $button.className = 'document-fix document-footer create-button';
  $target.appendChild($button);

  this.render = () => {
    $button.innerHTML = `
      <img class='plus' />
      ${'새 페이지'}
    `;

    document
      .querySelector('.plus')
      .setAttribute('src', '../../assets/plus.png');
  };

  this.render();
}
