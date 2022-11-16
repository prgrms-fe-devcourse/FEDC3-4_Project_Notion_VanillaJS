import ContentEditor from "./ContentEditor.js";
import { request } from "../../api/api.js";
import { push } from "../../utils/router.js";

export default function Content({ $target, initialState }) {
  const $content = document.createElement("div");
  $content.classList.add("layout-content");

  this.state = initialState;

  const post = {
    title: "",
    content: "",
  };

  let timer = null;

  const contentEditor = new ContentEditor({
    $target: $content,
    initialState: post,
    onEditing: (post) => {
      if (timer !== null) {
        clearTimeout(timer);
      }

      timer = setTimeout(async () => {
        const isNew = this.state.documentId === "new";

        if (isNew) {
          const createdPost = await request("/documents", {
            method: "post",
            body: JSON.stringify(post),
          });

          this.setState({
            documentId: createdPost.id,
          });

          push(`/documents/${createdPost.id}`);
        } else {
          await request(`/documents/${post.id}`, {
            method: "put",
            body: JSON.stringify(post),
          });
        }
      }, 500);
    },
  });

  this.setState = async (nextState) => {
    if (this.state.documentId !== nextState.documentId) {
      this.state = nextState;

      if (this.state.documentId === "new") {
        const document = {
          title: "",
          content: "",
        };

        contentEditor.setState(document);
        contentEditor.render();
        this.render();
      } else {
        await fetchPost();
      }

      return;
    }

    this.state = nextState;
    this.render();
    contentEditor.setState(
      this.state.document || {
        title: "",
        content: "",
      }
    );
    contentEditor.render();
  };

  this.render = () => {
    $target.appendChild($content);
  };

  const fetchPost = async () => {
    const { documentId } = this.state;

    if (documentId !== "new") {
      const document = await request(`/documents/${documentId}`, {
        method: "get",
      });

      this.setState({
        ...this.state,
        document,
      });
    }
  };
}
