import { validation } from '../../validation.js';

export default function NewRootDoc({ $target, initialState, onClick }) {
  validation(new.target, 'NewRootDoc');

  const $newRootDoc = document.createElement('div');
  $newRootDoc.className = 'newRootDoc';
  $target.appendChild($newRootDoc);

  this.state = initialState;

  $newRootDoc.addEventListener('click', () => {
    onClick();
  });

  this.render = () => {
    $newRootDoc.textContent = this.state.text;
  };

  this.render();
}
