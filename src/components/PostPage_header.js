import { push } from "../router";
import { getItem, setItem } from "../storage";
export default function PostPageHeader({ $target, initialState, onDelete }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.$header = $target;
  this.state = initialState;
  this.onDelete = onDelete;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.breadCrumb = (arr, docs) => {
    if (docs.length < 1) {
      return [];
    }

    const newArr = [...arr];

    for (let i = 0; i < docs.length; i++) {
      //재귀함수 이용하여 타겟의 id가 발견될떄 까지 순회
      const id = docs[i].id;
      const title = docs[i].title;

      newArr.push({ title, id });

      if (id === this.state.res_content.id) {
        return newArr;
      }
      if (docs[i].documents.length) {
        const ans = this.breadCrumb(newArr, docs[i].documents);
        if (ans) {
          return ans;
        }
      }
      newArr.pop();
    }
  };

  this.makeDday = (date) => {
    //최근 수정 시간 만들기
    const today = new Date();
    const myDay = new Date(date);
    const misec = today - myDay < 0 ? 0 : today - myDay;

    let temp = Math.floor(misec / 1000);
    let count = 0;
    const unit = ["초", "분", "시간", "일"];

    while (temp > 24) {
      if (count < 2 && temp > 60) {
        temp = Math.floor(temp / 60);
      } else if ((count = 2)) {
        temp = Math.floor(temp / 24);
      } else {
        return temp + unit[count] + " 지남";
      }
      count++;
      if (count === 3) break;
    }

    return temp + unit[count] + " 지남";
  };

  this.render = () => {
    const breadCrumb = this.breadCrumb([], this.state.res_document);
    const favoritesList = getItem("favoritesList", []);
    const isFavorite = favoritesList.find((fav) => fav.id === this.state.res_content.id);

    this.$header.innerHTML = `
      <div class="header_title">
        ${breadCrumb
          .map((r) => {
            return `<div name="link" data-id="${r.id}">${r.title || "제목 없음"}</div>`;
          })
          .join("/&nbsp")}
      </div>
      <div class="header_action_btns">
        <span>${this.makeDday(this.state.res_content.updatedAt)}</span>
        <button type="button" name="star" class=${isFavorite ? "on" : "off"}></button>  
        <button type="button" name="share">공유</button>
        <button type="button" name="delete">삭제</button>
      </div>
    `;
  };

  this.$header.addEventListener("click", (e) => {
    const { target } = e;

    if (target) {
      const { name } = target;

      if (name === "delete") {
        if (confirm("정말 삭제하시겠습니까?")) {
          this.onDelete(this.state.res_content.id);
        }
      } else if (name === "share") {
        const t = document.createElement("textarea");

        document.body.appendChild(t);

        t.value = window.location.href;
        t.select();

        document.execCommand("copy");
        document.body.removeChild(t);

        alert("링크가 복사되었습니다. 원하는 사람에게 공유해보세요");
      } else if (name === "star") {
        const favoritesList = getItem("favoritesList", []);
        const isExist = favoritesList.find((fav) => fav.id === this.state.res_content.id);

        if (isExist) {
          //이미 즐겨찾기에 등록된 거라면? 없애기
          setItem(
            "favoritesList",
            favoritesList.filter((fav) => fav.id !== this.state.res_content.id)
          );

          target.className = "off";
        } else {
          //즐겨찾기에 등록되지 않은 거라면? 추가
          setItem("favoritesList", [
            ...favoritesList,
            { id: this.state.res_content.id, title: this.state.res_content.title },
          ]);

          target.className = "on";
        }

        push(`/posts/${this.state.res_content.id}`); //사이드바 리렌더링 위해 호출
      } else if (name === "link") {
        const { id } = target.dataset;

        push(`/posts/${id}`);
      }
    }
  });
}
