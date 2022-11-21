import {
  createDocument,
  deleteDocument,
  getDocumentContent,
  getRootDouments,
} from "../../api/api.js";

import SidebarHeader from "./SidebarHeader.js";
import SidebarNav from "./SidebarNav.js";
import SidebarFooter from "./SidebarFooter.js";

import { validateInstance } from "../../utils/validation.js";
import { STORAGE_KEY, STATE, DEFAULT_TEXT } from "../../utils/constants.js";
import { setItem, getItem, removeItem } from "../../utils/storage.js";

export default function Sidebar({ $target, initialState = [] }) {
  validateInstance(new.target);

  const $sidebar = document.createElement("aside");
  $sidebar.classList.add("sidebar");

  this.state = initialState;

  this.setState = async () => {
    const documentList = await getRootDouments();
    sidebarNav.setState(documentList);

    this.render();
  };

  new SidebarHeader({ $target: $sidebar });

  const sidebarNav = new SidebarNav({
    $target: $sidebar,
    initialState,
    onOpenList: (state, id) => {
      const openedList = getItem(STORAGE_KEY.OPENED_LIST, {});

      if (state === STATE.OPEN) {
        if (openedList[id]) {
          delete openedList[id];
          setItem(STORAGE_KEY.OPENED_LIST, openedList);
        } else {
          setItem(STORAGE_KEY.OPENED_LIST, { ...openedList, [id]: true });
        }
      } else if (state === STATE.CREATE) {
        if (!openedList[id]) {
          setItem(STORAGE_KEY.OPENED_LIST, { ...openedList, [id]: true });
        }
      } else if (state === STATE.DELETE) {
        id.forEach((targetId) => {
          if (openedList[targetId]) {
            delete openedList[targetId];
          }
        });

        setItem(STORAGE_KEY.OPENED_LIST, openedList);
      }

      this.setState();
    },
    onCreateDocument: async (id) => {
      const newDocument = {
        title: DEFAULT_TEXT.TITLE,
        parent: id,
      };

      await createDocument(newDocument);

      this.setState();
    },
    onDeleteDocument: async (id) => {
      const isSelected =
        Number(getItem(STORAGE_KEY.SELECTED_DOCUMENT, null)) === id;

      if (isSelected) {
        removeItem(STORAGE_KEY.SELECTED_DOCUMENT);
      }

      const currentDocument = await getDocumentContent(id);

      const { documents } = currentDocument;
      const deleteDocumentId = [];

      const deleteDocuments = (childDocuments) => {
        childDocuments.forEach(({ id, documents }) => {
          deleteDocumentId.push(id);
          if (documents.length) {
            deleteDocuments(documents);
          }
        });
      };

      if (documents.length > 0) {
        deleteDocuments(documents);
        deleteDocumentId.reverse();

        for (let i = 0; i < deleteDocumentId.length; i++) {
          await deleteDocument(deleteDocumentId[i]);
        }
      }

      deleteDocumentId.push(id);
      await deleteDocument(id);

      this.setState();

      return deleteDocumentId;
    },
  });

  new SidebarFooter({
    $target: $sidebar,
    onCreateDocument: async () => {
      const newDocument = {
        title: DEFAULT_TEXT.TITLE,
        parent: null,
      };

      await createDocument(newDocument);
      this.setState();
    },
  });

  this.render = () => {
    $target.appendChild($sidebar);
  };
}
