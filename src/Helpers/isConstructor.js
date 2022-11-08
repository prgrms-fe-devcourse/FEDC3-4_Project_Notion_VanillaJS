import { I_ERROR_MESSAGE } from "../constants.js";

export const isConstructor = (target) => {
  if (!target) {
    throw new Error(I_ERROR_MESSAGE.NOT_CONSTRUCTOR);
  }
};
