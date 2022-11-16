import Sidebar from './components/Sidebar.js';
import EditPage from './components/EditPage.js';
import { initRouter } from './utils/router.js';

export default function App({
  $target
}){
  
  const sidebar = new Sidebar({
    $target,
    initialState: []
  })

  const editPage = new EditPage({
    $target,
    initialState: {}
  })
  
  this.route = async () => {
    $target.innerHTML = '';
    
    const { pathname } = window.location;
    
    console.log(pathname);
    
    if(pathname === '/'){
      sidebar.setState();
    }else if(pathname.indexOf('/documents') === 0){
      const [, , id] = pathname.split('/');
      await sidebar.setState();
      await editPage.setState({ id });
    }
  }

  this.route();

  initRouter(() => this.route());

  window.addEventListener('popstate', () => this.route());
}