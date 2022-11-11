import Document from './document.js';
import Chevron from './chevron.js';

const Icons = {
  document: Document,
  chevron: Chevron,
};

const Icon = ({ icon, ...props }) => Icons[icon](props);

export default Icon;
