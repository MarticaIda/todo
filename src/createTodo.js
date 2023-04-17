import { generateTable, incompleteTBody, incompleteTable } from './index.js'
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

export const projectList = {}
export const completedTodos = []

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
  generateTable(projectList[project], incompleteTable, incompleteTBody)
}
