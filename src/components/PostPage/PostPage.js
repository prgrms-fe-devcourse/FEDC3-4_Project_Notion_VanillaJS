import PostPageHeader from "./PostPageHeader.js";
import Editor from "./Editor.js";

import { modifyDocuments } from "../../api/api.js";
import { customEvent } from "../../utils/custom-event.js";
import { validateInstance } from "../../utils/validation.js";
import { debounce } from "../../utils/debounce.js";

export default function PostPage({ $target, initialState }) {
  validateInstance(new.target);

  const $postPage = document.createElement("div");
  $postPage.classList.add("post-edit-page");

  this.state = initialState;

  new PostPageHeader({ $target: $postPage });

  let timer = null;

  const editor = new Editor({
    $target: $postPage,
    initialState,
    onEditTitle: (id, data) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await modifyDocuments(id, data);
        customEvent.updateState();
      }, 100);
    },
    onEditContent: (id, data) => {
      if (timer !== null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await modifyDocuments(id, data);
      }, 300);
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    editor.setState(this.state);

    this.render();
  };

  this.render = () => {
    $target.appendChild($postPage);
  };
}
