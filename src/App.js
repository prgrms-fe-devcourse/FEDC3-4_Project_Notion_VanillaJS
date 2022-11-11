import DocList from "./components/DocList.js";
import { request } from "./components/api.js";
import { DUMMY_DATA } from "./components/util/dummy.js";

export default function App({ $target }) {
  
  const docList = new DocList({
    $target,
    initialState: []
  })

  this.setState = async () => {
    const rootDocs = await request('/documents')
    docList.setState(rootDocs)
  }

  docList.setState(DUMMY_DATA)

  // this.setState()

}