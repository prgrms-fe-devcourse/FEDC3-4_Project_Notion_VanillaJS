# 4주차 Notion 클로닝 과제

데브코스 기술 과제 repository fork

### 바닐라 JS만을 이용해 노션을 클로닝합니다.

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.

# 📥 Download

npm

```jsx
npm install
npm run dev
npm start

// 상위 dummyEnv에서 user 를 변경해서 사용하시면 됩니다!
export const APU_END_POINT = '주소';
export const USER = 'yangsangwoo';

```

# 👨‍👨‍👦 Contributor

양상우 ( Front-End )

- Github : https://github.com/IGhost-P
- Email : dndb3599@gmail.com

# 🔍 Features

1. 사이드바 구현
2. 문서 편집기 구현

# 📚 Assignment

## 기본 요구사항

- [x] Document는 여러 개의 Document를 포함할 수 있다.
- [x] Root Document를 클릭하면 편집기 영역에 해당 Document의 Content를 렌더링한다.
- [x] 하위 Document가 있는 경우 트리 형태로 렌더링한다.
- [x] 각 Document 우측에는 + 버튼이 있고 클릭하면 하위 Document가 생성되고 편집화면으로 넘어간다.
- [x] 저장버튼 없이 지속적으로 서버에 저장되도록 한다.
- [x] 루트 URL 접속 시 편집기 선택이 안 된 상태이다.
- [x] documentId로 접속시 해당 Document의 content를 불러와 편집기에 로딩한다.

## 보너스 요구사항

- [x] 편집기 최하단에 현재 편집 중인 Document의 하위 Document를 렌더링한다.
- [] div와 contentEditable을 조합해서 좀 더 Rich한 에디터 구현
- [] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크

# 🛠 구현 설명

## 1. 설계

```jsx
📦src
 ┣ 📂api
 ┃ ┣ 📜api.js
 ┃ ┗ 📜documentApi.js
 ┣ 📂components
 ┃ ┣ 📂DocumentAdd
 ┃ ┃ ┗ 📜DocumentAdd.js
 ┃ ┣ 📂DocumentEdit
 ┃ ┃ ┗ 📜DocumentEdit.js
 ┃ ┣ 📂DocumentList
 ┃ ┃ ┗ 📜DocumentList.js
 ┃ ┣ 📂DocumentRoot
 ┃ ┃ ┗ 📜DocumentRoot.js
 ┃ ┣ 📂Editor
 ┃ ┃ ┗ 📜Editor.js
 ┃ ┣ 📂NotFound
 ┃ ┃ ┗ 📜NotFound.js
 ┃ ┗ 📜index.js
 ┣ 📂pages
 ┃ ┣ 📂DocumentPage
 ┃ ┃ ┗ 📜DocumentPage.js
 ┃ ┣ 📂SideBar
 ┃ ┃ ┗ 📜SideBar.js
 ┃ ┗ 📜index.js
 ┣ 📂public
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜document.png
 ┃ ┃ ┣ 📜fabicon.ico
 ┃ ┃ ┣ 📜greeting.png
 ┃ ┃ ┣ 📜plus.svg
 ┃ ┃ ┗ 📜trash.svg
 ┣ 📂styles
 ┃ ┣ 📂DocumentPage
 ┃ ┃ ┗ 📜DocumentPage.css
 ┃ ┣ 📂SideBar
 ┃ ┃ ┗ 📜SideBar.css
 ┃ ┣ 📜index.css
 ┃ ┗ 📜reset.css
 ┣ 📂util
 ┃ ┣ 📜createDomeElem.js
 ┃ ┣ 📜debounce.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜localStorage.js
 ┃ ┗ 📜querySelector.js
 ┣ 📜App.js
 ┣ 📜Main.js
 ┗ 📜router.js
```

- 컴포넌트를 분리해 재사용성을 높히려고 했습니다.
- util 함수는 따로 분리를 했습니다.

## 2. 컴포넌트 구조
![image](https://user-images.githubusercontent.com/79236624/202272271-b4eda580-0744-489b-ac5c-633b9cdce21f.png)

## 3. 컨벤션

### commit 컨벤션

- 네이밍 컨벤션
  - feat : 새로운 기능에 대한 커밋
  - build : 빌드 관련 파일 수정에 대한 커밋
  - doc : 문서 수정에 대한 커밋

```jsx
// 예시
// 알람 기능 추가시
feat: 진행바 기능 추가

// 알람 기능 리펙터링시
refactor: progress hook 분리
```

# 🤔 궁금한점

1. 상위 state에 값에 따라 변경되어야할 컴포넌트 (리스너가) 많아지는 경우를 생각해, useState를 만들어 보았는데.. 막상 사용할려니깐 하위 state에서는 state에 따라 render나 update를 해야하는 경우가 많아 상위 state에서만 사용하게되고 그 이후에는 사용하기 어려워 사용하지 않은게 되었습니다.

리스너가 많아질 경우 어떻게 처리를 하면 좋을까요?

```jsx
export function useState(initialState) {
	this.state = initialState;
	this.listeners = [];

	// listen 이라는 함수는 함수를 받아와를 listeneer에 담아 준다
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
```
