# 📌 4주차 프로젝트[Project1]

## 필수 구현사항

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

## 진행 예정 (화)

- [ ] constant.js를 좀 더 상세히 분리
- [ ] checkError.js를 좀 더 상세히 분리
- [ ] debounce.js에 디바운스 기능 분리
- [ ] 의식의 흐름대로 작성한 코드 전체 리팩토링

## 진행 예정 (수)

- [ ] 에디터의 CSS 변경
- [ ] CSS를 노션과 조금 더 유사한 형태로 변경
- [ ] 각종 에러상황에 대한 에러체크 및 기능조정

![제목없음 (2)](https://user-images.githubusercontent.com/97251710/200494997-0cec547b-d98a-47bd-a109-8b25a9dcac9d.png)

기능이 모두 연결된 베이스 페이지 (without CSS)
![chrome_i1MJFxMLeD](https://user-images.githubusercontent.com/97251710/201684438-efa7335d-cbb4-42c3-9146-e6b1dba9a3b5.png)

마크업이 끝난 노션페이지 (TailwindCSS)
![chrome_fOxncKNsfx](https://user-images.githubusercontent.com/97251710/201684559-ffe3c1d2-729e-4426-a87f-e647c05fc286.png)
