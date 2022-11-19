import createElementHelper from '../../utils/helpers.js';

function SidebarFooter({ $target }) {
  this.render = () => {
    const $navigationFooter = createElementHelper('footer', '.sidebar-footer');
    const $newDocumentBtn = createElementHelper('button', '.sidebar-new-btn');
    $newDocumentBtn.textContent = '+ 새 페이지';

    $navigationFooter.append($newDocumentBtn);
    $target.append($navigationFooter);
  };
}

export default SidebarFooter;
