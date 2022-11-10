import { request } from "../utils/api.js";
import { push } from "../utils/router.js";
import DocumentList from "./DocumentList.js";

export default function DocumentPage({ $target, onClickTitle }) {
  const $page = document.createElement("div");

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
        if (confirm("현재 페이지를 삭제하겠습니까?")) {
          await request(`/documents/${id}`, {
            method: "DELETE",
          });
          push("/");
        }
      } else {
        if (confirm("해당 페이지를 삭제하겠습니까?")) {
          await request(`/documents/${id}`, {
            method: "DELETE",
          });
          this.fetchDocument();
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

  this.fetchDocument = async () => {
    const posts = await request("/documents");
    documentList.setState(posts);
    this.render();
  };

  this.render = () => {
    $target.appendChild($page);
  };

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
