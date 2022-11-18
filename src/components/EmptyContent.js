export default function EmptyContent({ $container, isVisible }) {
  this.isVisible = isVisible;

  const $emptyContentContainer = document.createElement('div');
  $emptyContentContainer.className = 'empty-content-container hide';
  $emptyContentContainer.innerHTML = `
		<h2>Welcome to Notion by Suhwa</h2>
		<p>문서를 기록하고 관리하실 수 있습니다</p>
	`;
  $container.appendChild($emptyContentContainer);

  this.setIsVisible = (newState) => {
    this.isVisible = newState;
    this.render();
  };

  this.render = () => {
    if (this.isVisible) {
      $emptyContentContainer.classList.remove('hide');
    } else {
      $emptyContentContainer.classList.add('hide');
    }
  };
}
