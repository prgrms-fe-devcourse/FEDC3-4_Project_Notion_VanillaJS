import Editor from './Editor.js';
import { request } from '../utils/api.js';

export default function EditPage({ 
  $target, 
  initialState,
  onRerendering
}){
  const $editPage = document.createElement('section');
  $editPage.className = 'edit';

  
  this.state = initialState;
  
  this.setState = (nextState) => {
    this.state = nextState;
    getDocument();
    this.render();
  }

  let timer = null;

  const editor = new Editor({
    $target: $editPage,
    initialState: {},
    onEditing: (document) => {
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await updateDocument(this.state.id, document);
        await onRerendering();
      }, 1000)
    } 
  })
  
  const getDocument = async () => {
    const document = await request(`/documents/${this.state.id}`);
    editor.setState(document)
  }
  
  const updateDocument = async (id, data) => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };
  
  this.render = () => {
    $target.appendChild($editPage)
  }
  
}