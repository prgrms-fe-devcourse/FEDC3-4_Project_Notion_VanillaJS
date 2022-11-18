import createElementHelper from '../../utils/helpers.js';

class SidebarFooter {
  constructor(props) {
    this.props = props;
  }

  mounted() {
    const { $target } = this.props;
    const $navigationFooter = createElementHelper('footer', '.sidebar-footer');
    const $newDocumentBtn = createElementHelper('button', '.sidebar-new-btn');
    $newDocumentBtn.textContent = '+ 새 페이지';

    $navigationFooter.append($newDocumentBtn);
    $target.append($navigationFooter);
  }
}

export default SidebarFooter;
