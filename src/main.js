import DocumentList from "../components/DocumentList.js";

const $app = document.querySelector('#app');

const DUMMY_DAYA = [
  {
    "id": 48287,
    "title": null,
    "documents": [],
    "createdAt": "2022-11-08T06:08:47.980Z",
    "updatedAt": "2022-11-08T06:08:47.980Z"
  },
  {
    "id": 48288,
    "title": null,
    "documents": [],
    "createdAt": "2022-11-08T06:09:20.963Z",
    "updatedAt": "2022-11-08T06:09:20.963Z"
  },
  {
    "id": 48289,
    "title": null,
    "documents": [],
    "createdAt": "2022-11-08T06:09:27.063Z",
    "updatedAt": "2022-11-08T06:09:27.063Z"
  },
  {
    "id": 48290,
    "title": "저는 백민종",
    "documents": [],
    "createdAt": "2022-11-08T06:09:57.596Z",
    "updatedAt": "2022-11-08T06:09:57.596Z"
  },
  {
    "id": 48291,
    "title": "저는 백민종",
    "documents": [],
    "createdAt": "2022-11-08T06:11:48.737Z",
    "updatedAt": "2022-11-08T06:11:48.737Z"
  }
]


new DocumentList({ $target: $app, initialState: DUMMY_DAYA });