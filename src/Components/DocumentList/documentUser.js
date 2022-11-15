import { BASE_USERNAME } from '../../constants.js';

export const documentUser = () => {
  const { pathname } = location;
  const [, userId] = pathname.split('/');

  return `
  <div>
    <div class="flex items-center justify-between p-3 hover:bg-gray-400" id="userNameButton">
      <div class="mr-2 flex items-center justify-between">
        <span
          class="mr-1 inline-flex h-5 w-5 items-center justify-center rounded bg-gray-600 text-sm text-white"
          >U</span
        >
        <span class="font-semibold">${userId ? userId : BASE_USERNAME}</span>
      </div>
    </div>
    <div>
      <ol class="my-1">
        <li class="hover:bg-gray-400 px-3 py-1 text-left">
          <span>Quick Find</span>
        </li>
        <li class="hover:bg-gray-400 px-3 py-1 text-left">
          <span>All Updates</span>
        </li>
        <li class="hover:bg-gray-400 px-3 py-1 text-left">
          <span>Settings &amp; Members</span>
        </li>
      </ol>
    </div>
  </div>`;
};
