const comparePostEditor = ({ title, content }) => {
  const $element = document.querySelector('.post-container');

  $element.innerHTML = `
    <input type="text" name="title" class="post-title" placeholder="제목없음" value="${title}" />
    <textarea name="content" class="post-content" placeholder="🥹 입력된 글이 없습니다." value="${content}" ></textarea>
  `;
  $element.children[1].value = content;
};

const compareSidebarTitle = ({ id, title }) => {
  const $element = document.querySelector('.sidebar-body');
  const $currentLi = [...$element.children].find(
    $li => Number($li.dataset.id) === id
  );
  const $currentSpan = $currentLi.querySelector('.sidebar-list-title');

  $currentSpan.textContent = title;
};

export { comparePostEditor, compareSidebarTitle };
