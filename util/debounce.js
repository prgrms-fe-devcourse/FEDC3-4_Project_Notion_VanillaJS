export default function debounce(func, time = 500) {
  let timeoutId;
  return (...args) => {
    console.log(...args, func);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), time)
  }
}
