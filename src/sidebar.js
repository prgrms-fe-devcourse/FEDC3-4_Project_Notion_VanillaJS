import PostLists from "./postlists.js";
import Header from "./header.js";

export default function Sidebar({ $target, initialState }) {
  const $sidebar = document.createElement("div");
  $sidebar.setAttribute("class", "left");

  $target.appendChild($sidebar);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.postLists.setState(nextState);
  };

  this.header = new Header({
    $target: $sidebar,
  });

  this.postLists = new PostLists({
    $target: $sidebar,
    initialState: this.state,
  });
}
