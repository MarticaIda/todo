// add date added property?
// make todos sortable by dueDate and priority
// make projects editable and removable

import './style.css'
import { projectList, createTodo } from './createTodo'
import BinIcon from './recycle-bin.png'

const projectElement = document.getElementById('project')
const projectBar = document.querySelector('ul')
const projectHeader = document.querySelector('h1')
const form = document.querySelector('form')
const openBtn = document.querySelector('#btnOpen')
const modal = document.querySelector('#modal')
const closeBtn = document.querySelector('#btnClose')
const addProjectBtn = document.getElementById('addProject')
const nameEl = document.getElementById('task')
const detailsEl = document.getElementById('details')
const dueDateEl = document.getElementById('dueDate')
const priorityEl = document.getElementById('priority')
const viewAllTodosBtn = document.querySelector('#viewAllBtn')
let projectName

// new project input
addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  const project = projectElement.value
  if (project === '') {
    alert('Please enter a project name')
    return
  }
  if (projectList[project]) {
    alert('Project already exists')
  } else {
    projectList[project] = []
  }
  generateProjectBar(projectList)
  projectElement.value = ''
})

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
      alert('Please enter a task name')
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

// side bar and project selection
function generateProjectBar () {
  projectBar.textContent = ''
  for (const project in projectList) {
    const listItem = document.createElement('li')
    listItem.textContent = project
    projectBar.appendChild(listItem)
    listItem.addEventListener('click', () => {
      projectHeader.textContent = project
      projectName = project
      generateTable(projectList[project])
    })
  }
}

const tbody = document.querySelector('tbody')

// rendering todos in one project
export function generateTable (project) {
  tbody.textContent = ''
  for (const todo of project) {
    domBuild(todo)
  }
}

// general table rendering logic
const domBuild = (todo) => {
  const row = document.createElement('tr')

  Object.keys(todo).forEach((entry) => {
    const data = document.createElement('td')
    data.setAttribute('class', entry)
    data.textContent = todo[entry]
    row.appendChild(data)
    const input = document.createElement('input')
    const select = document.createElement('select')
    select.id = 'priority'
    const options = ['yesterday', 'high', 'low', 'no rush']
    for (let i = 0; i < options.length; i++) {
      const option = document.createElement('option')
      option.value = options[i]
      option.text = options[i]
      select.appendChild(option)
    }
    const deleteIcon = new Image()
    deleteIcon.src = BinIcon
    if (data.classList.contains('toDelete')) {
      data.textContent = ''
      data.appendChild(deleteIcon)
    }
    data.addEventListener('click', addInput)
    input.addEventListener('change', saveInput)
    select.addEventListener('change', saveSelect)
    deleteIcon.addEventListener('click', addInput)

    function addInput (event) {
      if (event.target !== this) {
        return
      }
      data.textContent = ''
      if (data.classList.contains('dueDate')) {
        input.setAttribute('type', 'date')
        input.setAttribute('value', '')
        data.appendChild(input)
      } else if (data.classList.contains('priority')) {
        select.setAttribute('value', todo[entry])
        data.appendChild(select)
      } else if (data.classList.contains('toDelete')) {
        todo[entry] = true
        deleteTodo()
      } else {
        input.setAttribute('type', 'text')
        input.setAttribute('value', todo[entry])
        data.appendChild(input)
      }
    }

    function saveInput () {
      todo[entry] = input.value
      data.textContent = todo[entry]
    }
    function saveSelect () {
      todo[entry] = select.value
      data.textContent = todo[entry]
    }
  })
  tbody.appendChild(row)
}

function deleteTodo () {
  for (const project in projectList) {
    const todos = projectList[project]
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i]
      if (todo.toDelete) {
        todos.splice(i, 1)
        i--
      }
    }
    if (projectHeader.textContent === 'All todos') {
      generateTable(getAllTodos())
    } else {
      generateTable(projectList[project])
    }
  }
}
viewAllTodosBtn.addEventListener('click', () => {
  generateTable(getAllTodos())
  projectHeader.textContent = 'All todos'
})

function getAllTodos () {
  const allTodos = Object.values(projectList).flatMap((array) => array)
  return allTodos
}
