import PostPage from './posts/PostPage.js';
import SidebarPage from './sidebar/SidebarPage.js';

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.$main = document.createElement('main');
    this.state = {};
    this.isMount = false;

    this.render();
    $target.appendChild(this.$main);
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  render() {
    if (!this.isMount) {
      this.isMount = true;

      new PostPage({ $target: this.$main });
      new SidebarPage({ $target: this.$main });
    }
  }
}

export default App;
