# 📌 4주차 프로젝트[Project1]

## 필수 구현사항

- [X] Constents.js 에서 상수처리 분리
- [X] Debounce로 API의 자동 업데이트를 조절
- [X] checkError.js로 에러 체크
- [X] prettier 설정 완료
- [X] 왼쪽에 DocumentList.js로 리스트 불러오기
- [X] 하위문서 - 문서 생성 버튼
- [X] 하위문서 - 문서 하부문서 조회 버튼
- [X] 하위문서 - 문서 삭제 버튼
- [X] 하위문서 - 각 문서의 제목을 클릭 시 해당 글의 에디터로 이동 + 주소창 변경
- [X] 각 문서의 노드를 추가 삭제 조작하여 새로고침 전까지는 하부 문서가 보이게 함
- [X] 오른쪽에 DocumentEditor.js로 에디터 불러오기
- [X] 상단에 타이틀 (title)
- [X] 중단에 간단한 에디터 기능 버튼
- [X] 하단에 입력 박스 (contenteditable)
- [X] Api.js 를 통해 통신을 분리 (Asyne Await)
- [X] localStorage.js 를 통해 로컬 스토리지와 통신 (디바운스중 혹은 업로드가 되지 않았을 경우 local에 데이터를 저장)
- [X] Router.js 를 통해 이벤트 수신기를 달아주고 주소창에 입력 시 해당 값에 맞는 화면을 Route 처리 (/documents) , (/documents/[:id])
- [X] Router.js 를 통해 뒤로가기 등의 이벤트를 구현

## 추가 구현사항
- [ ] 기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.
- [ ] 에디터를 세련되게 만들기
- [ ] CSS를 세련되게 만들기 (with TailwindCSS)
- [ ] 에디터 하부에 DocumentLink.js 생성
- [ ] 해당 탭에서 작성중인 문서의 하위 문서 링크를 제작하여 전달

## 진행 예정
- [ ] 제일 처음 "/" 루트로 접속 시 => 새로운 ID에 글을 작성하는 에디터로 연결 (현재 임시 9999)
- [ ] 지운 데이터에 뒤로가기 등으로 접근 시 혹은 없는 데이터 접근 시 => 경고창으로 알려주고 루트 주소("/")로 이동하기
- [ ] 추가 구현사항 (CSS) 구현하기
- [ ] constant.js를 좀 더 상세히 분리
- [ ] checkError.js를 좀 더 상세히 분리
- [ ] debounce.js에 디바운스 기능 분리
- [ ] 의식의 흐름대로 작성한 코드 전체 리팩토링
- [ ] DocumentLink.js 구현하기

![제목없음 (2)](https://user-images.githubusercontent.com/97251710/200494997-0cec547b-d98a-47bd-a109-8b25a9dcac9d.png)

$ npm i dotenv
