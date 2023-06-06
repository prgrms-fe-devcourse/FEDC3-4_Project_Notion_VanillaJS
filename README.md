# 📖노션 클로닝 프로젝트
바닐라 자바스크립트를 이용해서 노션의 CRUD 기능을 클론한 프로젝트입니다.

[⭐노션 프로젝트 배포](https://notion-clone-zero.netlify.app)  
[😊노션 프로젝트 프로젝트 회고](https://yj-zero.tistory.com/155)  


![노션](https://user-images.githubusercontent.com/107309247/218081499-320425e4-73b5-4086-ae1c-9f8df91d1d95.gif)

<br/>

### 📁 폴더구조
---

```
├─src
│  │  App.js
│  │  main.js
│  │  
│  ├─Page
│  │  ├─editPage
│  │  │      Editor.js
│  │  │      MarkUpList.js
│  │  │      PostEditPage.js
│  │  │      
│  │  ├─listPage
│  │  │      Header.js
│  │  │      PostList.js
│  │  │      PostPage.js
│  │  │      
│  │  └─startPage
│  │          StartPage.js
│  │          
│  └─utils
│          api.js
│          debounce.js
│          instanceCheck.js
│          router.js
│          storage.js
│          
└─style
        style.css
 ```

### 🙋‍♀️요구사항
---
- 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  - 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  - Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- History API를 이용해 SPA 형태로 만듭니다.
  - 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  - `/documents/{documentId}` 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.
- 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.

### 👩‍💻주요 구현 내용
---
1. 재귀함수를 통해 하위문서 구현<br />
: 재귀함수를 사용해서 노션의 하위문서 기능을 구현

![노션 하위 문서 생성](https://user-images.githubusercontent.com/107309247/227222006-a6ab619c-db91-45bd-a8c2-be47900c758d.gif)

2. 게시글 생성, 수정, 및 삭제

![노션 글 작성 및 수정, 삭제](https://user-images.githubusercontent.com/107309247/227223944-5b8b2e92-d6a3-4f9e-98e6-0886c15d52c5.gif)


3. 하위 게시글 생성, 수정 및 삭제

![노션 하위 글 작성 및 수정, 삭제](https://user-images.githubusercontent.com/107309247/227223327-03a0debc-0555-4b77-9c97-733ebc644d47.gif)

