import {
  DEFAULT_TITLE,
  DISABLED_ID,
  ERROR_NEW_KEYWORD_MISSING,
  LOCAL_STORAGE_RECENT_DOCUMENT,
  LOCAL_IS_GOING_TO_PUT,
  LOCAL_IS_PUTTING_OKAY,
  LOCAL_IS_WAITING_USER_ANSWER,
} from "../utils/constants.js";
import { hasNewTarget } from "../utils/error.js";
import { routePutDocument, setHeaderChange } from "../utils/router.js";
import { getItem, setItem } from "../utils/storage.js";
import Editor from "./Editor.js";
import Header from "./Header.js";
import Topbar from "./Topbar.js";

export default function EditPage({ $target, initialState }) {
  if (!hasNewTarget(new.target)) throw new Error(ERROR_NEW_KEYWORD_MISSING);

  //tags
  const $page = document.createElement("div");
  $page.setAttribute("id", "editor-container");

  let isInit = false;
  let timer = null;

  //state
  this.state = initialState || {
    id: DISABLED_ID,
    title: "",
    content: "",
  };

  //topbar with fetchButton
  const topbar = new Topbar({
    $target: $page,
    initialState: {},
  });

  //components
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

      setHeaderChange({
        id: this.state.id,
        title: this.state.title,
      });
      autoSaveDocument({ delay: 2000 });
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

      autoSaveDocument({ delay: 2000 });
    },
  });

  this.setState = (nextState) => {
    if (!nextState) return;

    this.state = nextState;

    //header, editor 변화?
    const { id, parentId, title, content } = this.state;

    header.setState({
      id,
      title: title || DEFAULT_TITLE,
    });
    editor.setState({ id, content: content || "" });
    topbar.setState({ id, parentId: parentId || null });

    //LS 저장
    setItem(LOCAL_STORAGE_RECENT_DOCUMENT, {
      ...this.state,
      tempSaveDate: new Date(),
    });

    if (!isInit) {
      this.render();
      isInit = true;
    }
  };

  this.render = () => {
    $target.appendChild($page);
  };

  //method
  const autoSaveDocument = ({ delay }) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    setItem(LOCAL_IS_GOING_TO_PUT, true);
    timer = setTimeout(async () => {
      const { id, title, content } = this.state;

      while (getItem(LOCAL_IS_WAITING_USER_ANSWER, false));
      getItem(LOCAL_IS_PUTTING_OKAY, true)
        ? routePutDocument({ id, title, content })
        : "";
      setItem(LOCAL_IS_GOING_TO_PUT, false);
    }, delay);
  };
  //event handler
}
