import { request } from "./api.js";

const bringAllList = (list, type) => {
  const bringData = [];
  const stack = [list];

  while (stack.length > 0) {
    const nextList = stack.pop();

    if (nextList.documents) {
      for (let i = nextList.documents.length - 1; i >= 0; i--) {
        stack.push(nextList.documents[i]);
      }
    }

    if (type === "id") bringData.push(nextList.id);
    else bringData.push(nextList.title);
  }

  return bringData;
};

export const bringData = async () => {
  const bringIdData = [];
  const bringTitleData = [];
  const documentListData = await request("/documents", { method: "GET" });
  documentListData.forEach((doc) => {
    bringIdData.push(...bringAllList(doc, "id"));
  });
  documentListData.forEach((doc) => {
    bringTitleData.push(...bringAllList(doc, "title"));
  });

  return [bringIdData, bringTitleData];
};
