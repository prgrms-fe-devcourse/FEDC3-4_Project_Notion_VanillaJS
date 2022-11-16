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
import { setItem, getItem } from "../../utils/storage.js";
import { OPENED_LIST, STATE } from "../../utils/constants.js";
import { addEvent } from "../../utils/custom-event.js";

export default function Sidebar({ $target, initialState = [] }) {
  validateInstance(new.target);

  const $sidebar = document.createElement("aside");
  $sidebar.classList.add("sidebar");

  this.state = initialState;

  this.setState = async () => {
    const postList = await getRootDouments();
    sidebarNav.setState(postList);
    this.render();
  };

  new SidebarHeader({ $target: $sidebar });

  const sidebarNav = new SidebarNav({
    $target: $sidebar,
    initialState,
    onOpenList: (state, id) => {
      const openedList = getItem(OPENED_LIST, {});

      if (state === STATE.OPEN) {
        if (openedList[id]) {
          delete openedList[id];
          setItem(OPENED_LIST, openedList);
        } else {
          setItem(OPENED_LIST, { ...openedList, [id]: true });
        }
      } else if (state === STATE.CREATE) {
        if (!openedList[id]) {
          setItem(OPENED_LIST, { ...openedList, [id]: true });
        }
      } else if (state === STATE.DELETE) {
        id.forEach((targetId) => {
          if (openedList[targetId]) {
            delete openedList[targetId];
          }
        });

        setItem(OPENED_LIST, openedList);
      }

      this.setState();
    },
    onCreateDocument: async (id) => {
      const newPost = {
        title: `제목 없음`,
        parent: id,
      };

      await createDocument(newPost);

      this.setState();
    },
    onDeleteDocument: async (id) => {
      const data = await getDocumentContent(id);

      const documentList = data.documents;
      const deletedPostId = [];

      const deletePostItems = (childDocuments) => {
        childDocuments.forEach(({ id, documents }) => {
          deletedPostId.push(id);
          if (documents.length) {
            deletePostItems(documents);
          }
        });
      };

      if (documentList.length > 0) {
        deletePostItems(documentList);
        deletedPostId.reverse();

        for (let i = 0; i < deletedPostId.length; i++) {
          await deleteDocument(deletedPostId[i]);
        }
      }

      deletedPostId.push(id);
      await deleteDocument(id);

      this.setState();

      return deletedPostId;
    },
  });

  new SidebarFooter({
    $target: $sidebar,
    onCreateDocument: async () => {
      const newPost = {
        title: "제목 없음",
        parent: null,
      };

      await createDocument(newPost);
      this.setState();
    },
  });

  this.render = () => {
    $target.appendChild($sidebar);
  };

  addEvent.updateState(() => this.setState());
}
