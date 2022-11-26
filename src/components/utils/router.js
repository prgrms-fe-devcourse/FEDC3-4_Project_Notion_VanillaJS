import { request } from "../../api/api.js";
import {
  classNameObj,
  DEFAULT_TITLE,
  EVENT_HEADER_CHANGE,
  EVENT_ROUTE_PUSH,
  EVENT_ROUTE_CREATE,
  EVENT_ROUTE_PUT,
  EVENT_ROUTE_REMOVE,
  SLASH_DOCUMENTS,
} from "./constants.js";

const { DOCUMENT_BLOCK, TITLE } = classNameObj;

export const initRouter = (onRoute) => {
  const removeAllDocument = async (document) => {
    for (const subDocument of document.documents) {
      removeAllDocument(subDocument);
    }

    await request(`${SLASH_DOCUMENTS}/${document.id}`, {
      method: "DELETE",
    });
  };

  //event handlers
  window.addEventListener("popstate", () => onRoute());

  window.addEventListener(EVENT_ROUTE_PUSH, (e) => {
    const { nextUrl, parentId } = e.detail;

    if (!nextUrl) return;

    history.pushState(null, null, nextUrl);
    onRoute({ parentId });
  });

  window.addEventListener(EVENT_ROUTE_REMOVE, async (e) => {
    const { id, parentId } = e.detail;

    if (!id) return;

    const removedDocument = await request(`${SLASH_DOCUMENTS}/${id}`);

    await removeAllDocument(removedDocument);

    routePush(`${parentId ? `${SLASH_DOCUMENTS}/${parentId}` : "/"}`);
  });

  window.addEventListener(EVENT_ROUTE_CREATE, async (e) => {
    const { id } = e.detail;

    const createNewDocument = await request(`${SLASH_DOCUMENTS}`, {
      method: "POST",
      body: JSON.stringify({
        title: DEFAULT_TITLE,
        content: "",
        parent: id,
      }),
    });
    console.log(createNewDocument);

    routePush(`${SLASH_DOCUMENTS}/${createNewDocument.id}`, id);
  });

  window.addEventListener(EVENT_ROUTE_PUT, async (e) => {
    const { id, title, content } = e.detail;

    await request(`${SLASH_DOCUMENTS}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
    });

  });

  window.addEventListener(EVENT_HEADER_CHANGE, (e) => {
    const { id, title } = e.detail;

    const documentBlockList = e.target.document.body.querySelectorAll(`.${DOCUMENT_BLOCK}`);
    let currentDocumentBlock = null;

    documentBlockList.forEach((e) => {
      const dataId = e.dataset.id;

      if (parseInt(dataId) === id) {
        currentDocumentBlock = e;
      }
    });

    if (!currentDocumentBlock) return;

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

export const routePush = (nextUrl, parentId) => {
  window.dispatchEvent(
    new CustomEvent(EVENT_ROUTE_PUSH, {
      detail: {
        nextUrl,
        parentId
      },
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
