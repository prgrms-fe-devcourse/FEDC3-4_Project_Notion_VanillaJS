import PostList from "./PostList.js";

const DUMMY_DATA = [
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
            documents: [
              {
                id: 4,
                title: "으아아아",
                documents: [
                  {
                    id: 5,
                    title: "으아아아",
                    documents: [],
                  },
                ],
              },
            ],
          },
          {
            id: 6,
            title: "함냐함11냐",
            documents: [],
          },
        ],
      },
      {
        id: 7,
        title: "블라블라",
        documents: [
          {
            id: 8,
            title: "함냐함냐",
            documents: [],
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "hello!",
    documents: [],
  },
];

const $target = document.querySelector("#app");

new PostList({
  $target,
  initialState: DUMMY_DATA,
});
