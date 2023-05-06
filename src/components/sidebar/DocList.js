import { validation } from '../../validation.js';
import { getItem, setItem } from '../../storage.js';

export default function DocList({
  $target,
  initialState,
  onClick,
  onNewSubDoc,
  onDelete,
}) {
  validation(new.target, 'DocList');

  const $docList = document.createElement('nav');
  $docList.className = 'docList';
  $target.appendChild($docList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const renderDocList = (docs) => {
    const openedItem = getItem('opened', []);
    return docs
      .map(
        ({ id, title, documents }) => `
        <li id=${id} data-id=${id} class="docItem">
          <p class="forHover">
            <button class="toggleFold btn">${
              openedItem.includes(id.toString()) ? '▼' : '►'
            }</button>
            <span class="docTitle">${title}</span>
            <span class="controlBtns">
              <button class="newSubDoc btn">➕</button> 
              <button class="delete btn">X</button>
            </span>
            ${
              openedItem.includes(id.toString())
                ? documents.length > 0
                  ? `<ul class='child--show'>${renderDocList(documents)}</ul>`
                  : `<ul class='child--show'><li class="isEnd">하위 페이지가 없습니다.</li></ul>`
                : documents.length > 0
                ? `<ul class='child'>${renderDocList(documents)}</ul>`
                : `<ul class='child'><li class="isEnd">하위 페이지가 없습니다.</li></ul>`
            }
          </p>
        </li>`
      )
      .join('');
  };

  this.render = () => {
    $docList.innerHTML = `
        <ul>
          ${renderDocList(this.state)}
        </ul>
      `;
  };

  this.render();

  $docList.addEventListener('click', (e) => {
    const $li = e.target.closest('li');

    if (!$li) return;
    const { id } = $li.dataset;
    const { classList } = e.target;

    if (classList.contains('toggleFold')) {
      const $childUl = $li.getElementsByTagName('ul');
      if ($childUl) {
        const toggleDisplay = $childUl[0].classList.contains('child');
        const prev = getItem('opened', []);
        if (toggleDisplay) {
          setItem('opened', [...prev, id]);
        } else {
          setItem(
            'opened',
            prev.filter((el) => el !== id)
          );
        }
        $childUl[0].className = toggleDisplay ? 'child--show' : 'child';
        $li.querySelector('.toggleFold').innerText = toggleDisplay ? '▼' : '►';
      }
      return;
    }
    if (classList.contains('newSubDoc')) {
      const $childUl = $li.getElementsByTagName('ul');
      const $isEnd = $childUl[0].querySelector('.isEnd');
      const $newSubDoc = document.createElement('li');

      const prev = getItem('opened', []);
      if (!prev.includes(id)) {
        setItem('opened', [...prev, id]);
      }

      if ($childUl.length > 0) {
        $childUl[0].className = 'child--show';
        $li.querySelector('.toggleFold').innerText = '▼';
      }

      if ($isEnd) {
        $isEnd.remove();
      }
      $newSubDoc.id = 'newSubDoc';
      $newSubDoc.className = 'docItem';

      $childUl[0].appendChild($newSubDoc);
      $newSubDoc.innerHTML = `
        <p class="forHover">
          <button class="toggleFold btn">►</button>
          <span class="docTitle">제목 없음</span>
          <span class="controlBtns">
            <button class="newSubDoc btn">➕</button> 
            <button class="delete btn">X</button>
          </span>
          <ul class='child'><li class="isEnd">하위 페이지가 없습니다.</li></ul>
        </p>
      `;
      onNewSubDoc(id);
      return;
    }
    if (classList.contains('delete')) {
      if (confirm('이 문서를 삭제하시겠습니까?')) {
        $li.remove();
        onDelete(id);
      }
      return;
    }
    onClick(id);
  });
}
