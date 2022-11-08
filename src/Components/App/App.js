import { isConstructor } from "../../Helpers/checkError.js";
import { setItem, getItem } from "../../Helpers/setStorage.js";

export default function App({ $target }) {
  isConstructor(new.target);
}
