function StorageMethods(storage) {

  this.setItem = (key, value) => {
    try {
      storage.setItem(key, JSON.stringify(value))
    } catch(e) {
      console.error(e)
    }
  }

  this.getItem = (key, defaultValue) => {
    try {
      const storedValue = storage.getItem(key);
  
      return storedValue ? JSON.parse(storedValue) : defaultValue
  
    } catch(e) {
      console.error(e)
      return defaultValue
    }
  }

  this.removeItem = (key) => {
    storage.removeItem(key);
  }  
}

export const session = new StorageMethods(sessionStorage)
export const local = new StorageMethods(localStorage)