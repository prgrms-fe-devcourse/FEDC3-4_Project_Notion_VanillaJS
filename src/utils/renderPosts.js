export const renderPosts = (root, posts, sub) => {
  let $ul = document.createElement("ul");
  root.appendChild($ul);

  posts.forEach((post) => {
    let $li = document.createElement("li");
    $li.setAttribute("data-id", post.id);
    $li.innerHTML = `
      <div class="post">
        <div>    
          <button class="toggle-button">&#9656;</button>
          <span class="post-title">${post.title ? post.title : "제목 없음"}</span>
        </div>
        ${!sub? `
            <div class="button-group">
              <button class="post-create">&#10010;</button>
              <button class="post-delete">&#10006;</button>
            </div>` : ""
        }
      </div>
    `;

    $ul.appendChild($li);
    if (post.documents.length) {
      renderPosts($li, post.documents, sub);
    }
  });
};
