// make todos sortable by dueDate and priority
// expand a single todo to see/edit its details

import './style.css'
import {
  projectList,
  createTodo,
  formatDate,
  completedTodos
} from './createTodo'
import BinImg from './recycle-bin.png'
import EditImg from './edit.png'

export const incompleteTable = document.querySelector('.incomplete')
const completeTable = document.querySelector('.complete')
const form = document.querySelector('form')
const openBtn = document.querySelector('#btnOpen')
const modal = document.querySelector('#modal')
const closeBtn = document.querySelector('#btnClose')
const nameEl = document.getElementById('task')
const detailsEl = document.getElementById('details')
const dueDateEl = document.getElementById('dueDate')
const priorityEl = document.getElementById('priority')
const nav = document.querySelector('nav')
const projectElement = document.getElementById('project')
const projectBar = document.querySelector('ul')
const projectHeader = document.querySelector('h1')
const addProjectBtn = document.getElementById('addProject')
const viewAllTodosBtn = document.querySelector('#viewAllBtn')
export const incompleteTBody = document.getElementById('incompleteTBody')
const completeTBody = document.getElementById('completeTBody')

let projectName

modal.style.display = 'none'

// new todo input
const todoInput = () => {
  openBtn.addEventListener('click', function () {
    modal.style.display = 'block'
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameEl.value
    const details = detailsEl.value
    const dueDate = dueDateEl.value
    const priority = priorityEl.value

    if (name === '') {
      displayErrorMessage('Please enter a task name')
      return
    }
    createTodo(name, details, dueDate, priority, false, projectName)
    form.reset()
    modal.style.display = 'none'
  })

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none'
    form.reset()
  })
}
todoInput()

// new project input
addProjectBtn.addEventListener('click', handleProjectInput)

function handleProjectInput (event) {
  event.preventDefault()
  const project = projectElement.value.trim()
  if (!project) {
    displayErrorMessage('Please enter a project name')
    return
  }
  if (projectList[project]) {
    displayErrorMessage('Project already exists')
    return
  }
  projectList[project] = []
  generateProjectList(projectList)
  projectElement.value = ''
}

// render project list and project selection
function generateProjectList () {
  projectBar.textContent = ''

  for (const project in projectList) {
    const listItem = document.createElement('li')
    listItem.textContent = project
    listItem.addEventListener('click', () => {
      projectHeader.textContent = project
      projectName = project
      generateTable(projectList[project], incompleteTable, incompleteTBody)
    })

    const editIcon = createIcon(EditImg)
    editIcon.addEventListener('click', () =>
      handleEditProject(project, listItem)
    )

    const deleteIcon = createIcon(BinImg)
    deleteIcon.addEventListener('click', () => handleDeleteProject(project))

    const projectContainer = document.createElement('div')
    projectContainer.setAttribute('class', 'projectContainer')
    projectContainer.appendChild(listItem)
    projectContainer.appendChild(editIcon)
    projectContainer.appendChild(deleteIcon)
    projectBar.appendChild(projectContainer)
  }
}

function handleEditProject (project, listItem) {
  const input = document.createElement('input')
  input.setAttribute('type', 'text')
  input.setAttribute('value', project)
  listItem.textContent = ''
  listItem.appendChild(input)

  input.addEventListener('change', () => {
    const newProjectName = input.value.trim()
    if (!newProjectName) {
      displayErrorMessage('Please enter a project name')
      return
    }
    if (projectList[newProjectName]) {
      displayErrorMessage('Project already exists')
      input.focus()
      return
    }
    projectList[newProjectName] = projectList[project]
    delete projectList[project]
    generateProjectList()
    generateTable(projectList[newProjectName], incompleteTable, incompleteTBody)
  })
}

function handleDeleteProject (project) {
  const confirmed = confirm('Are you sure you want to delete this project?')
  if (confirmed) {
    delete projectList[project]
    generateProjectList()
  }
}

function createIcon (src) {
  const icon = new Image()
  icon.src = src
  return icon
}

function displayErrorMessage (message) {
  const error = document.createElement('div')
  error.textContent = message
  error.classList.add('error')
  nav.appendChild(error)

  setTimeout(() => {
    error.remove()
  }, 3000)
}

// const tbody = document.querySelector('tbody')

