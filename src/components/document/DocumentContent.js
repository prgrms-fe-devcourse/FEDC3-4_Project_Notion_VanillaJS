export default function DocumentContent({
  $target,
  initialState = {
    content: "",
  },
}) {
  this.$target = $target;
  this.state = initialState;

  this.init = () => {
    this.render();
  };

  this.setState = (newState) => {
    this.state = { ...this.state, ...newState };
    this.render();
  };

  this.render = () => {
    const { content } = this.state;

    this.$target.innerHTML = `
      <div id="document-editor" name="content" contenteditable="true" placeholder="Type for creating new document">${content}</div>
    `;
  };

  this.setEvent = () => {};

  this.init();
}
