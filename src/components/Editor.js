export default function Editor({ 
  $target, 
  initialState = {
    title: '',
    content: '',
  },
  onEditing 
}){
  const $editor = document.createElement('div');
  $editor.className = 'editor';

  let isInitiallize = false;

  this.state = initialState;

  $target.appendChild($editor);

  this.setState = async (nextState) => {
    this.state = nextState
    $editor.querySelector('[name=title]').value = this.state.title;
    $editor.querySelector('[name=content]').value = this.state.content;
    this.render();
  }

  this.render = () => {
    if(!isInitiallize){
      $editor.innerHTML = `
        <input type="text" name="title" value="${this.state.title}">
        <textarea name="content">${this.state.content}</textarea>
      `;
      isInitiallize = true;
    }
  }
  this.render();

  $editor.addEventListener('keyup', e => {
    const { target } = e;

    const name = target.getAttribute('name');
    
    if(this.state[name] !== undefined){
      const nextState = {
        ...this.state,
        [name]: target.value
      };
      this.setState(nextState);
      onEditing(this.state);
    }
  })
}