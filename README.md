## 📌 과제 설명
**endpoint.js 안에 API_END_POINT가 들어있습니다. 실행 시 하단 파일을 추가해주세요**
```js
// 최상단 폴더의 endpoint.js
export const API_END_POINT = '주소';
```

### 최종 완성된 디렉토리 루트
![Code_g7gmZ51VCH](https://user-images.githubusercontent.com/97251710/201970692-a1712951-5a04-4250-9049-6da2091fb608.png)


### 최종 플로우 차트
![제목없음](https://user-images.githubusercontent.com/97251710/201974047-05517c78-facc-4f5e-abd4-eddeda587f20.png)


### 작동 Sample
CSS 업데이트 이후 배포예정

![chrome_gaUeveN331](https://user-images.githubusercontent.com/97251710/201983249-5125ac1e-6b0d-40d9-b702-d7474f97762e.gif)

![chrome_Pw15SZVaih](https://user-images.githubusercontent.com/97251710/201983261-075967dd-397b-425e-8a69-f18b33685292.gif)

![chrome_a5k5QR7PR5](https://user-images.githubusercontent.com/97251710/201983908-0d425d2f-5bf5-48ee-ad90-84d4bbfde39a.gif)





## 👩‍💻 요구 사항과 구현 내용
- [x] Constents.js 에서 상수처리 분리
- [x] Debounce로 API의 자동 업데이트를 조절
- [x] checkError.js로 에러 체크
- [x] prettier 설정 완료
- [x] 왼쪽에 DocumentList.js로 리스트 불러오기
- [x] 하위문서 - 문서 생성 버튼
- [x] 하위문서 - 문서 하부문서 조회 버튼
- [x] 하위문서 - 문서 삭제 버튼
- [x] 하위문서 - 각 문서의 제목을 클릭 시 해당 글의 에디터로 이동 + 주소창 변경
- [x] 각 문서의 노드를 추가 삭제 조작하여 새로고침 전까지는 하부 문서가 보이게 함
- [x] 오른쪽에 DocumentEditor.js로 에디터 불러오기
- [x] 상단에 타이틀 (title)
- [x] 중단에 간단한 에디터 기능 버튼
- [x] 하단에 입력 박스 (contenteditable)
- [x] Api.js 를 통해 통신을 분리 (Asyne Await)
- [x] localStorage.js 를 통해 로컬 스토리지와 통신 (디바운스중 혹은 업로드가 되지 않았을 경우 local에 데이터를 저장)
- [x] Router.js 를 통해 이벤트 수신기를 달아주고 주소창에 입력 시 해당 값에 맞는 화면을 Route 처리 (/documents) , (/documents/[:id])
- [x] Router.js 를 통해 뒤로가기 등의 이벤트를 구현
- [x] 제일 처음 "/" 루트로 접속 시 => 새로운 ID에 글을 작성하는 에디터로 연결 (현재 임시 9999)
- [x] 지운 데이터에 뒤로가기 등으로 접근 시 혹은 없는 데이터 접근 시 => 경고창으로 알려주고 루트 주소("/")로 이동하기
- [x] 삭제 시 메인 루트에 붙이가
- [x] 삭제 시 confirm 삭제하시겠습니까? 추가
- [x] 잘못 된 주소값으로 설정 시 자동으로 "/"루트로 route change
- [x] 삭제 된 주소값으로 설정 시 자동으로 "/"루트로 route change
- [x] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
- [x] CSS를 세련되게 만들기 (with TailwindCSS)
- [x] 추가 구현사항 (CSS) 구현하기
- [x] 마크업 디자인에 맞게 컴포넌트 수정
- [x] Router 주소를 기존에서 "base_url/[username]" 과 문서 클릭시 "base_url/[username]/documents/[id]"로 변경
- [x] [username]을 location에서 가져와서 api 및 에디터에 로드
- [x] [username]을 변경하여 다른 유저의 리스트와 에디터 수정 가능
- [x] constant.js를 좀 더 상세히 분리
- [x] checkError.js를 좀 더 상세히 분리
- [x] debounce.js에 디바운스 기능 분리
- [x] 의식의 흐름대로 작성한 코드 전체 리팩토링
- [x] 각종 에러상황에 대한 에러체크 및 기능조정

## 🧐 고려사항
### SPA 혹은 컴포넌트 분할을 통해 재사용이 용의한가
최대한 많은 함수와 컴포넌트로 쪼개 보았지만 에디터라던지 일부 측면에서 미비한 것 같다.
먼저 큰 뼈대(DocumentList.js) -> 리스트를 모아주는 함수 (RenderDocumentItems.js) -> 각 리스트의 파츠(documentItem.js)
메인 화면에서 자식들을 로드 할때는 RenderDocumentItems.js , 글의 한개 추가 등은 documentItem.js를 통해 작성하였다.


### Fetch를 활용하여 API와 통신이 가능한가
api.js를 통해 데이터 통신이 이루어지며 에러 체크를 함깨 진행한다.
게시물 작성 시 Debounce를 통해 api통신은 작성이 끝난 뒤만 이루어지며
작성 중 새로고침 예기치못한 중단 등이 일어날 경우 
다음 사이트 방문시 localData와 apiData를 비교 후 갱신할지 물어본다.


### LocalStorage 등을 활용하여 데이터의 저장 활용이 가능한가
유저가 입력하는 정보를 로컬에 임시로 저장하며
api.js의 통신이 확인되면 해당 로컬데이터를 삭제하는 방식으로 구현


### History API 혹은 Router 기능을 JS로 구현이 가능한가
Router.js 를 통하여 주소를 새로고침 없이 컨트롤 구현
router 주소를 location으로 가져와 상태관리를 하였다.


### Debounce , Throttling등의 테크닉을 응용 가능한가
입력 정보는 디바운스를 통해 일정 시간 이상 입력이 없을 경우 api 데이터와 통신


### Async Await를 사용하여 능동적인 비동기 조작이 가능한가
api.js에서 통신을 주고 받을 때 Async와 Await을 사용


### CSS나 DOM 선택 및 조작이 가능한가 (Closest , Dataset 등의 조작)
최대한 id는 배제하고 Class는 TailwindCss의 디자인 용도로만 사용하였다.
화면에 데이터를 그린 이후에는 api 통신과 화면 새로고침을 최대한 억제하고 
Dom 위에 추가적으로 더하는 형식으로 구현하였다.


### 이벤트 디스패치 등을 통한 이밴트의 생성 부착 등이 가능한가
영상에서 딱히 많이 사용하면 컨트롤이 힘들다고 배워서 router.js를 구현할 때만 연습삼아 사용


### 최대한 많은 에러 체크 및 상수의 분리 등이 이루어졌는가
일단 생각나는 것은 전부 분리하였다.



## ✅ PR 포인트 & 궁금한 점
### 1. 각종 이벤트를 App.js로 모아서 한눈에 보는 것이 좋은가 파일을 분리하여 import하는것이 좋은가?

예를 들어 App.js에서 생성자 함수로 Todolist.js를 호출한다고 가정했을 때

**App.js**
![Code_ZCkLhTlMek](https://user-images.githubusercontent.com/97251710/200304163-7e35a5eb-5968-4f0b-8b40-b031b8478b7d.png)

**Todolist.js**
![Code_WSpBu5jjUH](https://user-images.githubusercontent.com/97251710/200304202-ee55465c-2336-4164-bc2f-023d9b681894.png)

![chrome_3q40ihcYQ9](https://user-images.githubusercontent.com/97251710/200307116-2e784c07-6815-4ae8-bac4-e112930530fc.png)

이와 같은 경우 강의에서 Todolist.js에서 할 함수의 역활을 app.js에서 정의해주고 있습니다. 
궁금한 점은 기능이 많아지면 App.js 에서 정의해야 할 함수나 역활이 매우 많아질 거 같은데
상태관리 측면에서 App에서 몰아서 처리하는게 나을지 
App.js의 역활이 복잡해짐으로 따로 import로 분리할지 궁금합니다.


###  2. Dom 선택에 대한 궁금증입니다.
```js
//먼저 $app으로 Dom을 지정
const $app = document.querySelector(".app")

//이후 dom을 선택하거나 이벤트를 부착할 때
$app.querySelector(".list")
$app.addEventListener("input", event)

document.querySelector(".list")
document.addEventListener("input", event)
```
두가지 방법으로 지정한다고 했을 때
**$app**으로 선언한 부분은 $app 하부에 있는 dom만 선택
**document**로 선언한 부분은 전체에서 장착

제가 생각하는게 맞는지 궁금합니다! 
`(재사용성을 고려하면 다른 dom을 선택하지 않기 위해 $app으로 선단을 선언하는게 맞는지도 궁금합니다)`

###  3. if문을 줄이는 일부 태크닉의 사용
이번에 이벤트를 붙이면서 일부 여러 이벤트가 선언되는 부분을 객체로 변경해 보았습니다.

**변경한 코드**
```js
const setEvent = {
    setDocumentButton: ($target) => setEditorEvent({ $target }),
    postDocumentButton: ($target) => postDocumentEvent({ $target }),
    deleteDocumentButton: ($target) => deleteDocumentEvent({ $target }),
    showChildDocumentButton: ($target) => showChildDocumentEvent({ $target }),
    hideChildDocumentButton: ($target) => hideChildDocumentEvent({ $target }),
    userNameButton: () => changeUserEvent(),
    newPageButton: () => newPageEvent(),
  };

  $target.addEventListener('click', (e) => {
    if (e.target.dataset.event) {
      setEvent[e.target.dataset.event](e.target);
    }
  });
```

**이전 코드**
```js
  $target.addEventListener('click', (e) => {
    if (e.target.dataset.event === "setDocumentButton" ) {
       setEditorEvent({ $target: e.target });
    }

    if (e.target.dataset.event === "postDocumentButton" ) {
      postDocumentEvent({ $target: e.target });
    }
    if (e.target.dataset.event === "deleteDocumentButton" ) {
       deleteDocumentEvent({ $target: e.target });
    }
    if (e.target.dataset.event === "showChildDocumentButton" ) {
       showChildDocumentEvent({ $target: e.target });
    }
    if (e.target.dataset.event === "hideChildDocumentButton" ) {
       hideChildDocumentEvent({ $target: e.target });
    }
    if (e.target.dataset.event === "userNameButton" ) {
       changeUserEvent();
    }
    if (e.target.dataset.event === "newPageButton" ) {
       newPageEvent();
    }
  });

```

혹시 다른 태크닉이나 조금 더 현명한 방법이 잇는 지 알고 싶습니다.


<!-- ## ✅ 피드백 반영사항  -->
