import { $ } from './dom.js';

export const showModal = () => {
  const $modal = $('#modal');
  $modal.classList.add('show-modal');
};
