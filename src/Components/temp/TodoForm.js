import { isConstructor } from "../../Helpers/isConstructor.js";

export default function TodoForm({ $target, onSubmit }) {
    isConstructor(new.target);
    const $form = document.createElement("form");
    $target.appendChild($form);

    $form.innerHTML = `
      <label for="todoForm">Todo</label>
      <input type="text" id="todoForm" placeholder="할일을 입력하세요" autofocus />
      <button>Add</button>`;

    $form.addEventListener("submit", e => {
        e.preventDefault();
        onSubmit({ $target: $form.querySelector("#todoForm") });
    });
}
