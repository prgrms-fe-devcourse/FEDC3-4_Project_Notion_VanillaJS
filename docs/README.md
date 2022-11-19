## 노션 클로닝 프로젝트 (with Vanila JS)

### 필수 구현목록

- [x] 왼쪽에 document 트리를 볼 수 있다.
  - [x] 루트 document 좌측에 위치한 화살표를 클릭하면, 하위 document를 볼 수 있다.
  - [x] 하위 document가 없을 경우, `하위 문서가 없습니다`를 보여준다.
  - [ ] document 우측에 위치한 `+`버튼을 클릭하면, 클릭한 document 하위에 새 document를 생성하고, 편집기로 커서가 이동한다.
  - [x] document 우측에 위치한 `X`버튼을 클릭하면, 해당 document가 삭제된다.
    - `조건` 하위 document가 있다면, 하위 document까지 다 삭제된다.
  - [x] document를 클릭하면, 오른쪽에 document의 content를 볼 수 있다.
  - [x] 트리 맨 아래, 페이지 추가하기를 누르면, root에 페이지가 추가된다.
- [x] 오른쪽은 해당 document의 content 편집할 수 있는 편집기가 있다.
  - [x] 편집기는 지속적으로 서버에 저장된다 (Document Save API 이용해 자동저장 구현)
  - [x] 편집기 제목이 수정됐을 때, 지속적으로 반영된다.
- [ ] 처음 들어왔을 때, documenut가 있다면 Root document를 보여준다.
  - [ ] document가 없다면, 문서를 추가하는 버튼을 보여준다.
- [x] URL 접근 시, 왼쪽엔 해당 document, 오른쪽엔, document content를 보여준다.
  - `조건` URL: /documents/{documentId}

<br />

### 추가 구현목록

추가로 구현하고 싶은 것들 적어놓고, 하나씩 하기

- [ ] 새로운 document page에 글을 적었을 때, 생성하기 (현재는 클릭하면 바로 생성)
- [x] URL 접근 시, 유효하지 않은 documentId일 때 -> 404페이지 처리
