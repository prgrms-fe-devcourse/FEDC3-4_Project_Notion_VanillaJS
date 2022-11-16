import { DocumentEdit, DocumentRoot, NotFound } from "../../components/index.js";
import { initRouter } from "../../router.js";
import { createDOMElement } from "../../util/createDomeElem.js";

export function DocumentPage({
    $target,
    onGetOneDocument,
    onEditDocument,
}) {
    const $documentPage = createDOMElement({ tagName: 'section' });
    const documentRoot = new DocumentRoot({ $target: $documentPage });
    const documentEdit = new DocumentEdit({
        $target: $documentPage,
        onEditDocument
    });
    const notFound = new NotFound({ $target: $documentPage });

    const router = async () => {
        const { pathname } = window.location;

        if (pathname === "/") {
            documentRoot.render();
            return;
        }

        if (pathname.includes("/documents/")) {
            const documentId = pathname.split('/').at(-1);
            const document = await onGetOneDocument({ docId: documentId });

            if (document) {
                
                documentEdit.render({ state: document });
                return;
            }

            notFound.render();
            return;
        }

        notFound.render();
    }

    this.render = () => {
        $target.appendChild($documentPage);
        router();
        initRouter({ router: () => router() });
    }
}
