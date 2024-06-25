class LocalStorageService {
  getFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  isLoggedIn() {
    return this.getFromLocalStorage(key) !== null;
  }
}

export default LocalStorageService;
