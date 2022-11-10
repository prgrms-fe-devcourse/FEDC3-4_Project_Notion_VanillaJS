import PostEditor from "../components/PostEditor";
import PostPageHeader from "../components/PostPageHeader";
import PostSublinks from "../components/PostSublinks";

export default function PostPage({ $target, initialState, onEditing, onDelete }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.state = initialState;
  this.onEditing = onEditing;
  this.onDelete = onDelete;

  this.$div = document.createElement("div");
  this.$div.className = "postPage";

  this.setState = (nextState) => {
    this.state = nextState;
    postPageHeader.setState(this.state);
    postEditor.setState(this.state);
    postSublinks.setState(this.state);

    this.render();
  };

  this.render = () => {
    $target.appendChild(this.$div);
  };

  const postPageHeader = new PostPageHeader({
    $target: this.$div,
    initialState: this.state,
    onDelete: this.onDelete,
  });

  const postEditor = new PostEditor({
    $target: this.$div,
    initialState: this.state,
    onEditing: this.onEditing,
  });

  const postSublinks = new PostSublinks({
    $target: this.$div,
    initialState: this.state,
  });
}
