/**
 *
 * @param targetDocument - [{id, title, documents},{...}]
 * @returns result - [id, id...]
 */
export const getRemoveIdList = (targetDocument, result = []) => {
  targetDocument.forEach((document) => {
    const { id, documents } = document;
    result.push(id);

    if (!documents.length) {
      return result;
    }

    getRemoveIdList(documents, result);
  });

  return result;
};
