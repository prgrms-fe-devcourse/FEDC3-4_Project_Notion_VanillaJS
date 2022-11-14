import { push } from "./router.js";

export default function PostList({
  $target,
  initialState,
  onRemove,
  newDocunment,
}) {
  const $postList = document.createElement("div");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const documentsList = markUp(this.state, "");
    const lootButton = `<button name="add"> + </button>`;
    $postList.innerHTML = `<p>노션 ${lootButton}${documentsList}</p>`;
  };
  const markUp = (list, text) => {
    text += `
      <ul>
      ${list
        .map(
          ({ id, title, documents }) => `
      <li data-id="${id}">${title}
      <button name="add"> + </button>
      <button name="remove"> - </button>
      ${documents.map((document) => markUp([document], text)).join("")}
      </li>
      
      `
        )
        .join("")}
      </ul>
      `;

    return text;
  };

  this.render();

  $postList.addEventListener("click", (e) => {
    const $li = e.target.closest("li");
    const { name } = e.target;
    const id = $li?.dataset.id ? $li.dataset.id : null;
    if ($li || name) {
      if (name === "remove") {
        const node = $li.querySelector("ul");
        if (node) {
          node.querySelectorAll("li").forEach((e) => onRemove(e?.dataset.id));
        }
        onRemove(id);
        return;
      } else {
        newDocunment(id, name);
      }
    }

    /**
     * li랑 name을 구분할까?
     * li를 하면 해당 내용을 push만 하고 name이 있으면 해당 버튼에 따라 메소드 주고...
     */
  });
}
