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
                  <span>${title}</span>
                  <div class='btn-container'>
                    <i class="create far fa-plus"></i>
                    <i class="remove fas fa-trash"></i>
                  </div>
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
    const { target } = e;
    const $li = e.target.closest('li')

    if($li){
      const { id } = $li.dataset;
      
      if(target.classList.contains('remove')){
        onRemoveDocument(id);
      }else if(target.classList.contains('create')){
        onCreateDocument(id)
      }else{
        onSelect(id);
      }
    }
  })

}