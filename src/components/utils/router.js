import { request } from "../../api/api.js";
import {
  classNameObj,
  DEFAULT_TITLE,
  EVENT_HEADER_CHANGE,
  EVENT_ROUTE_PUSH,
  EVENT_ROUTE_CREATE,
  EVENT_ROUTE_PUT,
  EVENT_ROUTE_REMOVE,
  LOCAL_STORAGE_RECENT_DOCUMENT,
} from "./constants.js";
import { removeItem } from "./storage.js";

const { DOCUMENT_BLOCK, TITLE } = classNameObj;

export const initRouter = (onRoute) => {
  const removeAllDocument = async (document) => {
    for (const subDocument of document.documents) {
      removeAllDocument(subDocument);
    }

    await request(`/documents/${document.id}`, {
      method: "DELETE",
    });
  };

  //event listener
  window.addEventListener("popstate", () => onRoute());

  window.addEventListener(EVENT_ROUTE_PUSH, (e) => {
    const { nextUrl } = e.detail;

    if (!nextUrl) return;

    history.replaceState(null, null, nextUrl);
    onRoute();
  });

  window.addEventListener(EVENT_ROUTE_REMOVE, async (e) => {
    const { id, parentId } = e.detail;

    if (!id) return;

    const removedDocument = await request(`/documents/${id}`);

    await removeAllDocument(removedDocument);
    removeItem(LOCAL_STORAGE_RECENT_DOCUMENT);

    routePush(`${parentId ? `/documents/${parentId}` : "/"}`);
  });

  window.addEventListener(EVENT_ROUTE_CREATE, async (e) => {
    const { id } = e.detail;

    const createNewDocument = await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: DEFAULT_TITLE,
        content: "",
        parent: id,
      }),
    });
    console.log(createNewDocument);

    routePush(`/documents/${createNewDocument.id}`);
  });

  window.addEventListener(EVENT_ROUTE_PUT, async (e) => {
    const { id, title, content } = e.detail;

    const res = await request(`/documents/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
    });

  });

  window.addEventListener(EVENT_HEADER_CHANGE, (e) => {
    const { id, title } = e.detail;

    const documentBlockArr = e.target.document.body.querySelectorAll(`.${DOCUMENT_BLOCK}`);
    let currentDocumentBlock = null;

    documentBlockArr.forEach((e) => {
      const dataId = e.dataset.id;

      if (parseInt(dataId) === id) {
        currentDocumentBlock = e;
      }
    });

    const currentTitleBlock = currentDocumentBlock.querySelector(`.${TITLE}`);
    currentTitleBlock.innerText = title;
  });
};

export const setHeaderChange = ({ id, title }) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_HEADER_CHANGE, {
      detail: {
        id,
        title,
      },
    })
  );
};

export const routePush = (nextUrl) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_PUSH, {
      detail: { nextUrl },
    })
  );
};

export const routeRemoveDocument = ({ id, parentId }) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_REMOVE, {
      detail: {
        id,
        parentId,
      },
    })
  );
};

export const routeCreateDocument = ({ id }) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_CREATE, {
      detail: {
        id,
      },
    })
  );
};

export const routePutDocument = ({ id, title, content }) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_PUT, {
      detail: {
        id,
        title,
        content,
      },
    })
  );
};
