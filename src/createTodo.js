import { generateTable } from './index.js'

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

export function createTodo (
  name,
  details,
  dueDate,
  priority,
  toDelete = false,
  project = 'My Todos'
) {
  const todo = Todo(name, details, dueDate, priority, toDelete)
  if (projectList[project]) {
    projectList[project].push(todo)
  } else {
    projectList[project] = [todo]
  }
  generateTable(projectList[project])
}
