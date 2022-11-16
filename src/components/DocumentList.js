export default function DocumentList({
  $target,
  initialState,
  onSelect,
  onCreateDocument,
  onRemoveDocument
}){
  const $list = document.createElement('div');
  $list.className = 'list-container';
  $target.appendChild($list);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }

  this.render = () => {
    const documentList = createList(this.state, '');
    $list.innerHTML = `${documentList}`;
  }

  const createList = (data, inner) => {
    if(data.length === 0){
      inner = `<span>문서가 없습니다.</span>`
      return inner
    }
    inner += `
    <ul class="list-wrap">
      ${data
        .map(
          ({
            id,
            title,
            documents,
          }) => `<li class="list-item" data-id="${id}">
          <i class="fas fa-caret-right"></i>
          ${title}
          <button class=create>+</button>
          <button class=remove>-</button>
          </li>
            ${documents
              .map((document) => createList([document], inner))
              .join('')}
            `
        )
        .join('')}
      </ul>
      `;
    return inner;
  }

  $list.addEventListener('click', (e) => {
    const { className } = e.target;
    const $li = e.target.closest('li')

    if($li){
      const { id } = $li.dataset;
      
      if(className === "remove"){
        onRemoveDocument(id);
      }else if(className === "create"){
        onCreateDocument(id)
      }else{
        onSelect(id);
      }
    }
  })

}