import App from "./App.js";
import { setItem, getItem } from "./Storage.js";
import { request } from "./Api.js";

// parent가 null이면 루트 Document가 됩니다.
// 특정 Document에 속하게 하려면 parent에
// 해당 Document id를 넣으세요.
// const insert = await request("documents", {
//   method: "POST",
//   body: JSON.stringify({
//     title: "Why title is null",
//     parent: null,
//   }),
// });
// console.log(insert);

// await request("documents/48338", {
//   method: "DELETE",
// });

const initialState = await request("documents", {
  method: "GET",
});

const page = await request("documents/48346", {
  method: "GET",
});

console.log(page);
//const initialState = getItem('contents', [])

const Dummy = [
  {
    id: 1, // Document id
    title: "노션을 만들자", // Document title
    documents: [
      {
        id: 2,
        title: "블라블라",
        documents: [
          {
            id: 3,
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
      {
        id: 9,
        title: "2번째 자식임.",
        documents: [
          {
            id: 8,
            title: "2번째 자식의 자식임.",
            documents: [],
          },
        ],
      },
      {
        id: 10,
        title: "3번째 자식임",
        documents: [
          {
            id: 6,
            title: "3번째 자식의 자식임",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "hello!",
    documents: [],
  },
];

const $app = document.querySelector("#app");

new App({
  $target: $app,
  initialState: Dummy,
});
