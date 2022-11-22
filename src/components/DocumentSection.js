import { request } from "../utils/api.js";
import { initRoute } from "../utils/router.js";
import DocumentList from "./DocumentList.js";
import Header from "./Header.js";
import { clickRootAdd, clickRemove, clickAdd } from "../utils/event.js";
import { isNew } from "../utils/isNew.js";
import { setItem, getItem, removeItem } from "../utils/storage.js";

export default function DocumentSection({ $target, onClickTitle }) {
  isNew(DocumentSection, this);

  const $documentSection = document.createElement("div");
  $documentSection.className = "document-page";
  const documentList = new DocumentList({
    $target: $documentSection,
    initialState: [],
    onClickRootAdd: () => {
      clickRootAdd();
    },
    onClickRemove: (id) => {
      clickRemove(id);
    },
    onClickAdd: (id) => {
      clickAdd(id);
    },
  });

  new Header({
    $target: $documentSection,
    initialState: "김민우",
  });

  const fetchDocument = async () => {
    const posts = await request("/documents");
    posts.map((el) => {
      if (el.title === "") {
        el.title = "제목 없음";
      }
    });
    documentList.setState(posts);
  };

  this.render = async () => {
    await fetchDocument();
  };

  initRoute(() => fetchDocument());

  $documentSection.addEventListener("click", (e) => {
    const { target } = e;
    const element = target.closest("li");
    if (element) {
      const { id } = element.dataset;
      if (target.classList.contains("list-title")) {
        onClickTitle(id);
        const listClicked = `isClicked`;
        if (getItem(listClicked)) {
          removeItem(listClicked);
          setItem(listClicked, `${id}-clicked`);
        } else {
          setItem(listClicked, `${id}-clicked`);
        }
      }
    }
  });

  $target.prepend($documentSection);
}
