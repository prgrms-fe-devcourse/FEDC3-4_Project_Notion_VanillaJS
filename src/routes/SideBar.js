import SideBar_add from "../components/SideBar_add";
import SideBar_interested from "../components/SideBar_interested";
import SideBar_personal from "../components/SideBar_personal";
import { getItem } from "../storage";

export default function SideBar({ $target, initialState, onClickAdd }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }
  this.state = initialState;
  this.onClickAdd = onClickAdd;

  this.$sideBar = document.createElement("nav");
  this.$sideBar.className = "sideBar";
  this.$sideBarChild = document.createElement("div");
  this.$sideBarChild.innerHTML = "<header><span>김성현의 Notion</span></header>";
  this.$sideBar.appendChild(this.$sideBarChild);

  this.$personal = document.createElement("div");
  this.$personal.className = "classification";
  this.$personal.id = "personal";

  this.$interested = document.createElement("div");
  this.$interested.className = "classification";
  this.$interested.id = "interested";

  this.$add = document.createElement("div");
  this.$add.className = "sideBarAdd";

  $target.appendChild(this.$sideBar);

  this.setState = (nextState) => {
    this.state = nextState;

    sideBar_interested.setState(this.state);
    sideBar_personal.setState(this.state);
    this.render();
  };

  this.render = () => {
    const favoritesList = getItem("favoritesList", []);

    if (favoritesList.length) {
      this.$sideBarChild.appendChild(this.$interested);
    } else {
      this.$sideBarChild.removeChild(this.$interested);
    }

    this.$sideBarChild.appendChild(this.$personal);
    this.$sideBarChild.appendChild(this.$add);
  };

  const sideBar_interested = new SideBar_interested({
    $target: this.$interested,
    initialState: this.state,
  });

  const sideBar_personal = new SideBar_personal({
    $target: this.$personal,
    initialState: this.state,
    onClickAdd: this.onClickAdd,
  });

  new SideBar_add({
    $target: this.$add,
    onClickAdd: this.onClickAdd,
  });
}
