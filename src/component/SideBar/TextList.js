// state => DocumentList가 올 것
import { $, $all, $createElement } from '../../lib/utils.js';
import DocumentList from '../DocumentList.js';

// 폴더 add 버튼, 삭제 버튼, 리스트 아이템 클릭
export default function TextList({
  $target,
  initialState,
  removeList,
  addNewList,
  onSelect,
}) {
  const $list = $createElement('div');
  $list.className = 'list';
  $target.appendChild($list);

  this.state = initialState ?? [];
  this.removeList = removeList;
  this.addNewList = addNewList;
  this.onSelect = onSelect;

  this.setState = (nextState) => {
    if (nextState && Array.isArray(nextState)) {
      this.state = nextState;
      this.render();
    }
  };

  this.render = () => {
    new DocumentList({
      $target: $list,
      initialState: this.state,
    });
  };

  this.render();
}
