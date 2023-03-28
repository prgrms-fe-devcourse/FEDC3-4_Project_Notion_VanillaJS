# VanillaJS로 만든 노션 클로닝 프로젝트

## 배포 주소
[🔳 JooNotion](https://joo-notion.vercel.app/)

## 기능 구현
- History API를 이용해 SPA 형태로 개발
- 문서 생성, 수정, 삭제
- 하위문서 생성, 수정, 삭제
  - 하위문서의 토글 상태를 LocalStorage에 저장하여 새로고침해도 유지되도록 구현
- 문서 편집 시 API 호출을 줄이기 위해 디바운싱 구현
  - 마지막 입력 후 1초간 입력이 없으면 자동 저장
