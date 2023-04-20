// Description: Creates a new todo object and adds it to the projectList

import { generateTable, incompleteTBody, incompleteTable } from './index.js'
import { saveToLocalStorage, getFromLocalStorage } from './localStorage.js'

import { format, utcToZonedTime } from 'date-fns-tz'

const Todo = (name, details, dueDate, priority, toDelete = false) => {
  return {
    name,
    details,
    dueDate,
    priority,
    toDelete
  }
}

export const { projectList, completedTodos } = getFromLocalStorage()

export const formatDate = function (date) {
  if (!date) return ''
  else {
    const dateInput = new Date(date)
    const utcDate = utcToZonedTime(dateInput)
    const formattedDate = format(utcDate, 'MM/dd/yyyy')
    return formattedDate
  }
}
export function createTodo (
  name,
  details,
  dueDate,
  priority,
  toDelete = false,
  project = 'My Todos'
) {
  const formattedDate = formatDate(dueDate)
  const todo = Todo(name, details, formattedDate, priority, toDelete)
  if (projectList[project]) {
    projectList[project].push(todo)
  } else {
    projectList[project] = [todo]
  }
  saveToLocalStorage(projectList, completedTodos)
  generateTable(projectList[project], incompleteTable, incompleteTBody)
}
