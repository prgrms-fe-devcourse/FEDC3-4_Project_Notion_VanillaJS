export default function PostPage({ $target, initialState, onEditing, onDelete }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  let timer = null;

  this.state = initialState;
  this.onEditing = onEditing
  this.onDelete = onDelete

  this.$div = document.createElement("div");
  this.$div.className = "postPage";

  $target.appendChild(this.$div);

  this.setState = (nextState, reRender=true) => {
    this.state = nextState;
    if(reRender){
      this.render();
    }
  };

  this.makeDepth = (arr,docs) => {
    const newArr = [...arr]
    docs.forEach(doc => {
      if(doc.id === this.state.res_content.id){
        console.log(newArr)
        return newArr
      }
      if(doc.documents.length) {
        return this.makeDepth([...newArr,doc.title],doc.documents)
      }
    })
  }

  this.render = () => {
    const depthArr = this.makeDepth([],this.state.res_document)
    console.log(depthArr)
    this.$div.innerHTML = `
      <header>
        <span class="header_title">
          zz
        </span>
        <div class="header_action_btns">
          <button type="button">공유</button>
          <button type="button">댓글</button>
          <button type="button">시간</button>
          <button type="button">별</button>
          <button type="button" name="delete">삭제</button>
        </div>
      </header>
      <setcion class="editor">
        <h1 class="setction_title">
          <input name="title" type="text" value="${this.state.res_content.title==="제목 없음" ? "" :  this.state.res_content.title}" placeHolder = "제목을 입력하세요"/>
        </h1>
        <div class="setcion_content" name="content" contentEditable="true">
          ${this.state.res_content.content || "내용 없음"}
        </div>
      </section>
    `;
  };

  this.render();

  this.$div.addEventListener("keyup", (e) => {
    const targetTagName = e.target.tagName
    let value,name;

    if(targetTagName === "INPUT"){
       value = e.target.value || "제목없음"
       name = e.target.name
    } else if(targetTagName === "DIV"){
       value = e.target.innerText
       name = e.target.getAttribute("name")
    }

    const nextState = {
      ...this.state.res_content,
      [name]:value
    }
    
    this.setState({
      ...this.state,
      res_content:nextState
    },false)

    if (timer !== null) {
      clearTimeout(timer);
    }

    timer = setTimeout(async () => {
      onEditing(this.state.res_content)
    },1000)
  })


  this.$div.addEventListener("click", e => {
    const { tagName } = e.target 
    const { name } = e.target
    if(tagName === "BUTTON" && name ==="delete"){
      this.onDelete(this.state.res_content.id)
    }
  })
}
