import { ERROR } from "./constants.js";

export const validateInstance = (instance) => {
  if (!instance) {
    throw new Error(ERROR.NOT_INSTANCE_OF_COMPONENT);
  }
};
