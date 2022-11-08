import Header from "../Todolist/Header.js";
import TodoForm from "../Todolist/TodoForm.js";
import TodoList from "../Todolist/TodoList.js";
import TodoCount from "../Todolist/TodoCount.js";
import { setItem, getItem } from "../../Helpers/setStorage.js";
import { isConstructor } from "../../Helpers/isConstructor.js";
import { MINIMUM_INPUT_LENGTH, I_ERROR_MESSAGE } from "../../constants.js";

export default function App({ $target }) {
    isConstructor(new.target);
    const localTodoList = getItem("todos");
    const reload = nextState => {
        todoList.setState(nextState);
        todoCount.setState(nextState);
    };

    new Header({
        $target,
        text: "Simple Todo List",
    });

    new TodoForm({
        $target,
        onSubmit: ({ $target }) => {
            if ($target.value.length > MINIMUM_INPUT_LENGTH) {
                const nextState = [
                    ...todoList.state,
                    {
                        text: $target.value,
                        isCompleted: false,
                    },
                ];
                reload(nextState);
            } else {
                alert(I_ERROR_MESSAGE.NOT_OVER_MINIMUM_INPUT_LENGTH);
            }
            $target.value = "";
        },
    });

    const todoList = new TodoList({
        $target,
        initialState: localTodoList,
        onChangeComplite: ({ $target }) => {
            const nextState = todoList.state;
            const index = $target.closest("[data-id]").dataset.id;
            nextState[index].isCompleted = !nextState[index].isCompleted;
            reload(nextState);
        },
        onRemove: ({ $target }) => {
            const nextState = todoList.state;
            const index = $target.closest("[data-id]").dataset.id;
            nextState.splice(index, 1);
            reload(nextState);
        },
    });

    const todoCount = new TodoCount({
        $target,
        initialState: localTodoList,
    });

    window.addEventListener("beforeunload", () => {
        setItem("todos", JSON.stringify(todoList.state));
    });
}
