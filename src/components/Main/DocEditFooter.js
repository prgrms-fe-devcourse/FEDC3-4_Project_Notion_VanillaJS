import { makeElement } from "../../util/templates.js";

export default function DocEditFooter({ $target }) {
  const $footer = makeElement('footer', 'footer');
  $target.appendChild($footer);

  this.render = () => {
    $footer.innerHTML = `
      <p>
      Background Image &copy; <a href="https://www.vecteezy.com/free-vector/drip">Drip Vectors by Vecteezy</a>
      </p>
    `
  }

  this.render()
}