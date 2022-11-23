import DocumentItem from "./DocumentItem.js";
import { createDocumentsListElement } from "../../utils/helper.js";

export default function Details({
  $target,
  initialState = {
    id: null,
    title: "",
    documents: [],
  },
  onAddButtonClick,
}) {
  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.render();
  };

  this.setState = (nextState) => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };

  this.render = () => {
    const { documents } = this.state;

    this.$target.innerHTML = `
      <details id="document-details">
        <summary></summary>
        <ul>${createDocumentsListElement(documents)}</ul>
      </details>
    `;

    this.mounted();
  };

  this.mounted = () => {
    const $rootDocument = this.$target.querySelector("summary");
    const { id, title, documents } = this.state;

    new DocumentItem({
      $target: $rootDocument,
      initialState: {
        id,
        title,
      },
      onAddButtonClick,
    });

    documents.forEach(({ id, title, documents }) => {
      const $li = this.$target.querySelector(`[data-document-id="${id}"]`);

      new Details({
        $target: $li,
        initialState: {
          title,
          id,
          documents,
        },
        onAddButtonClick,
      });
    });
  };

  this.init();
}
