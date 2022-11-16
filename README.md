# 📌 4주차 프로젝트[Project1]

## 필수 프로젝트

글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 root Documents를 렌더링합니다.
- [x] Root Documents를 클릭하면 오른쪽 편집기 영역에 해당 Docuement의 Content를 렌더링 합니다.
- [x] 해당 Root Document에 하위 Document가 있는 경우 , 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면 , 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA형태로 만듭니다.
- [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안된 상태입니다.
- [x] /documents/{documentId} 로 접속시 , 해당 Document content를 불러와 편집기에 로딩합니다.
- [x] Header 버튼 클릭하면 정상적으로 새로운 Document 생성되는데 초기값 null 들어가는 현상
- [x] '제목없음' ,'내용없음' 초기에 grey color , input 들어오면 색 변경
- [x] putMethod 404 Error
- [x] Editor content 부분 textarea 값 변경 안되는 현상
- [x] Editor content 부분 입력할때 textarea 2 개행 이상부터 안보이는 현상
- [x] 상위 Document 삭제하면 하위 Document 같이 삭제가 되야 하는데 상위 Document 밑으로 이동 되는 현상
- [x] 상위 Document 삭제하면 최하위 Document 삭제 안되는 현상
- [x] 예외처리 작업, '/documents'-> documentsUrl 변경
- [x] Editor content 부분 textarea 렌더링 했을때 2 개행 이상부터 잘려서 안나오는 현상
- [x] Editor content 일정 개행 이상 넘어가면 title 안보이는 현상
- [ ] 버튼 이미지 넣어서 관리 -> 현재 text로 들어가 있음
- [ ] 편집기 하단에는  Documents의 하위 Document 링크를 렌더링하도록 생성
- [ ] onDelete 리팩토링 필요 

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2022년 11월 8일(화) ~ 2022년 11월 16일(수)
  - 멘티 코드 리뷰 기간 : 2022년 11월 17일(목) ~ 2022년 11월 20일(일)
  - 멘토 코드 리뷰 기간 : 2022년 11월 17일(목) ~ 2022년 11월 22일(화)
  - 코드 리뷰 반영 기간 : 2022년 11월 23일(수) ~ 2022년 11월 25일(금)
- 내용
  - **Day 17 [프로젝트] 노션 클로닝 요구사항** 확인 부탁드립니다.