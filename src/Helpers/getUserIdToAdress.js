import { isString } from './checkError.js';

export const getUserIdToAdress = () => {
  const { pathname } = location;
  const [, userId] = pathname.split('/');
  return userId;
};
