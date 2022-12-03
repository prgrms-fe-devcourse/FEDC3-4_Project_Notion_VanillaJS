import { push } from '../utils/router.js';
import { request } from '../utils/api.js';
import { documentLi } from '../utils/render.js';

export default function DocumentList({ $target, initialState }) {
  const $div = document.createElement('div');
  const $ul = document.createElement('ul');
  $div.className = 'document-list';
  $target.appendChild($div);
  $div.appendChild($ul);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    $ul.innerHTML = `
      ${this.state.map(({ id, title }) => `${documentLi(id, title)}`).join('')}
    `;
  };

  this.render();

  $ul.addEventListener('click', (e) => {
    const $list = e.target.closest('li');
    const $div = e.target.closest('div');

    const { className } = e.target;
    const { id } = $div.dataset;

    const onSet = async () => {
      if (id !== undefined) {
        push(`/documents/${id}`);

        // 현재 선택된 document 리스트 bold 처리
        $ul.querySelectorAll('div').forEach(($div) => {
          $div.classList.remove('bold');
        });

        $div.classList.add('bold');
      }
    };

    const onToggle = async () => {
      const $toggle = $div.querySelector('.toggle');
      $toggle.classList.toggle('toggle-active');

      const getDocuments = await request(`/documents/${id}`);
      const { documents } = getDocuments;

      const $ulChild = document.createElement('ul');
      $ulChild.className = 'document-children';
      $list.appendChild($ulChild);

      // toggle on/off 처리
      if ($toggle.classList.contains('toggle-active')) {
        // 하위 리스트가 있을 때와 없을 때의 처리
        if (documents.length > 0) {
          $ulChild.innerHTML = `
            ${documents
              .map(({ id, title }) => `${documentLi(id, title)}`)
              .join('')}
          `;
        } else {
          $ulChild.innerHTML = `
            <li style='pointer-events: none;'>
              <div class='document'>
                <span class='no-child' style='color: #a7a7a7;'>${`하위 페이지 없음`}</span>
              </div>
            </li>
          `;
        }
      } else {
        $list.querySelectorAll('ul').forEach(($ul) => {
          $ul.remove();
        });
      }
    };

    const onRemove = async () => {
      confirm('삭제하시겠습니까?');

      await request(`/documents/${id}`, {
        method: 'DELETE',
      });

      // 삭제할 document의 id와 현재 url의 id가 같은 경우 루트(/)로 라우팅 처리
      const { pathname } = window.location;
      if (pathname.indexOf('/documents/') === 0) {
        const [, , documentId] = pathname.split('/');
        if (documentId === id) {
          push('/');
        }
      }

      const nextState = await request(`/documents`);
      this.setState(nextState);
    };

    const onAdd = async () => {
      if (id !== undefined) {
        const document = {
          title: '제목 없음',
          parent: id,
        };
        await request(`/documents`, {
          method: 'POST',
          body: JSON.stringify(document),
        });
      }

      onToggle();
    };

    if (className === 'toggle' || className === 'toggle toggle-active') {
      onToggle();
    } else if (className === 'delete') {
      onRemove();
    } else if (className === 'plus add') {
      onAdd();
    } else {
      onSet();
    }
  });
}
