# 📌 3주차 과제[Mission3]

## 필수 과제

-   과제 기한
    -   과제 수행 기간 : 2022년 10월 31일(월) ~ 2022년 11월 4일(금)
    -   멘티 코드 리뷰 기간 : 2022년 11월 5일(토) ~ 2022년 11월 8일(화)
    -   멘토 코드 리뷰 기간 : 2022년 11월 5일(토) ~ 2022년 11월 10일(목)
    -   코드 리뷰 반영 기간(개인 프로젝트 종료 후) : 2022년 11월 17일(목) ~ 2022년 11월 21일(월)
-   내용
    -   지금까지 만든 **Simple List Todo 앱을 강화**합니다. 아래의 요구사항을 만족하는 코드를 올려주세요.

### 공통

-   [x] 컴포넌트에 new를 붙이지 않고 쓸 경우 에러가 나도록 방어코드를 넣어주세요.
        [feat: 생성자 함수 체크 기능 구현](https://github.com/prgrms-fe-devcourse/FEDC3-3_VanillaJS_1/pull/18/commits/b759f696ba3bd4623e0aa728c8d343f91275387b)

-   [x] state를 갖는 컴포넌트의 경우, initialState를 받는 부분과 setState 함수에서 nextState를 받는 부분에서 state에 대한 validation을 추가해주세요.
        [feat: Validation 추가](https://github.com/prgrms-fe-devcourse/FEDC3-3_VanillaJS_1/pull/18/commits/13807108766a72e53484fb3ab62932b409d8b822)

-   [x] 가급적 변수는 const로 선언하며, 부득이한 경우에만 let을 사용합니다.

### TodoList

-   [x] To do의 값에 isCompleted라는 값을 추가합니다. 그리고 TodoList의 Todo를 클릭하면 해당 값이 토글 되도록 만듭니다.

    -   isCompleted가 true인 경우 text에 삭선이 그어지도록 해주세요. false로 바뀌면 삭선을 없애주세요.

-   [x] Todo text 옆에 삭제 button을 만듭니다. 누르면 삭제 되도록 처리합니다.
        [feat: TodoList 기능 추가](https://github.com/prgrms-fe-devcourse/FEDC3-3_VanillaJS_1/pull/18/commits/77ac482e4752160427277b8ba5db0654cb94ba13)

### TodoCount

-   [x] TodoCount 컴포넌트를 만듭니다.이 컴포넌트는 TodoList 아래에 렌더링 되어야 하며, 완료된 Todo의 갯수 / 전체 Todo 갯수를 표시해주면 됩니다.
    -   이때 TodoCount에서 TodoList에 직접 접근해서 데이터를 가져오면 안 됩니다.
        [feat: 요구사항 구현완료](https://github.com/prgrms-fe-devcourse/FEDC3-3_VanillaJS_1/pull/18/commits/a25d360cc8b259c3eec21d2acd762f43bc91c0da)

## 추가 구현 과제

-   [x] 폴더 구조를 개선했습니다.
        [2주차 멘토쳇 디렉토리 구조란?](https://junghan92.medium.com/%EB%B2%88%EC%97%AD-%EB%AA%85%ED%99%95%ED%95%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%8C%8C%EC%9D%BC-%EB%94%94%EB%A0%89%ED%84%B0%EB%A6%AC-%EA%B5%AC%EC%A1%B0-a5f03a174b9e)

-   [x] 이벤트 위임 (Event delegation) 을 통해 Todolist의 ul 요소에 전체적으로 addEventListener를 걸었습니다.
        [이벤트 델리게이션](https://ko.javascript.info/event-delegation)

-   [x] beforeunload를 통하여 로컬 데이터의 접근을 **최초 한번** 그리고 **종료 전에 한번**만 하도록 변경했습니다.
        [beforeunload](https://zerosial.tistory.com/entry/preload-beforeunload%EB%A5%BC-%ED%99%9C%EC%9A%A9%ED%95%98%EC%9E%90)

-   [x] dataset , closest를 통한 DOM 객체를 조작했습니다.
        [Dataset](https://ko.javascript.info/dom-attributes-and-properties#ref-3653)

-   [x] constants.js를 통해 상수를 분리하였습니다.

## ✅ PR 포인트 & 궁금한 점

-   구조상 Todocount와 Todolist 이외에 다른 함수 (예를 들어 **Header.js**와 **TodoForm.js**)의 경우 첫 로드 후에 다시 불러올일이 없습니다. 이경우 굳이 **생성자 함수를 사용하지 말고 화살표 함수로 구현**해주는게 옳을까요?

-   new를 통해 불러와야 하는 **Todocount와 Todolist** (둘다 이벤트 발생시 repaint) 를 작성할 때
    한번만 사용되는 기능들 (예를들어 이벤트 위임을 이용한 최상단 addEventListener 걸기 등) 이나
    new로 불러온 최상단 App.js에서 더이상 접근할 일이 없는 값 (todolist.setState 등 이외의 값)은
    굳이 this로 바인딩 하는거 보다 `const setEvent = () => {}` 등으로 화살표 함수를 사용하는게 좋을까요?

![Code_rt6YV3ODN3](https://user-images.githubusercontent.com/97251710/199985681-68106744-3701-4c6a-9d50-c606476ac703.png)
![Code_pP2lZ3z88f](https://user-images.githubusercontent.com/97251710/199985690-c75a8ec0-f54d-4853-b3ce-2e88e1712af5.png)

즉 이 2가지의 방법 중 하나로 header.js 를 불러올 경우 어떠한 것이 더 타당한지 등이 궁금합니다.

-   에러 메세지 (한번만 사용되는) 등은 재사용성을 고려해 처음부터 constants에 만드는 게 좋을까요?
    어디까지 상수로 따로 빼고 어디까지 한 컴포넌트에서 사용할 지에 대한게 궁금합니다.

-   에러 체크 혹은 작동에 있어서 개선되어야 할 부분이 궁금합니다.

-   강의에서 App.js 등으로 onClick 등을 가져와서 내용을 적어줬는데
    이렇게 하는 경우와 그냥 컴포넌트 안에서 바로 실행해 버리는 것이 큰 차이가 있나요??
    어떤 차이가 있는건지 명확히 감이 안잡힙니다. 단순히 연결을 느슨하게 하는 의미일까요?

<!--  ## ✅ 피드백 반영사항  --
