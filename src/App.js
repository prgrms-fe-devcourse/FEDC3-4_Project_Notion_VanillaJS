import LIST_API from './api/documentApi';
import { push } from './router';
import { removeDocument } from './util';
import { useState } from './util/useState';
import { SideBar, Documents } from './pages';

export function App({ $target, initialState }) {
	const state = new useState({
		documentList: initialState,
		opneDocumetList: [],
	});

	this.$target = $target;

	this.sidebar = new SideBar({ $target });
	this.documents = new Documents({ $target });

	this.onGetAllDocuments = async () => {
		return await LIST_API.getAllDocuments();
	};

	this.onGetOneDocument = async ({ id }) => {
		return await LIST_API.getOneDocument({ id });
	};

	this.onCreateDocument = async ({ id }) => {
		const doc = await LIST_API.createDocument({
			content: { title: '', parent: id },
		});
		const docs = await this.onGetAllDocuments();

		state.setState({
			documentList: [...docs, doc],
			opneDocumetList: [...state.getState().opneDocumetList, doc],
		});

		push({ nextUrl: `/documents/${doc.id}` });
	};

	this.onDleleteDocument = async ({ id }) => {
		await LIST_API.deleteDocument({ id });
		const docs = await this.onGetAllDocuments();

		state.setState({
			documentList: docs,
			opneDocumetList: state
				.getState()
				.opneDocumetList.filter(doc => doc.id !== id),
		});
	};

	this.onEditDocument = async ({ id, content }) => {
		const doc = await LIST_API.editDocument({ id, content });
		const $doc = $(`[data-id="${id}"]`);
		$doc.innerHTML = doc.content.title;
		removeDocument(`documents/${id}`);
	};

	this.onClickDocument = async ({ id }) => {
		await LIST_API.getAllDocuments({ id });

		if (!state.getState().opneDocumetList.find(doc => doc.id === id)) {
			const doc = await this.onGetOneDocument({ id });
			state.setState({
				opneDocumetList: [...state.getState().opneDocumetList, doc],
			});
		}

		push({ nextUrl: `/documents/${id}` });
	};

	this.render = () => {
		this.sidebar.render();
		this.documents.render();
	};

	// 구독할 컴포넌트를 등록한다(render함수를 등록해야함)
	state.listen(() => {
		// this.setState(state.getState());
		// this.render함수를 넣자
	});
}
