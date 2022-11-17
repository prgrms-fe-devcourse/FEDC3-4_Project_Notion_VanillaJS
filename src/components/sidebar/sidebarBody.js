import { request } from "../../utils/api.js";

export default function SidebarBody({ $target, initialState }) {
  const $sidebarBody = document.createElement("div");
  const $renderList = document.createElement("div");
  $sidebarBody.className = "sidebar-body";

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const addDocumnet = async (dataId) => {
    await request("/documents", {
      method: "POST",
      body: JSON.stringify({
        title: "test",
        parent: dataId,
      }),
    });
  };

  const deleteDocument = async (dataId) => {
    await request(`/documents/${dataId}`, {
      method: "DELETE",
    });
  };

  const renderDocuments = (documents, $renderList) => {
    documents.map((e) => {
      const $ul = document.createElement("ul");
      const $li = document.createElement("li");
      $li.className = "document-li";
      $li.setAttribute("data-id", e.id);
      $li.textContent = e.title;
      const $addBtn = document.createElement("button");
      $addBtn.className = "add-btn";
      $addBtn.innerHTML = "+";
      const $deleteBtn = document.createElement("button");
      $deleteBtn.className = "delete-btn";
      $deleteBtn.innerHTML = "x";

      $renderList.appendChild($ul);
      $ul.appendChild($li);
      $li.appendChild($addBtn);
      $li.appendChild($deleteBtn);

      if (e.documents) {
        renderDocuments(e.documents, $ul);
      }
    });

    return $renderList.innerHTML;
  };

  this.render = () => {
    console.log("sidebarBody state", this.state);
    $target.appendChild($sidebarBody);
    if (this.state) {
      $sidebarBody.innerHTML = renderDocuments(this.state, $renderList);
      console.log($renderList);
    } else {
      $sidebarBody.innerHTML = "새 페이지를 눌러 문서를 작성해 주세요!";
    }
  };

  this.render();

  $sidebarBody.addEventListener("click", (e) => {
    const target = e.target;
    const dataId = target.closest("li").dataset.id;
    console.log(dataId);
    if (target.className === "add-btn") {
      addDocumnet(dataId);
      console.log("$addBtn clicked", dataId);
    } else if (target.className === "delete-btn") {
      deleteDocument(dataId);
      console.log("$deleteBtn clicked", dataId);
    }
  });
}
