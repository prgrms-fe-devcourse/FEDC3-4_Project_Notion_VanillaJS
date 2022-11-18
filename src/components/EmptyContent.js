export default function EmptyContent({ $container }) {
  this.render = () => {
    $container.innerHTML = `
			<div>
				<p class="empty-content">문서를 기록하고 관리하실 수 있습니다</p>
			</div>
		`;
  };
}
