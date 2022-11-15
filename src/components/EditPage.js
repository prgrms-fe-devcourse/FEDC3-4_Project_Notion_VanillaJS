import Editor from './Editor.js';

export default function EditPage({ $target, initialState }){
  const $editPage = document.createElement('section')
  $editPage.className = 'edit'

  this.state = initialState

  const editor = new Editor({
    $target: $editPage,
    initialState: {},
    onEditing: (document) => {

    } 
  })

  this.setState = (nextState) => {
    this.state = nextState
    this.render()
    editor.setState(this.state)
  }

  this.render = () => {
    $target.appendChild($editPage)
  }

  // const fetchData = async () => {
  //   const document = await fetchDocument()
  // }

}