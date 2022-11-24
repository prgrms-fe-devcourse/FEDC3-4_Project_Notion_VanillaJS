import Empty from "../components/Empty";
import PostPage_editor from "../components/PostPage/PostPageEditor";
import PostPage_header from "../components/PostPage/PostPageHeader";
import PostPage_sublinks from "../components/PostPage/PostPageSublinks";
import { getItem } from "../storage";

export default function PostPage({ $target, initialState, onEditing, onDelete }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.state = initialState;
  this.onEditing = onEditing;
  this.onDelete = onDelete;

  const $postPage = document.createElement("div");
  $postPage.className = "postPage";

  const $header = document.createElement("header");

  const $section = document.createElement("setcion");
  $section.className = "editor";

  const $footer = document.createElement("footer");

  const $empty = document.createElement("div");
  $empty.className = "empty";

  $target.appendChild($postPage);

  this.setState = (nextState) => {
    this.state = nextState;

    if (nextState.res_document.length < 1) {
      $postPage.innerHTML = "";
      this.renderEmpty();
    } else {
      postPage_header.setState(this.state);
      postPage_editor.setState(this.state);
      postPage_sublinks.setState(this.state);
      this.render();
    }
  };

  this.render = () => {
    const { isNeedRender } = getItem("currentContentId", null);

    $postPage.appendChild($header);

    if (isNeedRender) {
      //글을 작성중인 경우 렌더링을 다시 하지 않음. 포커스를 잃기 때문에
      $postPage.appendChild($section);
    }

    $postPage.appendChild($footer);
  };

  this.renderEmpty = () => {
    //데이터가 없는 경우, 보여줄 view 렌더링
    $postPage.appendChild($empty);
  };

  const postPage_header = new PostPage_header({
    $target: $header,
    initialState: this.state,
    onDelete: this.onDelete,
  });

  const postPage_editor = new PostPage_editor({
    $target: $section,
    initialState: this.state,
    onEditing: this.onEditing,
  });

  const postPage_sublinks = new PostPage_sublinks({
    $target: $footer,
    initialState: this.state,
  });

  new Empty({
    $target: $empty,
    initialState: this.state,
  });
}
