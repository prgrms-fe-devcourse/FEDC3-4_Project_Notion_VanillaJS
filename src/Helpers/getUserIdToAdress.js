import { isString } from './checkError.js';

export const getUserIdToAdress = () => {
  const { pathname } = location;
  const [, userId] = pathname.split('/');
  isString(userId);
  return userId;
};
