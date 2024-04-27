export class LocalStorage {
  static get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static update() {}
  static deleteKey(key) {
    localStorage.removeItem(key);
  }
  static clear() {
    localStorage.clear();
  }
}
