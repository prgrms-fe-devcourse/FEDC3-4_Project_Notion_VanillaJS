import { push } from "../../utils/router.js";

export default function PostList({
  $target,
  initialState,
  onRemove,
  onCreate,
}) {
  if (!(this instanceof PostList)) {
    throw new Error("new로 생성하지 않았습니다.");
  }

  const $postList = document.createElement("div");
  $postList.setAttribute("class", "post-list");
  $target.appendChild($postList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const createDocuments = ({ title, id, documents }, result) => {
    result.push(
      `<li data-id=${id} class="parent-document">
      <span>▶ ${title}</span>
      <div> 
        <button class="addBtn">+</button>
        <button class="removeBtn">-</button>
      </div>
      </li>`
    );
    if (documents.length !== 0) {
      result.push("<ul>");

      for (const document of documents) {
        const { title, id, documents } = document;
        createDocuments({ title, id, documents }, result);
      }
      result.push("</ul>");
    }
    return result;
  };

  this.render = () => {
    $postList.innerHTML = `
	  <ul>
	    ${this.state
        .map(({ title, id, documents }) =>
          createDocuments({ title, id, documents }, []).join("")
        )
        .join("")}  
	  </ul>`;
  };

  this.render();

  $postList.addEventListener("click", e => {
    const $li = e.target.closest("li");

    if ($li) {
      const { id } = $li.dataset;
      const currClassName = e.target.className;

      if (currClassName === "addBtn") {
        onCreate(id);
      } else if (currClassName === "removeBtn") {
        onRemove(id);
      } else {
        push(`/documents/${id}`);
      }
    }
  });
}
