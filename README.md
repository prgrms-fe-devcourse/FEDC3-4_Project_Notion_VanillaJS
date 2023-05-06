# Notion Clone Project

## with Vanilla JS

### 프로젝트 특징

- 바닐라 JS만을 이용해 노션 클로닝을 진행하였습니다.
- 컴포넌트 방식, history API를 활용해 SPA로 구현하였습니다.
- 초기 목표는 최소한으로 데이터를 fetch 하는 것을 목표로 하였습니다.

- 프로젝트 기한
  - 2022/11/08 ~ 2022/11/16

### 구현한 기능

- 🎄 폴더 구조를 위해 재귀를 활용하여 트리 구조를 구현하였습니다.
- 🪤 구조 설계
<center><img src="https://user-images.githubusercontent.com/82329983/235961065-beec0dc5-f2a1-4978-a0f9-7110d88ec43c.png" width="500" height="300"></center>
- 👐 제목 작성시 낙관적 업데이트로 구현하여 입력시 변경 사항을 사이드바에서 확인할 수 있습니다.
- 🕰️ history API로 route를 활용했습니다.
- 🍞 breadcrumb 또한 재귀로 구현하여 경로를 표시할 수 있도록 했습니다.
- 📑 subdocument link를 구현하여 하위 페이지로 바로 접근할 수 있도록 구현했습니다.

### ♻️ 리팩토링을 진행한 부분들

- api 중복 바인딩 한 줄로 처리
- HTML inline style 속성을 CSS로 수정
- breadcrumb breadcrumb 방어 코드, 메서드 분리, validation 추가"
- checkdiffrence 함수 추가
- Editor 이벤트 디스트럭팅 변수 개선
- SubLink 삼항 연산자로 render 수정, 방어 코드 추가
- class로 display 속성 변경, 불필요한 async 삭제

---

🔗 회고 블로그 링크: https://mxxcode.tistory.com/116
