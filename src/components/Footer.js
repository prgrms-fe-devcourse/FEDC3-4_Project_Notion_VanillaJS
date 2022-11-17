export default function Footer({
  $target,
  onCreateRootDocument
}){
  const $footer = document.createElement('div');
  $footer.className = 'footer';
  $target.appendChild($footer);

  this.render = () => {
    $footer.innerHTML = `
      <i class="fas fa-plus"></i>
      <strong class="create-root">New Document</strong>
    `;
  };

  this.render();

  $footer.addEventListener('click', (e) => {
    const { target } = e;

    if(target.className === 'create-root'){
      onCreateRootDocument();
    }
  });
}