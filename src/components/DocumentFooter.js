export default function DocumentFooter({ $target, onCreate, onScroll }) {
  const $button = document.createElement('button');
  $button.className = 'document-fix document-footer create-button';
  $target.appendChild($button);

  this.render = () => {
    $button.innerHTML = `
      <img class='plus new' />
      ${'새 페이지'}
    `;

    document.querySelector('.new').setAttribute('src', '../../assets/plus.png');

    $button.addEventListener('click', () => {
      onCreate();
      onScroll();
    });
  };

  this.render();
}
