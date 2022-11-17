import { createElement } from '../../utils/createElement.js';
import Header from '../shared/Header.js';
import NotFound from './NotFound.js';
import PostEditor from './PostEditor.js';
import SubDocumentList from './SubDocumentList.js';

/**
 * state: {
 * 	id: string | number
 * 	currentPath: string,
 * 	title: string,
 * 	content: string,
 * 	subDocuments: array
 * }
 */
export default function Post({ $target, initialState, onChangeTitle }) {
  const $article = createElement({
    element: 'article',
    $target,
  });

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    const { id, currentPath, subDocuments } = this.state;
    header.setState(currentPath);
    subDocumentList.setState({
      ...subDocumentList.state,
      id,
      currentPath,
      subDocumentList: subDocuments,
    });

    // todo : 야매로 한 것 같다...
    if (id) {
      document.querySelector('.editor').style.display = 'flex';
      document.querySelector('.not-found').style.display = 'none';
      postEditor.setState({
        ...this.state,
      });
    } else {
      document.querySelector('.editor').style.display = 'none';
      document.querySelector('.not-found').style.display = 'block';
      notFound.render();
    }
  };

  this.focus = () => {
    postEditor.focus();
  };

  const header = new Header({
    $target: $article,
  });

  const postEditor = new PostEditor({
    $target: $article,
    initialState: this.state,
    onChangeTitleAndCurrentPath: (id, changedCurrentPath) => {
      header.setState(changedCurrentPath);
      onChangeTitle(id, changedCurrentPath);
    },
  });

  const subDocumentList = new SubDocumentList({
    $target: $article,
    initialState: this.state?.subDocuments,
  });

  const notFound = new NotFound({ $target: $article });
}
