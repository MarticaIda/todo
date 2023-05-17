// Description: This file contains functions to save and load data from local storage

// Save data to local storage whenever projectList is updated
export function saveToLocalStorage (projectList) {
  localStorage.setItem('projectList', JSON.stringify(projectList))
}
// Load data from local storage on page load
export function loadFromLocalStorage () {
  const projectList = JSON.parse(localStorage.getItem('projectList'))
  return projectList || {}
}

export function getFromLocalStorage () {
  const projectList = loadFromLocalStorage()
  return projectList
}

export function removeAllTodos () {
  localStorage.clear()
}
