class App {
  constructor({ $target }) {
    this.$target = $target;
    this.$main = document.createElement('main');

    this.state = {};
    this.isMount = false;

    $target.appendChild(this.$main);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (!this.isMount) {
      this.isMount = true;
    }
  }
}

export default App;
