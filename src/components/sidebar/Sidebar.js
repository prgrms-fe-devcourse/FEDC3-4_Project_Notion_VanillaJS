import DocList from "./DocList.js";
import NewRootDoc from "./NewRootDoc.js";
import SidebarTitle from "./SidebarTitle.js";
import { request } from "../../api.js";
import { push } from "../../router.js";
import { validation } from "../../validation.js";

export default function Sidebar({ $target, initialState }) {
  validation(new.target, "Sidebar");

  const $sidebar = document.createElement("nav");
  $sidebar.className = "sideBar";

  this.state = initialState;

  new SidebarTitle({
    $target: $sidebar,
    text: "📑 Minjae의 Notion",
    onClick: () => {
      push("/");
    },
  });

  const docList = new DocList({
    $target: $sidebar,
    initialState: this.state,
    onClick: (id) => {
      // 하위 페이지가 없습니다.를 클릭했을때 방어 코드
      if (id) {
        // 선택된 문서 배경색을 변화시켜 구분
        const { pathname } = window.location;
        const [, , docId] = pathname.split("/");
        if (docId) {
          const $prevLiP = document.getElementById(docId).querySelector(".forHover");
          $prevLiP.style = "";
        }
        const $curLiP = document.getElementById(id).querySelector(".forHover");
        $curLiP.style.backgroundColor = "rgba(0, 0, 0, 0.1)";

        push(`/documents/${id}`);
      }
    },
    onNewSubDoc: async (id) => {
      const newSubDoc = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: id,
        }),
      });

      const { pathname } = window.location;
      const [, , docId] = pathname.split("/");
      const $curLi = document.getElementById("newSubDoc");

      if (docId) {
        const $prevLiP = document.getElementById(docId).querySelector(".forHover");
        $prevLiP.style = "";
      }

      $curLi.querySelector(".forHover").style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      $curLi.id = newSubDoc.id;
      $curLi.dataset["id"] = newSubDoc.id;

      push(`/documents/${newSubDoc.id}`);
    },
    onDelete: async (id) => {
      if (id === undefined) {
        this.setState();
        return;
      }

      const res = await request(`/documents/${id}`, {
        method: "DELETE",
      });

      // root 문서 삭제시 랜딩페이지로 돌아간다.
      if (!res.parent) {
        this.setState();
        push("/");
      } else {
        const $parentLi = document.getElementById(res.parent.id);
        // 이미 상위 페이지가 지워진 경우 방어 코드
        if ($parentLi) {
          const $currLiP = $parentLi.querySelector(".forHover");
          const $childUl = $parentLi.querySelector("ul");

          if ($childUl.innerText === "") {
            $childUl.innerHTML = `
              <li class="isEnd">하위 페이지가 없습니다.</li>
            `;
          }
          $currLiP.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
          push(`/documents/${res.parent.id}`);
        } else {
          this.setState();
        }
      }
    },
  });

  new NewRootDoc({
    $target: $sidebar,
    initialState: {
      text: "+ 페이지 추가",
    },
    onClick: async () => {
      const $li = document.createElement("li");
      $li.className = "docItem";
      const newRootDoc = await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목 없음",
          parent: null,
        }),
      });
      $li.id = newRootDoc.id;
      $li.dataset.id = newRootDoc.id;
      const $rootUl = document.querySelector("ul");
      if ($rootUl) {
        $li.innerHTML = `
        <p class="forHover">
          <button class="toggleFold">►</button>
          <span class="docTitle">제목 없음</span>
          <span class="controlBtns">
            <button class="newSubDoc">➕</button> 
            <button class="delete">X</button>
          </span>
          <ul class='child' style='display: none;'>
            <li class="isEnd">하위 페이지가 없습니다.</li>
          </ul>
        </p>
      `;
      }
      $rootUl.appendChild($li);
      push(`/documents/${newRootDoc.id}`);
      this.setState();
    },
  });

  this.setState = async () => {
    const lists = await request(`/documents`);

    docList.setState(lists);
  };

  this.render = () => {
    $target.prepend($sidebar);
  };

  this.render();
}
