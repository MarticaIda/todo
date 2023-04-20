// Description: This file contains functions to save and load data from local storage

// Save data to local storage whenever projectList is updated
export function saveToLocalStorage (projectList, completedTodos) {
  const data = { projectList, completedTodos }
  localStorage.setItem('data', JSON.stringify(data))
}
// Load data from local storage on page load
export function loadFromLocalStorage () {
  const data = JSON.parse(localStorage.getItem('data'))
  return data || { projectList: {}, completedTodos: [] }
}

export function getFromLocalStorage () {
  const { projectList, completedTodos } = loadFromLocalStorage()
  return { projectList, completedTodos }
}

export function removeAllTodos () {
  localStorage.clear()
}
