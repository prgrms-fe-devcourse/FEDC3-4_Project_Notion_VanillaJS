import { ERROR_MESSAGE } from "../constants.js";

export const isConstructor = (target) => {
  if (!target) {
    throw new Error(ERROR_MESSAGE.NOT_CONSTRUCTOR);
  }
};
