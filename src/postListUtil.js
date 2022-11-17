import { request } from "../Api/api.js";

export const createPost = async (parent = null) => {
  return await request("/documents", {
    method: "POST",
    body: JSON.stringify({
      title: "",
      parent: parent,
    }),
  });
};

export const removePost = async (id) => {
  await request(`/documents/${id}`, {
    method: "DELETE",
  });
};
export const getPost = async (id) => {
  return await request(`/documents/${id}`, {
    method: "GET",
  });
};

export const renderLogic = (arr) => {
  return `
  <ul>
    ${arr
      .map(({ id, title, documents }) => {
        return documents
          ? `<li data-id="${id}">
            <div class="document" data-id="${id}" data-name="list">
              <span data-name="span-list" data-id="${id}">> ${title}</span>
              <button data-id="${id}" data-name="plus"> + </button> 
              <button data-id="${id}" data-name="minus"> x </button>
            </div>
          </li>` + renderLogic(documents)
          : `<li data-id="${id}">
          <div class="document" data-id="${id}" data-name="list">
            <span data-name="span-list" data-id="${id}">> ${title}</span>
            <button data-id="${id}" data-name="plus"> + </button> 
            <button data-id="${id}" data-name="minus"> x </button>
          </div>
        </li>`;
      })
      .join("")}
  </ul>
  `;
};
