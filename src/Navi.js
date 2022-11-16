import { request } from "./Api.js";
import { push } from "./router.js";
import { setItem } from "./Storage.js";

export default function Navi({ $target, initialState }) {
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

    // 선택된 문서 사이드바에 표시하기.
    // CSS 상속 무효화랑 같이 써야할듯 || li 안에 p태그로 제목 집어넣기
    // const $selected = document.querySelector(
    //   `[data-id="${this.state.postId}"]`
    // );
    // const $changeTest = document.createElement("div");
    // $changeTest.innerHTML = `<p style="color:red;">${$selected.innerText}</p>`;
    // $selected.innerText = "선택";

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

    test(postPath);

    $navi.innerHTML = `
    <p> 파일 경로:          
      ${
        postPath.length !== 0
          ? postPath
              .map((item) => {
                return `<span data-id="${item.id}">${item.title}</span>`;
              })
              .join(" < ")
          : "상위 파일 없음"
      }
    </p>
    <p> 하위 파일:
        ${
          postChildren.length !== 0
            ? postChildren
                .map((item) => {
                  return `<span data-id="${item.id}">${item.title}</span>`;
                })
                .join(" / ")
            : "하위 파일 없음"
        }
    </p>
    `;
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
  const test = (postPath) => {
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
