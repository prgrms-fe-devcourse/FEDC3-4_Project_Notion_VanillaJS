export function useState(initialState) {
	this.state = initialState;
	this.listeners = [];

	// listen 이라는 함수는 함수를 받아와 listenner에 담아 준다
	this.listen = fn => {
		this.listeners.push(fn);
	};

	// call은 listner에 있는 요소가 있다면, 해당 fn을 실행시킨다
	this.call = () => {
		this.listeners.forEach(fn => {
			fn && fn();
		});
	};

	// setState는 state값을 새로운 newState으로 변경한다
	this.setState = newState => {
		this.state = newState;

		// this.call을 호출해 setState가 될때마다, 구독하고 있는 함수들을 실행시켜 최신값을 유지한다
		this.call();
	};

	//getState는 state를 반환한다
	this.getState = () => this.state;
}
