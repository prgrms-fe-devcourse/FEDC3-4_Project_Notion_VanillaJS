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
      </li>
      ${documents.map((document) => markUp([document], text)).join("")}
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
      //push가 버튼이 아니라 li를 눌렀을 때만 .... 하게 하고 싶음
      // console.log($li.hasChildNodes());
      // console.log($li.firstChild, id);
      if (name === "remove") {
        onRemove(id);
        return;
      } else {
        newDocunment(id, name);
      }

      // if ($li) push(`/documents/${id}`);
    }
  });
}
