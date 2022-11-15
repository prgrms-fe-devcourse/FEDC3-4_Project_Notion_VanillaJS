import Editor from "./Editor.js";
import DocEditHeader from "./DocEditHeader.js";
import DocEditFooter from "./DocEditFooter.js";
import { makeElement } from "../../util/templates.js";
import { getDocument, editDocument } from "../api.js";
import { local } from "../../util/storage.js";
import { debounce } from "../../util/helper.js";

export default function DocEditPage({
  $target,
  initialState = {
    documentId: "",
  },
}) {
  const $page = makeElement("main", "doc-edit-page");
  $target.appendChild($page);

  this.state = initialState;

  let docTempSaveKey = `tempSave-${this.state}`;

  new DocEditHeader({
    $target: $page,
    onToggle: () => {},
  });

  const editor = new Editor({
    $target: $page,
    initialState: [],
    onEdit: debounce(async (document) => {
      const tempDoc = tempSave(document);
      autoSave(tempDoc);
    }, 1000),
  });

  new DocEditFooter({
    $target: $page,
  });

  const tempSave = (document) => {
    docTempSaveKey = `tempSave-${this.state}`;

    local.setItem(docTempSaveKey, {
      ...document,
      tempSaveAt: new Date(),
    });

    const docTempSave = local.getItem(docTempSaveKey, {
      title: "",
      content: "",
    });

    return docTempSave;
  };

  const autoSave = async (tempDoc) => {
    const editedDoc = await editDocument({
      documentId: this.state,
      document: {
        title: tempDoc.title,
        content: tempDoc.content,
      },
    });
    
    local.removeItem(docTempSaveKey);
    await this.setState(this.state);
  };

  this.setState = async (nextState) => {
    this.state = nextState;
    if (!nextState) {
      editor.init();
    } else {
      const currentDoc = await getDocument(this.state);
      editor.setState({
        title: currentDoc.title,
        content: currentDoc.content,
      });
    }
  };
}
