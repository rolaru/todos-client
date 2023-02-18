export const getFromStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.error('Couldn\'t retrieve local storage data: ', error.message);
    return null;
  }
};

export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to local storage: ', error.message);
  }
};

export const deleteFromStorage = (key) => localStorage.removeItem(key);