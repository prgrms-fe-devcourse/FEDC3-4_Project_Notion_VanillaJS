export default function PostList({ $target, props }) {
  const { onPostClick, postList } = props;

  const $postList = document.createElement('div');
  $target.appendChild($postList);

  this.state = { postList: postList };
  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `
			<ul>
				${this.state.postList
          .map((post) => `<li data-id="${post.id}">${post.title}</li>`)
          .join('')}
			</ul>
		`;
  };

  this.render();
}
