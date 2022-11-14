import { request } from "./Api.js";
import { push } from "./router.js";

export default function Navi({ $target, initialState }) {
  const $navi = document.createElement("div");
  $navi.className = "Navi";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 찾고 싶은 문서의 id를 받아온다.
  // DFS로 해당 id의 문서를 찾는다.
  // 경로를 역순으로 반환하여 $navi 에 그린다.
  this.render = () => {
    $target.prepend($navi);

    if (this.state.postId === "new") {
      $navi.innerHTML = `
        새로운 루트 문서군요!
      `;
      return;
    }

    const { postId } = this.state;
    fetchPosts(Number(postId));
  };

  const fetchPosts = async (postId) => {
    const posts = await request("documents", {
      metohd: "GET",
    });

    let test = "";
    posts.forEach((item) => {
      const temp = DFS(item, postId);
      if (temp !== undefined) {
        test = temp;
      }
    });
    $navi.innerHTML = `      
      ${test
        .map((item) => {
          return `<span data-id="${item.curId}">${item.title}</span>`;
        })
        .join(">")}
    `;
  };

  const DFS = (start, postId) => {
    const stack = [];
    stack.push({
      node: start,
      path: [
        {
          curId: start.id,
          title: start.title,
        },
      ],
    });

    while (stack.length) {
      const cur = stack.pop();

      if (cur.node.id === postId) {
        return cur.path;
      }

      const docs = cur.node.documents;

      docs.forEach((e) => {
        const nextPath = [...cur.path];
        nextPath.push({
          curId: e.id,
          title: e.title,
        });

        stack.push({
          node: e,
          path: nextPath,
        });
      });
    }
  };

  $navi.addEventListener("click", (e) => {
    const { target } = e;
    const $span = target.closest("span");

    if (!$span) return;

    const targetId = $span.dataset.id;
    push(`/posts/${targetId}`);
  });

  $navi.addEventListener("mouseover", (e) => {
    const { target } = e;
    const $span = target.closest("span");

    if (!$span) return;

    $span.style.backgroundColor = "#bebebe";
  });

  $navi.addEventListener("mouseout", (e) => {
    const { target } = e;
    target.style.backgroundColor = "white";
  });
}
