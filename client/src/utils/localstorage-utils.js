
export const setItem = (key, item) => {
  localStorage.setItem(key, item)
}

export const getItem = (key) => {
  return localStorage.getItem(key)
}