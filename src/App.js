import { request } from "./api.js";
import { initRouter, push } from "./router.js";
import PostPage from "./routes/PostPage.js";
import SideBar from "./routes/SideBar.js";

export default function App({ $target }) {
  if (!new.target) {
    throw new Error("App 컴포넌트에 new 생성자가 필요합니다.");
  }

  this.state = {
    isLoading: false,
    res_doument:[],
    res_content:[]
  };

  this.setState = (nextState,isRenderSideBar=true) => {
    this.state = nextState;
    console.log(nextState)
    postPage.setState(this.state.res_content);
    sideBar.setState(this.state,isRenderSideBar);
  };

  const sideBar = new SideBar({
    $target,
    initialState: this.state,
  });

  const postPage = new PostPage({
    $target,
    initialState: this.state,
  });

  this.init = async () => {
    try {
      this.setState({
        ...this.state,
        isLoading: true,
      });

      const res_doument = await request("/");
      const rootId = res_doument[0].id
      const res_content = await request(`/${rootId}`)

      this.setState({
        ...this.state,
        res_doument,
        res_content
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.setState({
        ...this.state,
        isLoading: false,
      });
    }
  };

  this.route = async() => {
    const { pathname } = window.location;
    if (pathname === "/") {
      
    } else if (pathname.indexOf("/posts/") === 0) {
      const [, , postId] = pathname.split("/");
      const res_content = await request(`/${postId}`);
     
      this.setState({
        ...this.state,
        res_content
      },false)
    }
  };

  this.init();
  initRouter(()=>this.route())
}
