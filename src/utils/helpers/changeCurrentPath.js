// ' > '로 split 하면 title을 완전히 지웠을 떄 마지막 요소가 사라져서 이전의 것이 변경된다.
// 따라서 ' >' 으로 뒤에 ' '과 같이 공백을 한 개 남겨놔야 한다.
const changeCurrentPath = changedTitle => {
  const queryString = new URLSearchParams(window.location.search);
  const currentPath = queryString.get('currentPath').split(' >');
  currentPath[currentPath.length - 1] = changedTitle;

  return `${currentPath.join(' > ')}`;
};

export default changeCurrentPath;
