export const buildImageUrl = (base: string, hash: string, image: string) => {
  return base + '/data-saver/' + hash + '/' + image;
};

export const getRandomItem = <T>(arr: T[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return {
    item: arr[index],
    index: !isNaN(index) ? index : 0,
  }
}

export const getStorageArray = (key: string) => {
  const data = window.localStorage.getItem(key) ?? '[]';
  return JSON.parse(data)
}

export const setStorageArray = (key: string, value: string[]) => {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export const getStorageValue = (key: string) => {
  return window.localStorage.getItem(key) ?? null;
}

export const setStorageValue = (key:string, value: string) => {
  window.localStorage.setItem(key, value);
}