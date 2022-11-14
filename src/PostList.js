export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  const renderPostList = (root, postList) => {
    let $ul = document.createElement("ul");
    root.appendChild($ul);

    postList.forEach((post) => {
      let $li = document.createElement("li");
      $li.innerText = post.title;
      $ul.appendChild($li);

      if (post.documents.length) {
        renderPostList($li, post.documents);
      }
    });
  };

  this.render = () => {
    renderPostList($postList, this.state);
  };

  this.render();
}
