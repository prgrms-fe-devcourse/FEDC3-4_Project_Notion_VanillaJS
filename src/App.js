function App({ target }) {
  this.route = async () => {
    target.innerHTML = "";
    const { pathname } = location;

    if (pathname === "/") {
    } else if (pathname.indexOf(`${documentsUrl}/`) === 0) {
      const [, , postId] = pathname.split("/");
    }
  };

  this.route();
}

export default App;