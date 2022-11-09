import { isConstructor } from "../../Helpers/isConstructor.js";

export default function DocumentEditor({ $target, initialState }) {
  isConstructor(new.target);
  const $todoList = document.createElement("ul");
  $target.appendChild($todoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    checkLocalData(this.state);
    $todoList.innerHTML = `
    ${this.state
      .map(
        ({ text, isCompleted }, index) => `
          <li data-id="${index}" style="text-decoration: ${
          isCompleted ? "line-through" : "none"
        }">
            <span class="value">${text}</span>
            <button class="deleteButton">삭제</button>
          </li>`
      )
      .join("")}
`;
  };

  $todoList.addEventListener("click", (e) => {
    if (e.target && e.target.className === "value") {
      onChangeComplite({ $target: e.target });
    }

    if (e.target && e.target.className === "deleteButton") {
      onRemove({ $target: e.target });
    }
  });

  this.render();
}
