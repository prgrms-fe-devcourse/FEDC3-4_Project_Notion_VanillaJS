import { createElement, targetClosest, targetContains } from '../utils/dom.js';
import { isNew } from '../utils/errorHandler.js';
import { route } from '../utils/route.js';

function DocumentList({ target, initialState, onDelete, onAdd }) {
  isNew(new.target);
  const postList = createElement('div');

  target.appendChild(postList);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    postList.innerHTML = paintDocument(this.state);
    onClickDocument();
  };

  const paintDocument = docuements => {
    return `
        <ul class="document-list">
        
        ${docuements
          .map(
            post => `
          <li class="list-style-type" id="${post.id}">
          
            <div class="row-item">
                    
                <div class="item-text">
                    ${post.title ? post.title : '제목 없음'}
                </div>
                
                <div class="item-button">
                        <button class="delete-btn">X</button>
                        <button class="add-btn">+</button>
                </div>
            </div>
            ${post.documents.length ? paintDocument(post.documents) : ''}
          </li>
        `,
          )
          .join('')}
      </ul>
        `;
  };

  const onClickDocument = () => {
    const ul = postList.querySelector('.document-list');

    ul.addEventListener('click', e => {
      const postId = targetClosest(e, 'li').id;

      if (targetContains(e, 'delete-btn')) {
        onDelete(postId);
      } else if (targetContains(e, 'add-btn')) {
        onAdd(postId);
      } else {
        // refactor 해야함
        route(`/documents/${postId}`);
      }
    });
  };
  this.render();
}

export default DocumentList;
