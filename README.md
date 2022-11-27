# 📌 4주차 프로젝트[Project1]

### 배포: https://yuri-notion.vercel.app/

## 📌 과제 설명

VanillaJS로 [노션(Notion)](https://www.notion.so/ko-kr)을 클로닝했습니다.

### 실행 방법
1. /src/utils에 key.js 파일을 생성하고 `API_END_POINT` 값을 설정합니다.
2. 루트 디렉토리에서 터미널로 `npm start` 또는 `npx serve -s`를 실행합니다.

### 디렉토리 구조
<img width="30%" src="https://user-images.githubusercontent.com/63575891/202363329-abd996ae-f330-4bee-81a7-05cb50a3ed8b.png">

## 👩‍💻 요구 사항과 구현 내용 

- 화면 좌측에 루트 Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  - 루트 Document를 클릭하면 오른쪽 편집기 영역에 해당 Document를 렌더링합니다.
  - 해당 루트 Document에 하위 Document가 있는 경우 해당 Document 아래에 트리 형태로 렌더링합니다.
  - Document Tree에서 각 Document 우측의 `+` 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
  - 열린 Document 목록의 documentId를 localStorage에 저장하여 새로고침해도 열린 상태를 유지합니다.
  - 현재 접속 중인 Document를 하이라이트합니다.
  - 루트 Documents나 Sidebar 하단의 버튼을 클릭하여 루트 Document를 추가합니다.
  - Document 제목이 긴 경우 생략 처리(`...`)합니다.
- Document Save API를 이용해 지속적으로 서버에 저장합니다.
  - Document의 제목을 수정하면 Sidebar와 Document.title에 반영됩니다.
- History API를 이용해 SPA 형태로 만듭니다.
  - 루트 URL 접속 시 별도의 편집기를 선택하지 않습니다.
  - `/documents/{documentId}` 로 접속 시 해당 Document를 불러와 편집기에 로딩합니다.
    - 존재하지 않는 documentId로 접속 시 첫 Document를 렌더링합니다.
- 편집기 최하단에는 현재 편집 중인 Document의 하위 Document를 렌더링합니다.
- 삭제(휴지통) 버튼을 클릭하면 Document를 삭제합니다.
  - 현재 편집 중인 Document를 삭제하면 첫 Document를 렌더링하고 Document Tree를 변화합니다. 
  - 현재 편집 중이 아닌 Document를 삭제하면 Document Tree만 변화합니다.

### 루트 Document 추가 및 수정

<img src="https://user-images.githubusercontent.com/63575891/202364444-b1e0a2b8-8d51-4718-afc0-aeaea15bbca2.gif" />

### 하위 Document 추가 및 수정

<img src="https://user-images.githubusercontent.com/63575891/202364754-470346e2-fce6-473b-9a05-0fe42d68705c.gif" />

### Document 삭제

<img src="https://user-images.githubusercontent.com/63575891/202365057-a118535a-a4ea-49b3-b4d7-598c3d73db0f.gif" />

### 존재하지 않은 Document 접속

<img src="https://user-images.githubusercontent.com/63575891/202364872-e6764c3c-163f-425d-91c0-6cd6e38f4b12.gif" />

### 현재 편집 중인 Document의 하위 Document 렌더링

<img src="https://user-images.githubusercontent.com/63575891/202368323-26148d38-93d6-4fed-b6ce-d322cab10689.gif" />
