# 📌 4주차 프로젝트[Project1]

## 📝 구현사항
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

### 진행 예정 (수)

- [ ] 에디터의 CSS 변경
- [ ] CSS를 노션과 조금 더 유사한 형태로 변경


### 시작 시 정한 플로우 차트
![제목없음 (2)](https://user-images.githubusercontent.com/97251710/200494997-0cec547b-d98a-47bd-a109-8b25a9dcac9d.png)



### 최종 완성된 디렉토리 루트
![Code_g7gmZ51VCH](https://user-images.githubusercontent.com/97251710/201970692-a1712951-5a04-4250-9049-6da2091fb608.png)



### 최종 플로우 차트
![제목없음](https://user-images.githubusercontent.com/97251710/201974047-05517c78-facc-4f5e-abd4-eddeda587f20.png)


## 🧐 고려사항

### SPA 혹은 컴포넌트 분할을 통해 재사용이 용의한가
최대한 많은 함수와 컴포넌트로 쪼개 보았지만 에디터라던지 일부 측면에서 미비한 것 같다.
먼저 큰 뼈대(DocumentList.js) -> 리스트를 모아주는 함수 (RenderDocumentItems.js) -> 각 리스트의 파츠(documentItem.js)
메인 화면에서 자식들을 로드 할때는 RenderDocumentItems.js , 글의 한개 추가 등은 documentItem.js를 통해 작성하였다.

### Fetch를 활용하여 API와 통신이 가능한가
api.js를 통해 데이터 통신이 이루어지며 에러 체크를 함깨 진행한다.

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
