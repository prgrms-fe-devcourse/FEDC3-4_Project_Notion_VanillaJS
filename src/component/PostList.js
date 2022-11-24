import { request } from "../utils/api.js";
import { setItem, getItem } from "../utils/storage.js";
import { push } from "../utils/router.js";

export default function PostList({
  $target,
  initialState,
  postAdd,
  postDelete,
}) {
  const $postList = document.createElement("div");
  $postList.className = "postList";

  // CSS
  $postList.style = `   
   overflow: auto;   
   white-space: nowrap;
   height: 98vh;
   backgroundColor: #c8c8c8;   
  `;

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;

    this.render();
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

  // 리스트 그리기
  this.makeList = (docList, depth = 0) => {
    return docList
      .map(
        (cur) =>
          `<li class="title" data-id="${cur.id}" title="${
            cur.title
          }" style="list-style:none; background-color:initial;">            
            <p class="title" 
            style="margin:0; display:inline-block;" 
            onmouseover="this.style.background='#bebebe';"
            onmouseout="this.style.background='';">
            ${this.visible(cur.id) === "none" ? "▶" : "▼"}${cur.title}</p>
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
      // 고정적으로 7을 쓰는법 말고 ul태그를 능동적으로 찾는 방법?
      const $ul = $li.childNodes[7];

      if (!$ul) {
        setItem(id, {
          id: id,
          visible: "none",
        });
        push(`/posts/${id}`);
        return;
      }

      // this.postId = +id;
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

      push(`/posts/${id}`);
    } else if (name === "add") {
      postAdd(id);
      fetchPosts();
    } else if (name === "delete") {
      postDelete(id);
      //fetchPosts(); PostPage컴포넌트에 postDelete를 정의한 부분에 넣어버림. 왜 여기에 있으면 반영이 바로 안될까
    }
  });

  const fetchPosts = async () => {
    const posts = await request("documents", {
      method: "GET",
    });
    this.setState({
      ...this.state,
      posts,
    });
  };

  this.render = () => {
    $postList.innerHTML = `
      <ul>
      ${this.makeList(this.state.posts)}     
      </ul>
    `;
  };

  $target.appendChild($postList);
}
