export default function SideBarItem(item) {
  return `
    <li data-id="${item.id}">
      <span class="item-load">
        ${item.title}
      </span>
      <button class="item-remove">-</button>
      <button class="item-add">+</button>
      <ul class="sidebar-list-ul">
        ${item.documents.length > 0 ? item.documents.map((item) => SideBarItem(item)).join("") : ""}
      </ul>
    </li>
  `;
}
