import { isConstructor } from "../../Helpers/isConstructor.js";
import { checkLocalData } from "../../Helpers/checkError.js";

export default function TodoCount({ $target, initialState }) {
    isConstructor(new.target);
    const $todoCount = document.createElement("div");
    $target.appendChild($todoCount);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        checkLocalData(this.state);
        $todoCount.innerHTML = `
          <span>
            해야할 일의 수는 : ${this.state.filter(e => !e.isCompleted).length}, 전체 List 수는 : ${this.state.length}
          </span>`;
    };

    this.render();
}
