// Description: Creates a new todo object and adds it to the projectList

import { generateTable, displayErrorMessage } from './index.js'
import { saveToLocalStorage, getFromLocalStorage } from './localStorage.js'

import { format, utcToZonedTime } from 'date-fns-tz'

const Todo = (
  name,
  details,
  dueDate,
  priority,
  toDelete,
  isCompleted,
  createdOn = new Date(),
  project
) => {
  return {
    name,
    details,
    dueDate,
    priority,
    toDelete,
    isCompleted,
    createdOn,
    project
  }
}

export const formatDate = function (date) {
  if (!date) {
    return ''
  }
  const formattedDate = format(utcToZonedTime(new Date(date)), 'MM-dd-yyyy')
  return formattedDate
}

export const projectList = getFromLocalStorage()

export function createTodo (
  name,
  details,
  dueDate,
  priority,
  toDelete,
  isCompleted,
  createdOn,
  project = 'My Todos'
) {
  const createdOnDate = format(new Date(createdOn), 'MM-dd-yyyy HH:mm:ss O')
  if (projectList[project] !== projectList.Completed) {
    const todo = Todo(
      name,
      details,
      formatDate(dueDate),
      priority,
      toDelete,
      isCompleted,
      createdOnDate,
      project
    )
    if (projectList[project]) {
      projectList[project].push(todo)
    } else {
      projectList[project] = [todo]
    }
  } else {
    displayErrorMessage(
      'Cannot add todo to Completed. Please select a different project.'
    )
    return
  }
  saveToLocalStorage(projectList)
  generateTable(projectList[project])
}
