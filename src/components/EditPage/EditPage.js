import {
  DISABLED_ID,
  ERROR_NEW_KEYWORD_MISSING,
  idNameObj,
} from "../utils/constants.js";
import { hasNewTarget } from "../utils/error.js";
import { routePutDocument } from "../utils/router.js";
import Editor from "./Editor.js";
import Header from "./Header.js";
import Topbar from "./Topbar.js";

export default function EditPage({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  const $page = document.createElement("div");
  $page.setAttribute("id", idNameObj.EDITOR_CONTAINER);

  let isInit = false;
  let timer = null;

  this.state = initialState || {
    id: DISABLED_ID,
    title: "",
    content: "",
  };

  const topbar = new Topbar({
    $target: $page,
    initialState: {},
  });

  const header = new Header({
    $target: $page,
    initialState: {
      id: this.state.id,
      title: this.state.title,
    },
    onEditing: (title) => {
      this.setState({
        ...this.state,
        title,
      });

      autoSaveDocument({ delay: 500 });
    },
  });

  const editor = new Editor({
    $target: $page,
    initialState: {
      content: this.state.content,
    },
    onEditing: (content) => {
      this.setState({
        ...this.state,
        content,
      });

      autoSaveDocument({ delay: 500 });
    },
  });

  this.setState = (nextState) => {
    if (!nextState) return;

    this.state = nextState;

    const { id, parentId, title, content } = this.state;

    header.setState({ id, title });
    editor.setState({ id, content });
    topbar.setState({ id, parentId: parentId || null });

    if (!isInit) {
      this.render();
      isInit = true;
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  const autoSaveDocument = ({ delay }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      const { id, title, content } = this.state;

      routePutDocument({ id, title, content });
    }, delay);
  };
}
