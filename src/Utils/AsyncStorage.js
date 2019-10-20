export const AsyncSessionStorage = {
  setItem: function(key, value) {
    return Promise.resolve().then(function() {
      sessionStorage.setItem(key, value);
    });
  },
  getItem: function(key) {
    return Promise.resolve().then(function() {
      return sessionStorage.getItem(key);
    });
  }
};

export const AsyncLocalStorage = {
  setItem: function(key, value) {
    return Promise.resolve().then(function() {
      localStorage.setItem(key, value);
    });
  },
  getItem: function(key) {
    return Promise.resolve().then(function() {
      return localStorage.getItem(key);
    });
  }
};
