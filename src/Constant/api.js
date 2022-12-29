export const BASE_INIT_USERNAME = 'zerosial';
export const CONTENT_TYPE = 'application/json';
export const API_HEADER = (userId) => {
  return {
    'x-username': userId ? userId : BASE_INIT_USERNAME,
    'Content-Type': CONTENT_TYPE,
  };
};
