export default function PostList({ $target, initialState }) {
  const $postList = document.createElement("div");
  $postList.className = "notion-list";

  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    if (nextState) {
      this.state = nextState;
      this.render();
    }
  };

  let depth = 1;
  const RenderList = (content) => {
    $postList.innerHTML += `<ul><li data-id="${content.id}">${content.title}</li></ul>`;

    console.log(depth, content.title);
    if (content.documents.length) {
      content.documents.map((doc) => {
        depth += 1;
        RenderList(doc);
        depth -= 1;
      });
    }
  };

  const Rendering = (postLists) => {
    return `
      <ul>
      ${postLists
        .map(
          ({ id, title, documents }) => `
          <li data-id="${id}" class="open">
            <button>토글</button>${title}
            ${documents ? `${Rendering(documents)}` : "하위 페이지 없음"}
          </li>
        `
        )
        .join("")}
      </ul>
    `;
  };

  this.render = () => {
    $postList.innerHTML = Rendering(this.state);
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { id } = $li.dataset;
    const idx = this.state.findIndex((item) => item.id == id);

    if ($li.className === "open") {
      $li.className = "close";
    } else if ($li.className === "close") {
      $li.className = "open";
    }
    const isDisplay = $li.className === "open" ? "block" : "none";
    for (let i = 1; i < $li.children.length; i++) {
      $li.children[i].style.display = isDisplay;
    }
  });

  // $postList.addEventListener("click", (e) => {
  //   const initial = initialState;
  //   const $test = document.createElement("ul");
  //   let $li = e.target.closest(".title");
  //   const { id, toggle } = $li.dataset;
  //   const idx = this.state.findIndex((item) => item.id == id);
  //   // const $parent = $li.parentElement;
  //   if (this.state[idx].documents.length === 0) {
  //     console.log("자식없음");
  //     this.setState(this.state[idx].documents);
  //   } else {
  //     this.setState(this.state[idx].documents);
  //   }
  //   console.log(this.state.length);
  //   if (this.state) {
  //     $test.innerHTML = `
  //     ${this.state
  //       .map(
  //         ({ id, title }) => `<li data-id="${id}" class="title">${title}</li>`
  //       )
  //       .join("")}
  //         `;
  //     $li.appendChild($test);
  //   }
  // });
}
