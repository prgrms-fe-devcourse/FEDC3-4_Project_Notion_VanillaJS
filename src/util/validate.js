export const validateDcouments = (documents, isRecursive = true) => {
  try {
    if (!Array.isArray(documents)) throw new TypeError('documents가 배열이 아닙니다.');
    for (const { id, title, 'documents' : subDocuments } of documents) {
      if (typeof id !== 'number') throw new TypeError(`id ${id}는 정수가 아닙니다.`);
      if (typeof title !== 'string') throw new TypeError(`title ${title}은 문자열이 아닙니다.`);
      if (isRecursive) validateDcouments(subDocuments);
    }
  } catch (e) {
    console.error(e);
  }
}

export const validateSelectedDocument = ({ id, title, 'documents' : subDocuments }) => {
  try {
    if (id === null) return;
    if (typeof id !== 'number') throw new TypeError(`id ${id}는 정수가 아닙니다.`);
    if (typeof title !== 'string') throw new TypeError(`title ${title}은 문자열이 아닙니다.`);
    const isRecursive = false
    validateDcouments(subDocuments, isRecursive)
  } catch (e) {
    console.error(e);
  }
}