import { I_ERROR_MESSAGE } from "../constants.js";

export const checkLocalData = lists => {
    if (!Array.isArray(lists)) {
        throw new Error(I_ERROR_MESSAGE.NOT_ARRAY);
    }

    lists.forEach(list => {
        if (!"text" in list || typeof list.text !== "string") {
            throw new Error(I_ERROR_MESSAGE.NOT_TEXT_IN_PROPERTY);
        }

        if (!"isCompleted" in list || typeof list.isCompleted !== "boolean") {
            throw new Error(I_ERROR_MESSAGE.NOT_ISCOMPLETED_IN_PROPERTY);
        }
    });
};