// rendering todos in a table
export function generateTable (project, table, tbody) {
  table.style.display = 'block'
  tbody.textContent = ''
  for (const todo of project) {
    if (project === completedTodos) {
      displayCompletedRow(todo, tbody)
    } else {
      displayRegularRow(todo, tbody)
    }
  }
}

// render completed table
function displayCompletedRow (todo, tbody) {
  const row = document.createElement('tr')
  Object.keys(todo).forEach((entry) => {
    const data = document.createElement('td')
    data.setAttribute('class', entry)
    data.textContent = todo[entry]
    row.appendChild(data)
    if (data.classList.contains('toDelete')) {
      addDeleteInput(data, todo, entry, completedTodos)
    }
  })
  tbody.appendChild(row)
}

// render incomplete table
function displayRegularRow (todo, tbody) {
  const row = createRow(todo)
  const completeTodo = row.insertCell(-1)
  const input = document.createElement('input')
  input.setAttribute('class', 'completeTodo')
  input.setAttribute('type', 'checkbox')
  completeTodo.appendChild(input)
  input.addEventListener('change', () => {
    if (input.checked) {
      completedTodos.push(todo)
      generateTable(completedTodos, completeTable, completeTBody)
      todo.toDelete = true
      deleteTodo(projectList)
    }
  })
  tbody.appendChild(row)
}

function createRow (todo) {
  const row = document.createElement('tr')

  Object.keys(todo).forEach((entry) => {
    const data = document.createElement('td')
    data.setAttribute('class', entry)
    data.textContent = todo[entry]
    row.appendChild(data)

    if (data.classList.contains('toDelete')) {
      addDeleteInput(data, todo, entry, projectList)
    } else if (data.classList.contains('dueDate')) {
      addInput(data, todo, entry, 'date')
    } else if (data.classList.contains('priority')) {
      const select = createSelect(todo[entry])
      addInput(data, todo, entry, select)
    } else {
      addInput(data, todo, entry, 'text')
    }
  })
  return row
}

function addDeleteInput (data, todo, entry, projects) {
  const deleteIcon = new Image()
  deleteIcon.src = BinImg
  data.textContent = ''
  data.appendChild(deleteIcon)
  deleteIcon.addEventListener('click', () => {
    console.log(projects)
    todo[entry] = true
    deleteTodo(projects)
  })
}

function addInput (data, todo, entry, type) {
  const input = document.createElement('input')
  input.setAttribute('type', type)
  input.setAttribute('value', todo[entry])
  data.addEventListener('click', () => {
    data.textContent = ''
    data.appendChild(input)
    input.focus()
  })
  input.addEventListener('change', () => {
    if (type === 'date') {
      const date = formatDate(input.value)
      todo[entry] = date
      data.textContent = todo[entry]
    } else {
      todo[entry] = input.value
      data.textContent = todo[entry]
    }
  })
}

function createSelect (selectedValue) {
  const select = document.createElement('select')
  select.id = 'priority'
  const options = ['yesterday', 'high', 'low', 'no rush']
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement('option')
    option.value = options[i]
    option.text = options[i]
    if (selectedValue === options[i]) {
      option.setAttribute('selected', 'selected')
    }
    select.appendChild(option)
  }
  return select
}

// delete todo and render table
function deleteTodo (projects) {
  if (projects === completedTodos) {
    console.log(projects)
    for (let i = 0; i < projects.length; i++) {
      const todo = projects[i]
      if (todo.toDelete) {
        projects.splice(i, 1)
        i--
      }
    }
    generateTable(completedTodos, completeTable, completeTBody)
  } else {
    console.log(projects)
    for (const project in projects) {
      const todos = projects[project]
      for (let i = 0; i < todos.length; i++) {
        const todo = todos[i]
        if (todo.toDelete) {
          todos.splice(i, 1)
          i--
        }
      }
      if (projectHeader.textContent === 'All todos') {
        generateTable(getAllTodos(), incompleteTable, incompleteTBody)
      } else {
        generateTable(projects[project], incompleteTable, incompleteTBody)
      }
    }
  }
}

// view all todos from all projects
viewAllTodosBtn.addEventListener('click', () => {
  generateTable(getAllTodos(), incompleteTable, incompleteTBody)
  projectHeader.textContent = 'All todos'
})

function getAllTodos () {
  const allTodos = Object.values(projectList).flatMap((array) => array)
  return allTodos
}
