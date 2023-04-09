import { generateProject, getProjectName } from './index.js'

const Todo = (name, details, dueDate, priority, toDelete = false) => {
  return {
    name,
    details,
    dueDate,
    priority,
    toDelete
  }
}

const todoList = []
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
  todoList.push(todo)
  project = getProjectName()
  if (projectList[project]) {
    projectList[project].push(todo)
  } else {
    projectList[project] = [todo]
  }
  generateProject(projectList[project])
}

export const getAllTodos = () => todoList
export const getProjectTodos = (project) => projectList[project]
