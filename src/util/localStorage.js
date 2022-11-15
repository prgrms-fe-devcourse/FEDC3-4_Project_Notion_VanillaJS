const storage = window.localStorage;

export const getDocument = (key) => {
    try {
        const storedValue = storage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : { title: '', content: '' };
    } catch (e) {
        alert(e.message);
        console.error(e.message);
    }
}

export const setDocument = (key, value) => {
    storage.setItem(key, JSON.stringify(value));
}

export const removeDocument = (key) => {
    storage.removeItem(key);
}
