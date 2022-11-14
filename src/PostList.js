export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderPosts = (root, posts) => {
    let $ul = document.createElement("ul");
    root.appendChild($ul);

    posts.forEach((post) => {
      let $li = document.createElement("li");
      $li.innerText = post.title;
      $ul.appendChild($li);

      if (post.documents.length) {
        renderPosts($li, post.documents);
      }
    });
  };

  this.render = () => {
    renderPosts($postList, this.state);
  };

  this.render();
}
