export const getUserIdToAdress = () => {
  const { pathname } = location;
  const [, , userId] = pathname.split('/');
  return userId;
};
