import Document from './document.js';
import Chevron from './chevron.js';
import Plus from './plus.js';
import Trash from './trash.js';

const Icons = {
  document: Document,
  chevron: Chevron,
  plus: Plus,
  trash: Trash,
};

const Icon = ({ icon, ...props }) => Icons[icon](props);

export default Icon;
