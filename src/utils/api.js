import { API_END_POINT } from "../../baseUrl.js";

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-type": "application/json",
        "x-username": "hyejun",
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error("API 처리 오류");
  } catch (e) {
    console.error(e);
  }
};

export const fetchPostList = async () => {
  const postList = await request("/documents");
  return postList;
};

export const fetchPost = async (postId) => {
  const post = await request(`/documents/${postId}`);
  return post;
};

export const createPost = async (parent) => {
  const newPost = await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title: "제목 없음",
      parent,
    }),
  });
  return newPost;
};

export const updatePost = async (post) => {
  await request(`/documents/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
};

export const deletePost = async (postId) => {
  await request(`/documents/${postId}`, {
    method: "DELETE",
  });
};
