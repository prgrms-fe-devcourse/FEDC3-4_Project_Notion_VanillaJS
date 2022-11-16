import { STORAGE_KEY, CLASS_NAME } from '../util/constants.js';
import { getStorageItem } from '../util/sotrage.js';

export default function Sidebar({ $target, onClickHeader, onClickAddButton }) {
  this.$element = document.createElement('div');
  this.$element.className = CLASS_NAME.SIDEBAR;

  const savedSidebarWidth = getStorageItem(STORAGE_KEY.SIDEBAR_WIDTH, 0);
  if (savedSidebarWidth !== 0) this.$element.style.width = savedSidebarWidth;

  this.$element.innerHTML = `
    <div class="${CLASS_NAME.SIDEBAR_HEADER}">
      <h1>My Documents</h1><span class="icon ${CLASS_NAME.ADD_DOCUMENT_BUTTON}"></span>
    </div>
  `;

  $target.appendChild(this.$element);

  this.$element.addEventListener('click', async (e) => {
    const target = e.target;
    if (target.tagName === 'H1') {
      onClickHeader();
    } else if (target.classList.contains(CLASS_NAME.ADD_DOCUMENT_BUTTON)) {
      onClickAddButton();
    }
  });
}