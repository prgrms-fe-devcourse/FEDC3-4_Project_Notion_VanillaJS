const headings = ['h1', 'h2', 'h3'];

const toggleClass = ($container, tag) => {
  switch (tag) {
    case 'h1':
    case 'h2':
    case 'h3':
      const otherHeadings = headings.filter((heading) => heading !== tag);
      $container.classList.remove(...otherHeadings);
      $container.classList.contains(tag)
        ? $container.classList.remove(tag)
        : $container.classList.add(tag);
      break;
    case 'strong':
    case 'strike':
    case 'italic':
    case 'underline':
      $container.classList.contains(tag)
        ? $container.classList.remove(tag)
        : $container.classList.add(tag);
      break;
    default:
      break;
  }
};

export const makeRichText = ($container) => {
  let currentLine = $container.innerHTML;

  if (currentLine.indexOf('# ') === 0) {
    currentLine = currentLine.substr(2);
    toggleClass($container, 'h1');
  } else if (currentLine.indexOf('## ') === 0) {
    currentLine = currentLine.substr(3);
    toggleClass($container, 'h2');
  } else if (currentLine.indexOf('### ') === 0) {
    currentLine = currentLine.substr(4);
    toggleClass($container, 'h3');
  } else if (currentLine.indexOf('* ') === 0) {
    currentLine = currentLine.substr(2);
    toggleClass($container, 'strong');
  } else if (currentLine.indexOf('- ') === 0) {
    currentLine = currentLine.substr(3);
    toggleClass($container, 'strike');
  } else if (currentLine.indexOf('/ ') === 0) {
    currentLine = currentLine.substr(2);
    toggleClass($container, 'italic');
  } else if (currentLine.indexOf('_ ') === 0) {
    currentLine = currentLine.substr(2);
    toggleClass($container, 'underline');
  }

  return currentLine === '' ? '<br>' : currentLine;
};
