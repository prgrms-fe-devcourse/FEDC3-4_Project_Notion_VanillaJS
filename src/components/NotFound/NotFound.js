export function NotFound({ $target }) {

    const generateHTML = () => `<img class="not-found-img" src="https://i.imgur.com/EQJG7Qb.png" alt="Not Found" />`

    this.render = () => {
        $target.innerHTML = generateHTML();
    }
}
