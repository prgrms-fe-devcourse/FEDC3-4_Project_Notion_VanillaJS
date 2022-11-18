import createElementHelper from '../../utils/helpers.js';
import { USER_NAME } from '../../utils/constants.js';

class SidebarHeader {
  constructor(props) {
    this.props = props;
  }

  mounted() {
    const { $target } = this.props;
    const $navigationTitle = createElementHelper('h1', '.sidebar-header');
    $navigationTitle.textContent = `🧑🏿‍🚀 ${USER_NAME}의 Notion`;

    $target.append($navigationTitle);
  }
}

export default SidebarHeader;
