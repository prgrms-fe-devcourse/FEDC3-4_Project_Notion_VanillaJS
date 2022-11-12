import Document from './document.js';
import Chevron from './chevron.js';
import Plus from './plus.js';

const Icons = {
  document: Document,
  chevron: Chevron,
  plus: Plus,
};

const Icon = ({ icon, ...props }) => Icons[icon](props);

export default Icon;
