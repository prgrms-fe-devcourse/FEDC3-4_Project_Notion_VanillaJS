import { DocumentList, DocumentAdd } from '../../components/index.js';
import { createDOMElement } from '../../util/createDomeElem.js';

export function SideBar({
    $target,
    documents,
    onClickDocument,
    onAddDocument,
    onDeleteDocument
}) {
    let state = documents;
    const $sideBar = createDOMElement({ tagName: 'aside' });
    const documentList = new DocumentList({
        $target: $sideBar,
        onClickDocument,
        onAddDocument,
        onDeleteDocument
    });
    const documentAdd = new DocumentAdd({
        $target: $sideBar,
        onAddDocument
    });

    this.render = () => {
        $target.appendChild($sideBar);
        documentList.render({ document: state });
        documentAdd.render();
    }

    this.setState = ({ nextState, openState }) => { 
        state = nextState;
        documentList.setState({ nextState: state, openState });
    }
}
