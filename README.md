### 📘 UI
![image](https://user-images.githubusercontent.com/67576476/202186472-d685a8de-2344-41eb-b607-95e664007c72.png)

### 📘 컴포넌트 설명

📌 main.js : index.html에 불러오는 전체 모듈

📌 App.js : 전체 화면을 렌더링 하는 컴포넌트

📌 postPage.js : document들의 리스트, 헤더, 새로운 페이지 추가 버튼을 렌더링
- postPage의 state는 api에서 받아온 document 리스트
- setState시 postList를 업데이트 해준다.

 ◼ Header.js : 리스트 위 헤더 컴포넌트
 ◼ PostList.js : documents 리스트를 보여주는 컴포넌트, toggle, content, del, add 에 각각 클릭 이벤트를 넣어주어
     toggle 시에는 하위 리스트를 display를 변경
     content 시 url 이동
     add, del 시 onAdd, onDelete 함수를 호출
◼ LinkButton : url 이동할 수 있게 하는 컴포넌트(재사용을 위해 만듬)


📌 PostEditPage.js : editor을 렌더링
- PostEditPage의 state는 { postId, post: {title, content} }의 객체 형태
- postLocalSaveKey가 new일 때는 루트 디렉토리에 새로운 페이지를,
                                   new-{documentId}일 때는 해당 id를 가진 디렉토리 하위에 새로운 페이지를 ,
                                   documentId일때는 기존 페이지에서 수정하도록 설정

◼ Editor.js : 제목과 내용을 작성할 수 있는 에디터
(스타일을 변경할 수 있지만 저장되지 않음- 수정예정)


📌 기타 함수 컴포넌트
- router.js : url에 따라 랜더링 할 수 있도록 url을 변경하는 이벤트 함수(push) 
- storage.js : 로컬 스토리지를 사용하는 함수 커스텀(에러처리, 기본값 지정)
