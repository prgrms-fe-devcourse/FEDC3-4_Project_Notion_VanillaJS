const getWaysToLeaf = (originArray, _documents, currentArray) => {
  if (_documents.length === 0) {
    originArray.push(currentArray);
    return originArray;
  }

  _documents.forEach((document) => {
    const { documents, id } = document;
    getWaysToLeaf(originArray, documents, [...currentArray, id]);
  });

  return currentArray;
};

export const getWaysFromRootToLeaf = (_documents) => {
  const originArray = [];

  _documents.forEach(({ documents, id }) => {
    getWaysToLeaf(originArray, documents, [id]);
  });

  return originArray;
};

export const getTitlesThroughRoot = (from, startId) => {
  const start = from.querySelector(`#id-${startId}`);

  const titles = [start.dataset.title];
  let $parent = start.parentNode;

  while (!$parent.parentNode.parentNode.classList.contains('documents-wrapper')) {
    $parent = $parent.parentNode.previousElementSibling;
    titles.push($parent.querySelector('.title-wrapper').dataset.title);
  }
  return titles.reverse();
};
