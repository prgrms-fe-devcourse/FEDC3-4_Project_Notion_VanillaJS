// by 민형, 다른 페이지로 이동 시 same document 알림 text 제거_221115
export const removeSameDocument = (prevId, nextId) => {
  if (prevId !== nextId)
    document.querySelector(".editor-same__link").style.display = "none";
};

export const editorRender = ($editorPageTarget, status) => {
  $editorPageTarget.querySelector("[name=title]").style.display = status;
  $editorPageTarget.querySelector("[name=content]").style.display = status;
  $editorPageTarget.querySelector("[name=icon]").style.display = status;
};

export const subDocumentRender = ($editorPageTarget, documents) => {
  documents.forEach((doc) => {
    const $linkDiv = document.createElement("div");
    $linkDiv.classList.add("editor-subdocument");

    const $i = document.createElement("i");
    $i.innerHTML = `<i class="fa-solid fa-link"></i>`;

    const $link = document.createElement("a");
    $link.textContent = doc.title;
    $link.href = `/documents/${doc.id}`;

    $linkDiv.appendChild($i);
    $linkDiv.appendChild($link);

    $editorPageTarget
      .querySelector("[name=editor-subdocuments]")
      .appendChild($linkDiv);
  });
};

export const sameDocumentRender = (
  $editorPageTarget,
  newTitle,
  coinCildeId
) => {
  const { pathname } = location;
  const [, , pathId] = pathname.split("/");

  // by 민형, 특정 document에서 자신의 title을 입력하면 동일한 title 있다고 render하지 않기_221116
  if (parseInt(pathId) !== coinCildeId) {
    $editorPageTarget.querySelector(
      "[name=documentlink]"
    ).href = `/documents/${coinCildeId}`;
    $editorPageTarget.querySelector(
      "[name=documentlink]"
    ).textContent = `기존 "${newTitle}" document가 있으니 해당 text 클릭을 통해 이동 부탁드립니다!`;

    document.querySelector(".editor-same__link").style.display = "flex";
    document.querySelector(".editor-same__link i").style.display = "block";
  }
};
