import Sidebar from './Sidebar.js';

export default function App({ $target }) {
  isNew(new.target);

  new Sidebar({
    $target,
  });
}
