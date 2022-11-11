import { isConstructor } from "../../Helpers/checkError.js";
import { documentItem } from "./DocumentItem.js";

export default function DocumentDetailedList({ $target, initialState }) {
  isConstructor(new.target);
  const $documentList = document.createElement("ul");
  $target.appendChild($documentList);

  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = await nextState;
    this.render();
  };

  this.render = async () => {
    const documentList = await this.state;
    $documentList.innerHTML = `${documentList.map(documentItem).join("")}`;
  };

  this.render();
}
