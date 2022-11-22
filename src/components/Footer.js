import { isNew } from "../utils/isNew.js";
import { push } from "../utils/router.js";

export default function Footer({ $target, initialState }) {
  isNew(Footer, this);
  const $footer = document.createElement("footer");

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { title, id } = this.state;
    $footer.innerHTML = `
    <div class="sub-page-container">
      - 하위 페이지 -
        ${
          title.length > 0
            ? title
                .map(
                  (el, idx) =>
                    `<div class="sub-page-title" data-id=${id[idx]}>${el}</div>`
                )
                .join("")
            : `
              <div class="sub-page-title"><i>하위 페이지 없음<i></div>
            `
        }
    </div>
    `;
  };

  $footer.addEventListener("click", (e) => {
    const { target } = e;
    const $title = target.closest(".sub-page-title");
    if ($title) {
      const { id } = $title.dataset;
      if (id) {
        push(`/documents/${id}`);
      }
    }
  });

  $target.appendChild($footer);
}
