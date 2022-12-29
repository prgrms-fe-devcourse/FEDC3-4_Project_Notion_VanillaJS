import { BASE_INIT_USERNAME } from '../../Constant/api.js';

export const documentUser = (userId) => {
  return `
  <div>
    <div class="flex items-center justify-between p-3 hover:bg-stone-200" data-event="userNameButton">
      <div class="mr-2 flex items-center justify-between">
        <span
          class="mr-1 inline-flex h-5 w-5 items-center justify-center rounded bg-gray-600 text-sm text-white"
          >U</span
        >
        <span class="font-semibold" data-event="userNameButton">${
          userId ? userId : BASE_INIT_USERNAME
        }</span>
      </div>
    </div>
    <div>
      <ol class="my-1">
        <li class="hover:bg-stone-200 px-3 py-1 text-left">
          <span>Quick Find (미구현)</span>
        </li>
        <li class="hover:bg-stone-200 px-3 py-1 text-left">
          <span>All Updates (미구현)</span>
        </li>
        <li class="hover:bg-stone-200 px-3 py-1 text-left">
          <span>Settings &amp; Members (미구현)</span>
        </li>
      </ol>
    </div>
  </div>`;
};
