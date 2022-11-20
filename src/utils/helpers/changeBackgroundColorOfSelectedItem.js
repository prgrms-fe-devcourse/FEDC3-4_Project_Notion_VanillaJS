const changeBackgroundColor = (className, targetId) => {
  const $previous = document.querySelector(`.${className}`);
  $previous?.classList.remove(className);
  
  
  const $next = document.querySelector(`[data-id='${targetId}']`);
  
  $next ? $next.classList.add(className) : document.querySelector('header').classList.add(className);
}

export default changeBackgroundColor;