export const renderPost = (postList) => {
  return postList
    .map(
      (list) => `
            <li data-id=${list.id} class="parentList">
              <div class="content">
                <div class="left-box">
                  <img src="/src/img/arrow_right_icon.svg" class="toggleBtn"/>
                  <div class="title" >${list.title}</div>
                </div>
                <div class="right-box">
                  <img src="/src/img/minus_icon.svg" class="del" />
                  <img src="/src/img/plus_icon.svg" class="add" />
                </div>  
              </div>
              ${
                list.documents.length !== 0
                  ? `
              <ul class="childList">
                ${renderPost(list.documents)}
              </ul>   
              `
                  : ""
              }              
            </li>
          `
    )
    .join("");
};
