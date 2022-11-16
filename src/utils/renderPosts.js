export const renderPosts = (root, posts, sub) => {
  let $ul = document.createElement("ul");
  root.appendChild($ul);

  posts.forEach((post) => {
    let $li = document.createElement("li");
    $li.setAttribute("data-id", post.id);
    $li.innerHTML = `
      ${post.title ? post.title : "제목 없음"}
      ${
        !sub
          ? `
        <button class="post-create">+</button>
        <button class="post-delete">x</button>`
          : ""
      }
    `;

    $ul.appendChild($li);
    if (post.documents.length) {
      renderPosts($li, post.documents, sub);
    }
  });
};
