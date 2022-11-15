import Editor from './Editor.js';
import { getItem, setItem } from '../utils/storage.js';
import { request } from '../utils/api.js';

export default function EditPage({ 
  $target, 
  initialState 
}){
  const $editPage = document.createElement('section');
  $editPage.className = 'edit';

  
  this.state = initialState;

  this.setState = async (nextState) => {
    this.state = nextState;
    await fetchData();
    await this.render();
  }
  
  //왜 this.state.id 가 undefined이며, 어째서 값이 바뀌지 않는가?
  let documentLocalSaveKey = `temp-post-${this.state.id}`;
  let timer = null;

  const editor = new Editor({
    $target: $editPage,
    initialState: {},
    onEditing: (document) => {
      if(timer !== null){
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        await updatePost(this.state.id, document);
      }, 1500)
    } 
  })

  
  const fetchData = async () => {
    const document = await request(`/documents/${this.state.id}`);
    await editor.setState(document)
  }

  const updatePost = async (id, data) => {
    await request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  this.render = () => {
    $target.appendChild($editPage)
  }

}