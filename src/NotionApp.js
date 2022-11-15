import NavBar from './components/NavBar.js';
import { fetchDocumentList } from './utils/api.js';

export default function NotionApp({ $container }) {
  this.state = {
    documentList: [],
  };

  this.setState = (newState) => {
    this.state = newState;
    navBar.setState(this.state.documentList);
  };

  const navBar = new NavBar({
    $container,
    initialState: this.state.documentList,
  });

  const turnOn = async () => {
    const documentList = await fetchDocumentList();
    console.log(documentList);
    this.setState({
      ...this.state,
      documentList,
    });
  };

  turnOn();
}
