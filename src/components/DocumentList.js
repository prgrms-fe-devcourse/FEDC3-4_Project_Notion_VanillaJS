import { push } from '../utils/router.js';

export default function DocumentList({ $target, initialState }) {
  const $div = document.createElement('div');
  $div.className = 'document-list';
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $div.innerHTML = `
      ${this.state
        .map(
          ({ id, title }) => `
            <div class='document'>
            <button>
                <img class='toggle' />
            </button>
            <span data-id=${id}>${title}</span>
            <button>
                <img class='delete' />
            </button>
            <button>
                <img class='plus' />
            </button>
            </div>
          `
        )
        .join('')}
    `;

    document.querySelectorAll('.toggle').forEach(($img) => {
      console.log($img.getAttribute('class'));
      $img.setAttribute('src', '../../assets/right.png');
    });

    document.querySelectorAll('.delete').forEach(($img) => {
      $img.setAttribute('src', '../../assets/delete.png');
    });

    document.querySelectorAll('.plus').forEach(($img) => {
      $img.setAttribute('src', '../../assets/plus.png');
    });

    $div.querySelectorAll('span').forEach(($span) => {
      $span.addEventListener('click', (e) => {
        const { id } = e.target.dataset;
        push(`/documents/${id}`);
      });
    });
  };

  this.render();
}
