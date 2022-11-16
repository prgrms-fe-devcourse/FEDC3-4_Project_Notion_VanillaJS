import { request } from "./request.js";

export const createPost = async post => {
  const createdPost = await request("/documents", {
    method: "POST",
    body: JSON.stringify(post),
  });
  return createdPost;
};

export const changePost = async post => {
  await request(`/documents/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
  });
};

export const fetchPost = async id => {
  const post = await request(`/documents/${id}`);
  return post;
};

export const deletePost = async id => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};
