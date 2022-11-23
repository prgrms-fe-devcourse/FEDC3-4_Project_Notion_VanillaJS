import { request } from "../utils/api.js";
import { push } from "../utils/router.js";
import { setItem } from "../utils/storage.js";
import { CheckNew } from "../utils/error.js";

export default function Navi({ $target, initialState }) {
  CheckNew(new.target);

  const $navi = document.createElement("div");
  $navi.className = "Navi";

  $navi.style = "width:95%;";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  // 찾고 싶은 문서의 id를 받아온다.
  // DFS로 해당 id의 문서를 찾는다.
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

    let postPath = "";
    let postChildren = "";
    posts.forEach((item) => {
      const temp = DFS(item, postId);
      if (temp !== undefined) {
        postPath = temp[0];
        postChildren = temp[1];
      }
    });

    pathOpen(postPath);

    $navi.innerHTML = `
    <p> 파일 경로:          
      ${renderPath(postPath, "<") || "상위 파일 없음"}
    </p>
    <p> 하위 파일:
        ${renderPath(postChildren, "/") || "하위 파일 없음"}
    </p>
    `;
  };

  const renderPath = (path, option) => {
    if (path.length === 0) return false;

    return path
      .map((item) => {
        return `<span class="naviTitle" data-id="${item.id}" 
        onmouseover="this.style.background='#bebebe';" onmouseout="this.style.background='';">${item.title}</span>`;
      })
      .join(` ${option} `);
  };

  const DFS = (start, postId) => {
    const stack = [];
    stack.push({
      node: start,
      path: [
        {
          id: start.id,
          title: start.title,
        },
      ],
    });

    while (stack.length) {
      const cur = stack.pop();

      if (cur.node.id === postId) {
        const children = cur.node.documents;
        return [cur.path, children];
      }

      const docs = cur.node.documents;

      docs.forEach((e) => {
        const nextPath = [...cur.path];
        nextPath.push({
          id: e.id,
          title: e.title,
        });

        stack.push({
          node: e,
          path: nextPath,
        });
      });
    }
  };

  // breadcrumb으로 이동했을 때 해당 파일의 위치까지 사이드 바 도 열릴 수 있도록 한다.
  const pathOpen = (postPath) => {
    for (let i = 0; i < postPath.length - 1; i++) {
      setItem(postPath[i].id, {
        id: postPath[i].id,
        visible: "",
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
}
