import { push } from "../util/router.js";
export default function SubPostList({ $target, initialState }) {
  const $subPostList = document.createElement("div");
  $subPostList.classList.add("subPostList");
  $target.appendChild($subPostList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $subPostList.innerHTML = ` 
    ${this.state
      .map(
        (list) => `
            <div class="subTitle"  data-id=${list.id}>
            ${list.title}     
            </div>
          `
      )
      .join("")}`;
  };

  $subPostList.addEventListener("click", (e) => {
    const $li = e.target.closest(".subTitle");

    if (!$li) return;
    const { id } = $li.dataset;
    push(`/documents/${id}`);
  });

  this.render();
}
