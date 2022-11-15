import { useState } from './util/useState';

export function App({ $target, initialState }) {
	const state = new useState({
		documentList: initialState,
	});

	this.render = () => {
		$target.innerHTML = `
            <h1>Document List</h1>
            <ul>
                <li>Document 1</li>
                <li>Document 2</li>
                <li>Document 3</li>
            </ul>
        `;
	};

	// 구독할 컴포넌트를 등록한다(render함수를 등록해야함)
	state.listen(() => {
		// this.setState(state.getState());
		// this.render함수를 넣자
	});
}
