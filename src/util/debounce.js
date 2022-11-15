export const debounce = (func, wait) => {
    let timerId = null;
    return (...args) => {
        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(() => {
            func(...args);
        }, wait);
    }
}
