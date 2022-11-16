export const documentLi = (id, title) => {
  const $document = `
    <li>
      <div data-id=${id} class='document'>
        <button>
          <img class='toggle' />
        </button>
        <span>${title}</span>
        <button>
          <img class='delete' />
        </button>
        <button>
          <img class='plus add' />
        </button>
      </div>
    </li>`;

  return $document;
};
