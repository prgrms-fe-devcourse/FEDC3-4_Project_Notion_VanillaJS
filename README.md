# 4주차 프로젝트[Project1]

## 필수 프로젝트

- 프로젝트 기한
  - 프로젝트 수행 기간 : 2022년 11월 8일(화) ~ 2022년 11월 16일(수)
  - 멘티 코드 리뷰 기간 : 2022년 11월 17일(목) ~ 2022년 11월 20일(일)
  - 멘토 코드 리뷰 기간 : 2022년 11월 17일(목) ~ 2022년 11월 22일(화)
  - 코드 리뷰 반영 기간 : 2022년 11월 23일(수) ~ 2022년 11월 25일(금)
- 내용
  - **Day 17 [프로젝트] 노션 클로닝 요구사항** 확인 부탁드립니다.
  

## 📌 과제 설명 <!-- 어떤 걸 만들었는지 대략적으로 설명해주세요 -->
바닐라JS로 구현한 Notion 클로닝 프로젝트

## 👩‍💻 요구 사항과 구현 내용 <!-- 기능을 Commit 별로 잘개 쪼개고, Commit 별로 설명해주세요 -->
### 기본 요구 사항
- [x] 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다.
- [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
- [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
- [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
- [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
- [x] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
- [x] History API를 이용해 SPA 형태로 만듭니다.

### 추가 구현 사항
- [x] 전체 css 적용
- [x] Document 리스트에서 현재 선택된 Document 나타내기
- [x] Editor에서 title 입력 시 Document 리스트에도 바로 반영
- [ ] 새 페이지 만들기 버튼 클릭 시, Document 리스트 스크롤이 맨 밑으로 이동 되도록 하기 
- [ ] 새로고침 혹은 이벤트 처리 후의 Document 리스트 현재 상태 유지 시키기 (리렌더링 안되게 막기) 

### 구조
![notion](https://user-images.githubusercontent.com/50357236/202385848-90d8a113-b923-438f-82d3-1eecffb5a425.png)

### ScreenShot
![notion](https://user-images.githubusercontent.com/50357236/202384167-d927564f-0ca0-4f53-a498-f11ab7164d31.JPG)

