import { Editor } from "../Editor/Editor.js";
import { getDocument, setDocument, removeDocument } from "../../util/index.js";
import { debounce } from "../../util/index.js";

export function DocumentEdit({ $target, onEditDocument }) {

    const compareStateWithStoredState = async ({ nextState, state }) => {

        const { id } = nextState;
        const key = `document-${id}`;

        const storedState = getDocument(key);

        if (storedState &&
            storedState.updatedAt > nextState.updatedAt &&
            confirm('이미 저장된 내용이 있습니다. 저장하시겠습니까?')
        ) {
            const { id, title, content } = storedState;

            await onEditDocument({ docId: id, content: { title, content } });

            removeDocument(key);

            return { ...state, ...storedState };
        }

        return {...state, ...nextState };
    }

    const storeAtStorageWhileInput = ({ state }) => {
        const { id } = state;
        const key = `document-${id}`;

        setDocument(key, state);
    }

    const editor = new Editor({
        $target,
        compareStateWithStoredState,
        storeAtStorageWhileInput: debounce(storeAtStorageWhileInput, 800),
        onEditDocument: debounce(onEditDocument, 1000),
    });

    this.render = ({ state }) => {
        editor.render({ state });
    }
}
