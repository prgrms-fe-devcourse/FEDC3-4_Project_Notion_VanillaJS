export const getDocumentIdFromPathname = () => {
  const [, , currentDocumentId] = location.pathname.split("/");
  return currentDocumentId;
};
