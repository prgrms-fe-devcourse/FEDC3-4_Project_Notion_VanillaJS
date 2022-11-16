export const documentItem = ({ id, title }) => {
  return `
          <li data-id="${id}" class="py-1 pl-2">
            <div data-event="setDocumentButton" class="grid grid-flow-col justify-between hover:bg-stone-200 active:bg-stone-300 active:ring active:ring-stone-300 rounded-md group">
              <div class="grid grid-flow-col">
                <svg viewBox="0 0 12 12"  class="mr-1" data-event="showChildDocumentButton" style="width: 18px; height: 18px; display: block; fill: rgba(55, 53, 47, 0.35); flex-shrink: 0; backface-visibility: hidden; transform: rotate(-90deg);"><path d="M6.02734 8.80274C6.27148 8.80274 6.47168 8.71484 6.66211 8.51465L10.2803 4.82324C10.4268 4.67676 10.5 4.49609 10.5 4.28125C10.5 3.85156 10.1484 3.5 9.72363 3.5C9.50879 3.5 9.30859 3.58789 9.15234 3.74902L6.03223 6.9668L2.90722 3.74902C2.74609 3.58789 2.55078 3.5 2.33105 3.5C1.90137 3.5 1.55469 3.85156 1.55469 4.28125C1.55469 4.49609 1.62793 4.67676 1.77441 4.82324L5.39258 8.51465C5.58789 8.71973 5.78808 8.80274 6.02734 8.80274Z"></path></svg>
                <span class="truncate" data-event="setDocumentButton">${title}</span>
              </div>
              <div>
                <button data-event="postDocumentButton" class=" text-stone-700 right-0 ml-2 invisible group-hover:visible">➕</button>
                <button data-event="deleteDocumentButton" class="right-0 invisible group-hover:visible">🗑</button>
              </div>
            </div>
          </li>`;
};
