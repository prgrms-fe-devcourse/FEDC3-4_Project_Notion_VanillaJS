export const renderPosts = (root, posts, sub, down = false) => {
  let $ul = document.createElement("ul");
  if (down) {
    $ul.classList.add("post-hide", "sub-post");
  }
  root.appendChild($ul);

  posts.forEach((post) => {
    let $li = document.createElement("li");
    $li.setAttribute("data-id", post.id);
    $li.innerHTML = `
      <div class="post">
        <div>    
          <span>
            <button class="toggle-button" data-is-opened="false">&#9656;</button>
          </span>
          <span class="post-title">${
            post.title ? post.title : "제목 없음"
          }</span>
        </div>
        ${
          !sub
            ? `
            <div class="button-group">
              <button class="post-create">&#10010;</button>
              <button class="post-delete">&#10006;</button>
            </div>`
            : ""
        }
      </div>
    `;

    $ul.appendChild($li);
    if (post.documents.length) {
      renderPosts($li, post.documents, sub, true);
    } else {
      let $ul = document.createElement("ul");
      $ul.setAttribute("class", "post-hide");
      $ul.innerHTML = `<span class="no-sub-page">하위 페이지 없음</span>`;
      $li.appendChild($ul);
    }
  });
};
