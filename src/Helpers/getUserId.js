export const getUserId = () => {
  const { pathname } = location;
  const [, userId] = pathname.split('/');
  return userId;
};
