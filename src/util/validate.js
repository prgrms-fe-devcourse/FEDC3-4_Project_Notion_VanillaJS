export const isElement = ($target) => {
  return $target instanceof Element || $target instanceof HTMLDocument;
};

export const validateState = (nextState, defaultState) => {
  if (typeof nextState !== "object") nextState = { nextState };

  const valueTypes = Object.values(defaultState).map((val) => typeof val);

  Object.entries(nextState).forEach(([key, value], i) => {
    if (typeof value !== valueTypes[i]) {
      throw new Error(`Type of value in ${key} does not match`);
    }
  });
};
