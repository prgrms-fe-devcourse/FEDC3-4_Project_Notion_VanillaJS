import { request } from "./Api.js";
import { setItem, getItem } from "./Storage.js";
import { push } from "./router.js";

// 내용 변경되면 서브바 스크롤 자꾸 올라가서 불편함.
// 아예 리스트 길이를 엄청 길게 해둔다음에 history.scrollRestoration = "auto" 로 복구시키기?

export default function PostList({
  $target,
  initialState,
  postAdd,
  postDelete,
}) {
  const $postList = document.createElement("div");
  $postList.className = "postList";

  $postList.style = `   
   overflow: auto;
   scroll: no;
   white-space: nowrap;
   height: 98vh;
   backgroundColor: #c8c8c8;   
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul>
      ${this.makeList(this.state)}     
      </ul>
    `;
    // $target.appendChild($postList);
  };

  // 접혀있는지 펴져있는지 확인하는 함수.
  this.visible = (id) => {
    let visible = getItem(id, {
      id: id,
      visible: null,
    });

    // 처음에 값 세팅해준다.
    if (visible.visible === null) {
      setItem(id, {
        id: id,
        visible: "none",
      });
    }

    visible = getItem(id);

    return visible.visible;
  };

  // 재귀적
  // isInit 같은거 설정해서 첫 로드때는 다 닫혀있게 만들어도 좋을듯
  this.makeList = (docList, depth = 0) => {
    return docList
      .map(
        (cur) =>
          `<li class="title" data-id="${cur.id}" title="${
            cur.title
          }" style="list-style:none; background-color:initial;">
          ${this.visible(cur.id) === "none" ? "▶" : "▼"}
          ${cur.title}
          <button class="add" style="position:sticky; right:25px;">+</button>
          <button class="delete" style="position:sticky; right:1px;">x</button>          
          ${
            cur.documents.length > 0
              ? `<ul style="display:${this.visible(cur.id)};">${this.makeList(
                  cur.documents,
                  depth + 1
                )}</ul>`
              : ""
          }          
          </li>`
      )
      .join("");
  };

  $postList.addEventListener("click", (e) => {
    const { target } = e;
    const $li = target.closest("li");

    if (!$li) return;

    const { id } = $li.dataset;
    const name = target.className;

    if (name === "title") {
      push(`/posts/${id}`);

      const $ul = $li.childNodes[5];
      if (!$ul) return;

      // localStorage를 사용해서 하위목록들이 보여질지 아닐지 결정.
      if ($ul.style.display === "") {
        $ul.style.display = "none";
        setItem(id, {
          id: id,
          visible: "none",
        });
      } else {
        $ul.style.display = "";
        setItem(id, {
          id: id,
          visible: "",
        });
      }
    } else if (name === "add") {
      postAdd(id);
      fetchPosts();
    } else if (name === "delete") {
      postDelete(id);
      //fetchPosts(); PostPage에 postDelete를 정의한 부분에 넣어버림. 왜 여기에 있으면 반영이 바로 안될까
    }
  });

  $postList.addEventListener("mouseover", (e) => {
    const { target } = e;

    const $li = target.closest("li");

    if (!$li) return;

    $li.style.backgroundColor = "#bebebe";
  });

  $postList.addEventListener("mouseout", (e) => {
    const { target } = e;

    const $li = target.closest("li");

    if (!$li) return;

    $li.style.backgroundColor = "";
  });

  const fetchPosts = async () => {
    const nextState = await request("documents", {
      method: "GET",
    });
    this.setState(nextState);
  };

  $target.appendChild($postList);
}
