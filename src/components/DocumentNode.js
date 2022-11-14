function DocumentNode({ $target, initialState, onClick }) {
  const $node = document.createElement("section");
  $node.className = "node";
  $target.appendChild($node);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { data } = this.state;
    console.log(data, "노드");

    $node.innerHTML = `
      <ul>
        ${data
          .map(({ id, title, documents }) => {
            new DocumentNode({
              $target,
              initialState: { data: documents },
            });
            return `
                <li class="node-item">
                  ${title}
                  <button class="add-button" data-parent-id="${id}">+</button>
                </li>
          `;
          })
          .join("")}
        </ul>
      `;
  };

  this.init = () => {
    this.render();
  };

  this.init();

  $node.addEventListener("click", (e) => {
    const $button = e.target.closest("button");

    if ($button?.className === "add-button") {
      const { parentId } = $button.dataset;

      if (parentId) {
        onClick(parseInt(parentId));
      }
    }
  });
}

export default DocumentNode;
