import { request } from "./api.js";
import { push } from "./router.js";

export const clickRootAdd = async () => {
  const createPost = await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title: "제목 없음",
      parent: "null",
    }),
  });
  push(`/documents/${createPost.id}`);
};

export const clickRemove = async (id) => {
  const curId = window.location.pathname.split("/")[2];
  if (id === curId) {
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
      if (curId) {
        push(`/documents/${curId}`);
      } else {
        push(`/`);
      }
    }
  }
};

export const clickAdd = async (id) => {
  const addPost = await request(`/documents/`, {
    method: "POST",
    body: JSON.stringify({
      title: "제목 없음",
      parent: id,
    }),
  });
  push(`/documents/${addPost.id}`);
};
