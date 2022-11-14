export default function Header({ $target, initialState }) {
  const $header = document.createElement("div");
  $target.appendChild($header);

  this.state = initialState;

  this.render = () => {
    const { user, email } = this.state;
    $header.innerHTML = `
        <h3> ${user}의 notion</h3>
        <h5>${email}</h5>
        `;
  };

  this.render();
}
