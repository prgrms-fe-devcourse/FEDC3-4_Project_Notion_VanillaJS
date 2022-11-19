export default function NotFoundPage({ $container, message }) {
  this.render = () => {
    $container.innerHTML = `
			<main class="not-found">
				<img src="/src/img/404.jpeg" class="not-found-img"/>
				<p class="not-found-message">${message}</p>
			</main>
		`;
  };
}
