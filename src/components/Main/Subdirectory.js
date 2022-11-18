import { makeElement, makeList } from "../../util/templates.js";
import { push } from "../router.js";

export default function Subdirectory({ 
  $target,
  initialState = this.defaultState = {
    document: []
  } 
}) {
  const $subdirectory = makeElement('nav', 'subdirectory');
  $subdirectory.ariaLabel = "Subdirectory";
  const $list = makeElement('ul', 'subdirectory-root');

  $target.appendChild($subdirectory);

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  }


  this.render = () => {
    $list.innerHTML = '';
    makeList({
      $list,
      obj: this.state,
      option: {
        type: 'subdirectory'
      }
    })
    $subdirectory.appendChild($list);
  }

  $subdirectory.addEventListener('click', e => {
    e.preventDefault();
    const $li = e.target.closest('li');
    if(!$li) return;
    
    const currentDocId = this.state.document.id;
    const { documentId } = $li.dataset;
    if(documentId === currentDocId) return;

    push(documentId);
  })

}
