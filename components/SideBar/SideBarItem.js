export default function SideBarItem(item) {
  return `
    <li data-id="${item.id}">
      <span class="item-load">
        ${item.title}
      </span>
      <button class="item-remove">-</button>
      <button class="item-add">+</button>
    </li>
  `;
}
