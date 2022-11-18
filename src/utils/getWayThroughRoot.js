export const getIdsThroughRoot = (from, id) => {
  const ids = [id];
  let $parent = from.querySelector(`#id-${id}`).parentNode;

  while (!$parent.parentNode.parentNode.classList.contains('documents-wrapper')) {
    $parent = $parent.parentNode.previousElementSibling;
    ids.push($parent.getAttribute('key'));
  }
  return ids;
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
