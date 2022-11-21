# 📌 4주차 프로젝트[Project1]

![image](https://user-images.githubusercontent.com/76807107/203049404-1093e5f9-f895-457a-be7c-b087694c85f9.png)

## 배포 주소

https://dmswl98-notion-clone-project.netlify.app/

## 기본 요구사항

- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.

## 추가 요구사항

- [x] 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
- [x] 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.
- [ ] 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.

## 추가 구현사항

- [x] Sidebar 숨기기, 펼치기 기능
- [x] 텍스트 스타일(굵게, 기울기, 밑줄, 삭선, 색깔) 모달 구현
- [x] 상위 문서를 삭제한 경우, 내부 하단 문서까지 모두 삭제하도록 구현

## 개선 사항

- [ ] 첫 화면일 때 사이드 바의 숨기기 버튼 없애기
- [ ] 사이드 바가 펼쳐져 있을 때, 사이드 바 숨기기 버튼 없애기
- [ ] 스크롤 시 텍스트 스타일 모달이 제 위치에 뜨지 않는 문제 해결하기
- [ ] XSS 취약점 개선
- [ ] 문서의 제목을 변경할 경우 Sidebar에 변경된 제목을 낙관적 업데이트로 반영하기
- [ ] 문서를 생성했을 때 새로 생성된 문서로 이동 및 랜더링하기
