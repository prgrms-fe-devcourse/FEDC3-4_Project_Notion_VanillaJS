export const changeFold = (data) => {
  const listIntroduceData = data.foldData;
  const selectId = parseInt(data.indexId);
  const selectStatus = data.status;
  const selectListWidth = listIntroduceData[selectId].width;
  const allList = [0, ...document.querySelectorAll(".list-container__list")];

  // by 민형, 사용자가 선택한 document부터 탐색 시작_221111
  for (let i = selectId + 1; i < allList.length - 1; i++) {
    if (selectStatus === "flex") {
      // by 민형, 바로 밑에 자식 document만 render_221111
      console.log(listIntroduceData[i].width, selectListWidth + 15);
      if (listIntroduceData[i].width === selectListWidth + 15) {
        console.log("hi bock");
        allList[i].style.display = selectStatus;
      }
      // by 민형, 밑을 탐색하다가 같은 width의 document를 만나면 break_221111
      else if (listIntroduceData[i].width === selectListWidth) {
        break;
      }
    } else {
      // by 민형, 선택한 li의 넓이보다 큰 list만 none_221111
      if (listIntroduceData[i].width > selectListWidth) {
        allList[i].style.display = selectStatus;

        allList[i]
          .querySelector("i")
          .setAttribute("class", "fa-solid fa-chevron-right");
      } else if (listIntroduceData[i].width === selectListWidth) {
        break;
      }
    }
  }

  return;
};
