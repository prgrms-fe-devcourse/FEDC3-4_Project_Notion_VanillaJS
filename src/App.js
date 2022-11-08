import { getItem, setItem } from "./Storage.js";
import { request } from "./Api.js";
import ContentList from "./ContentList.js";

export default function App({ $target, initialState }) {
  new ContentList({
    $target,
    initialState,
  });
}
