import { request } from "../utils/api.js";
import { initRoute, push } from "../utils/router.js";
import DocumentList from "./DocumentList.js";
import Header from "./Header.js";

export default function DocumentPage({ $target, onClickTitle }) {
  const $page = document.createElement("div");
  $page.className = "document-page";
  const documentList = new DocumentList({
    $target: $page,
    initialState: [],
    onClickRootAdd: async () => {
      const createPost = await request(`/documents`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: "null",
        }),
      });
      push(`/documents/${createPost.id}`);
    },

    onClickRemove: async (id) => {
      if (id == window.location.pathname.split("/")[2]) {
        if (confirm("현재 페이지를 삭제하시겠습니까?")) {
          await request(`/documents/${id}`, {
            method: "DELETE",
          });
          push("/");
        }
      } else {
        if (confirm("해당 페이지를 삭제하시겠습니까?")) {
          await request(`/documents/${id}`, {
            method: "DELETE",
          });
          fetchDocument();
        }
      }
    },

    onClickAdd: async (id) => {
      const addPost = await request(`/documents/`, {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: id,
        }),
      });
      push(`/documents/${addPost.id}`);
    },
  });

  new Header({
    $target: $page,
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
  $target.prepend($page);

  this.render = async () => {
    await fetchDocument();
  };

  this.route = () => {
    this.setState();
  };

  initRoute(() => fetchDocument());

  $page.addEventListener("click", (e) => {
    const { target } = e;
    const element = target.closest("li");
    if (element) {
      const { id } = element.dataset;
      if (target.className === "list-title") {
        onClickTitle(id);
      }
    }
  });
}
