// import DocumentPage from "./components/DocumentPage/DocumentPage.js";
import EditPage from "./components/EditPage/EditPage.js";
import { documentId1, documentsList } from "./fakeDb.js";

const $container = document.querySelector("#container");

// const documentPage = new DocumentPage({
//   $target: $container,
//   initialState: [],
// });

// documentPage.setState(documentsList);

// const editPage = new EditPage({
//   $target: $container,
//   initialState: {
//     title: "",
//     content: "",
//   },
// });

//documentId1을 불러왔을 때
editPage.setState(documentId1);

//새로운 document를 불러왔을 때
// editPage.setState({
//   title: "",
//   content: "",
// });
