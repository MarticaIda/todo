// Description: This file is the entry point for the application. It contains the main logic for the application.

import './style.css'
import { projectList, createTodo, formatDate } from './createTodo'
import { saveToLocalStorage, removeAllTodos } from './localStorage'
// import { format, utcToZonedTime } from 'date-fns-tz'
import BinImg from './recycle-bin.png'
import EditImg from './edit.png'

const table = document.querySelector('.todoTable')
const form = document.querySelector('form')
const openBtn = document.querySelector('#btnOpen')
const inputModal = document.querySelector('#inputModal')
const popupModal = document.querySelector('#popupModal')
const helpModal = document.querySelector('#helpModal')
const popupContainer = document.querySelector('#popupContainer')
const closeModalBtn = document.querySelector('#btnCloseModal')
const closePopupBtn = document.querySelector('#btnClosePopup')
const openHelpBtn = document.querySelector('#btnOpenHelp')
const closeHelpBtn = document.querySelector('#btnCloseHelp')
const nameEl = document.getElementById('input-task')
const detailsEl = document.getElementById('input-details')
const dueDateEl = document.getElementById('input-dueDate')
const priorityEl = document.getElementById('input-priority')
const projectElement = document.getElementById('project-input')
const projectBar = document.querySelector('ul')
const projectHeader = document.querySelector('.projHead')
const addProjectBtn = document.getElementById('addProject')
const viewAllTodosBtn = document.querySelector('#viewAllBtn')
const tBody = document.getElementById('tBody')
const clearAllBtn = document.querySelector('#clearAllBtn')
const prioritySorter = document.getElementById('prioritySort')
const dueDateSorter = document.getElementById('dueDateSort')
const dateCreatedSorter = document.getElementById('dateCreatedSort')
const completedSorter = document.getElementById('completedSort')
let projectName
const dispTodoProject = document.querySelector('#todoProject')
const dispTodoName = document.querySelector('#todoName')
const dispTodoDetails = document.querySelector('#todoDetails')
const dispTodoDueDate = document.querySelector('#todoDueDate')
const dispTodoPriority = document.querySelector('#todoPriority')
const dispTodoCompleted = document.querySelector('#todoCompleted')
const dispTodoDelete = document.querySelector('#todoDelete')
const dispTodoCreatedOn = document.querySelector('#todoCreatedOn')
const error = document.querySelector('.error')
let orderP = true
let orderDD = true
let orderDC = true
let orderC = true

openHelpBtn.addEventListener('click', function () {
  helpModal.style.display = 'block'
})
closeHelpBtn.addEventListener('click', function () {
  helpModal.style.display = 'none'
})
window.addEventListener('click', function (event) {
  if (event.target === helpModal) {
    helpModal.style.display = 'none'
  }
})

window.addEventListener('load', () => {
  if (!localStorage.getItem('projectList')) {
    table.style.display = 'none'
    generateProjectList(projectList)
  } else {
    projectHeader.textContent = 'All Todos'
    generateAll()
    generateProjectList(projectList)
  }
})

// new todo input
const todoInput = () => {
  openBtn.addEventListener('click', function () {
    inputModal.style.display = 'block'
    nameEl.focus()
  })
  window.addEventListener('click', function (event) {
    if (event.target === inputModal) {
      inputModal.style.display = 'none'
    }
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = nameEl.value
    const details = detailsEl.value
    const dueDate = dueDateEl.value
    const priority = priorityEl.value

    createTodo(
      name,
      details,
      dueDate,
      priority,
      false,
      false,
      new Date(),
      projectName
    )
    form.reset()
    inputModal.style.display = 'none'
  })

  closeModalBtn.addEventListener('click', function () {
    inputModal.style.display = 'none'
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
  saveToLocalStorage(projectList)
  generateProjectList()
  projectElement.value = ''
}

// render project list and project selection
function generateProjectList () {
  projectBar.textContent = ''

  // Check if there are any projects in the projectList object
  if (Object.keys(projectList).length === 0) {
    // If there are no projects, create a default project called "My Todos"
    projectList['My Todos'] = []
    // so that project name is dispalyed as "Completed" and not "completed"
    // eslint-disable-next-line dot-notation
    projectList['Completed'] = []
  }

  for (const project in projectList) {
    const listItem = document.createElement('li')
    const projectContainer = document.createElement('div')
    projectContainer.setAttribute(
      'class',
      'projectContainer projectItem pointer'
    )

    listItem.textContent = project
    listItem.addEventListener('click', (e) => {
      e.preventDefault()
      projectHeader.textContent = project
      projectName = project
      generateTable(projectList[project])
    })
    projectContainer.appendChild(listItem)

    if (project !== 'Completed' && project !== 'My Todos') {
      projectContainer.appendChild(
        createIcon(
          EditImg,
          () => handleEditProject(project, listItem, projectContainer),
          'Edit'
        )
      )
      projectContainer.appendChild(
        createIcon(BinImg, () => handleDeleteProject(project), 'Delete')
      )
    }
    projectBar.appendChild(projectContainer)
  }
}

function handleEditProject (project, listItem, projectContainer) {
  const originalValue = project
  let input = projectContainer.querySelector('input[type="text"]')
  const cancelButton = createCancelButton()
  const saveButton = createSaveButton()
  if (!input) {
    input = createInput(project, 'text')
    listItem.textContent = ''
    listItem.before(input)
    listItem.before(saveButton)
    listItem.before(cancelButton)
  }

  saveButton.addEventListener('click', () => {
    inputEditHandler()
  })
  cancelButton.addEventListener('click', () => {
    projectList[originalValue] = projectList[project]
    listItem.textContent = originalValue
    saveToLocalStorage(projectList)
    generateProjectList()
  })

  function inputEditHandler () {
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

    for (const todo of projectList[project]) {
      todo.project = newProjectName
    }
    projectList[newProjectName] = projectList[project]
    delete projectList[project]

    saveToLocalStorage(projectList)
    generateProjectList()
    generateTable(projectList[newProjectName])
  }
}
function createInput (value, type) {
  const input = document.createElement('input')
  input.type = type
  input.value = value
  return input
}

function createSaveButton () {
  const saveButton = document.createElement('button')
  saveButton.textContent = 'Save'
  return saveButton
}

function createCancelButton () {
  const cancelButton = document.createElement('button')
  cancelButton.textContent = 'Cancel'
  return cancelButton
}

function handleDeleteProject (project) {
  const confirmed = confirm('Are you sure you want to delete this project?')
  if (confirmed) {
    delete projectList[project]
    saveToLocalStorage(projectList)
    generateProjectList()
    generateAll()
  }
}

function createIcon (src, onClick, text) {
  const icon = new Image()
  icon.src = src
  icon.setAttribute('class', 'edit')
  icon.setAttribute('title', text)
  icon.addEventListener('click', onClick)
  return icon
}

export function displayErrorMessage (message) {
  error.style.display = 'block'
  error.textContent = message
  setTimeout(() => {
    error.remove()
  }, 6000)
}

// rendering todos in a table
export function generateTable (project) {
  table.style.display = 'block'
  tBody.textContent = ''
  for (const todo of project) {
    displayRow(todo, project)
  }
}
function displayRow (todo, project) {
  const row = createRow(todo, project)
  tBody.appendChild(row)
  row.addEventListener('click', (event) => {
    const completedInput = document.querySelector('.completedInput')
    if (event.target.className === 'completedInput') {
      popupModal.style.display = 'none'
      markAsCompleted(todo, completedInput)
    } else {
      renderPopup(todo, project)
    }
  })
}
function createRow (todo, project) {
  const row = document.createElement('tr')
  row.setAttribute('class', 'pointer')
  const nameCell = createTableCell(todo.name, 'name')
  const dueDateCell = createTableCell(todo.dueDate, 'dueDate')
  const priorityCell = createTableCell(todo.priority, 'priority')
  if (todo.priority === 'Yesterday') {
    priorityCell.style.color = 'red'
  } else if (todo.priority === 'High') {
    priorityCell.style.color = 'orange'
  } else if (todo.priority === 'Low') {
    priorityCell.style.color = '#2196F3'
  } else {
    priorityCell.style.color = 'green'
  }
  const completedCell = createTableCell('', 'isCompleted')
  completedCell.textContent = ''
  const completedInput = createCompletedInput(todo, project)
  completedInput.checked = todo.isCompleted
  markAsCompleted(todo, completedInput)
  row.appendChild(nameCell)
  row.appendChild(dueDateCell)
  row.appendChild(priorityCell)
  row.appendChild(completedCell)
  completedCell.appendChild(completedInput)

  return row
}

function createTableCell (text, className) {
  const cell = document.createElement('td')
  cell.textContent = text
  cell.setAttribute('class', className)
  return cell
}

function createCompletedInput (todo) {
  const input = document.createElement('input')
  input.setAttribute('type', 'checkbox')
  input.setAttribute('class', 'completedInput')
  input.checked = todo.isCompleted
  return input
}

function markAsCompleted (todo, input) {
  input.addEventListener('change', (event) => {
    event.stopPropagation()
    todo.isCompleted = input.checked
    const incomplete = projectList[todo.project]
    const indexP = projectList[todo.project].indexOf(todo)
    // eslint-disable-next-line dot-notation
    const indexC = projectList['Completed'].indexOf(todo)

    if (indexC === -1 && todo.isCompleted) {
      // eslint-disable-next-line dot-notation
      addToProject(todo, projectList['Completed'])
      removeFromProject(todo, incomplete)
    } else if (indexP === -1 && !todo.isCompleted) {
      addToProject(todo, incomplete)
      // eslint-disable-next-line dot-notation
      removeFromProject(todo, projectList['Completed'])
    }
    saveToLocalStorage(projectList)
    if (projectHeader.textContent === 'Completed') {
      // eslint-disable-next-line dot-notation
      generateTable(projectList['Completed'])
    } else if (projectHeader.textContent === 'All Todos') {
      generateAll()
    } else {
      generateTable(incomplete)
      projectHeader.textContent = todo.project
    }
  })
}

const sortOptions = [
  { sorter: sortByPriority, ascending: true },
  { sorter: sortByPriority, ascending: false },
  { sorter: sortByDueDate, ascending: true },
  { sorter: sortByDueDate, ascending: false },
  { sorter: sortByDateCreated, ascending: true },
  { sorter: sortByDateCreated, ascending: false },
  { sorter: sortByComplete, ascending: true },
  { sorter: sortByComplete, ascending: false }
]

prioritySorter.addEventListener('click', () => {
  sortTable(sortOptions[orderP ? 1 : 0])
})

dueDateSorter.addEventListener('click', () => {
  sortTable(sortOptions[orderDD ? 3 : 2])
})

dateCreatedSorter.addEventListener('click', () => {
  sortTable(sortOptions[orderDC ? 5 : 4])
})

completedSorter.addEventListener('click', () => {
  sortTable(sortOptions[orderC ? 7 : 6])
})

function sortTable ({ sorter, ascending }) {
  let project = projectList[projectHeader.textContent]
  if (projectHeader.textContent === 'All Todos') {
    project = getAllTodos()
  }
  sorter(project, ascending)
  generateTable(project)
}

function sortByPriority (project, ascending) {
  const order = ['Yesterday', 'High', 'Low', 'No rush']
  const map = new Map()
  order.forEach((x, i) => map.set(x, i))
  project.sort(
    (todo1, todo2) =>
      (ascending ? 1 : -1) * (map.get(todo1.priority) - map.get(todo2.priority))
  )
  orderP = ascending
}

function sortByDueDate (project, ascending) {
  project.sort(
    (todo1, todo2) =>
      (ascending ? 1 : -1) *
      (Date.parse(todo1.dueDate) - Date.parse(todo2.dueDate))
  )
  orderDD = ascending
}

function sortByDateCreated (project, ascending) {
  project.sort(
    (todo1, todo2) =>
      (ascending ? 1 : -1) *
      (Date.parse(todo1.createdOn) - Date.parse(todo2.createdOn))
  )
  orderDC = ascending
}

function sortByComplete (project, ascending) {
  project.sort(
    (todo1, todo2) =>
      (ascending ? 1 : -1) * (todo1.isCompleted - todo2.isCompleted)
  )
  orderC = ascending
}

function renderPopup (todo, project) {
  popupModal.style.display = 'block'
  clearPopup()
  removeInput()
  removeEditIcons()
  renderTodoInfo(todo)
  addCompletedListener(todo)
  addDeleteListener(todo, project)
  addCloseListener(todo, project)
}

function clearPopup () {
  dispTodoProject.textContent = ''
  dispTodoName.textContent = ''
  dispTodoDetails.textContent = ''
  dispTodoDueDate.textContent = ''
  dispTodoPriority.textContent = ''
  dispTodoCreatedOn.textContent = ''
}

function removeEditIcons () {
  const editIcons = popupContainer.querySelectorAll('.edit')
  editIcons.forEach((icon) => icon.remove())
}

function removeInput () {
  const inputs = popupContainer.querySelectorAll('.input')
  inputs.forEach((input) => {
    input.value = ''
    input.remove()
  })
  const buttons = popupContainer.querySelectorAll('button')
  buttons.forEach((button) => button.remove())
}

function renderTodoInfo (todo, project) {
  dispTodoProject.value = todo.project
  dispTodoName.value = todo.name
  dispTodoDetails.value = todo.details
  dispTodoDueDate.value = todo.dueDate
  dispTodoCreatedOn.value = todo.createdOn
  dispTodoCompleted.value = todo.isCompleted
    ? (dispTodoCompleted.checked = true)
    : (dispTodoCompleted.checked = false)
  dispTodoPriority.value = todo.priority
  switch (todo.priority) {
    case 'Yesterday':
      dispTodoPriority.style.color = 'red'
      break
    case 'High':
      dispTodoPriority.style.color = 'orange'
      break
    case 'Low':
      dispTodoPriority.style.color = '#2196F3'
      break
    default:
      dispTodoPriority.style.color = 'green'
      break
  }
  dispTodoProject.textContent = dispTodoProject.value
  dispTodoName.textContent = dispTodoName.value
  dispTodoDetails.textContent = dispTodoDetails.value
  dispTodoDueDate.textContent = dispTodoDueDate.value
  dispTodoCreatedOn.textContent = dispTodoCreatedOn.value
  dispTodoPriority.textContent = dispTodoPriority.value
  handleTodoListeners(todo)
}

function addDeleteListener (todo, project) {
  dispTodoDelete.appendChild(
    createIcon(BinImg, () => handleDeleteTodoListener(todo, project), 'Delete')
  )
}

function handleDeleteTodoListener (todo, project) {
  todo.toDelete = true
  deleteTodo(todo, project)
}

function handleTodoListeners (todo) {
  dispTodoName.after(
    createIcon(
      EditImg,
      () => handleEditTodo(todo, 'text', 'name', dispTodoName),
      'Edit'
    )
  )
  dispTodoDetails.after(
    createIcon(
      EditImg,
      () => handleEditTodo(todo, 'textarea', 'details', dispTodoDetails),
      'Edit'
    )
  )
  dispTodoDueDate.after(
    createIcon(
      EditImg,
      () => handleEditTodo(todo, 'date', 'dueDate', dispTodoDueDate),
      'Edit'
    )
  )
  dispTodoPriority.addEventListener('click', () => {
    handleSelect(dispTodoPriority, todo)
  })
}

window.addEventListener('click', function (event) {
  if (event.target === popupModal) {
    popupModal.style.display = 'none'
    clearPopup()
    // reload page to update table
    if (projectHeader.textContent === 'Completed') {
      // eslint-disable-next-line dot-notation
      generateTable(projectList['Completed'])
    } else if (projectHeader.textContent === 'All Todos') {
      generateAll()
    } else {
      generateTable(projectList[projectHeader.textContent])
    }
  }
})

function handleEditTodo (todo, type, prop, element) {
  let originalValue = todo[prop]
  const cancelButton = createCancelButton()
  const saveButton = createSaveButton()
  let input
  if (type === 'textarea') {
    input = document.createElement('textarea')
    input.setAttribute('class', 'input')
    input.value = originalValue
  } else {
    // input = createInput(todo[prop], type)
    input = document.createElement('input')
    input.setAttribute('class', 'input')
    input.type = type
    input.value = originalValue
  }

  element.textContent = ''
  element.before(input)
  element.before(saveButton)
  element.before(cancelButton)

  input.focus()
  input.select()
  saveButton.addEventListener('click', saveInput)
  cancelButton.addEventListener('click', cancelInput)

  function saveInput () {
    if (type === 'date') {
      todo[prop] = formatDate(input.value)
    } else {
      todo[prop] = input.value.trim()
    }
    saveToLocalStorage(projectList)
    removeInput()
    element.textContent = todo[prop]
  }

  function cancelInput () {
    todo[prop] = originalValue
    saveToLocalStorage(projectList)
    // clearPopup()
    removeInput()
    element.textContent = todo[prop]
  }

  function removeInput () {
    originalValue = null
    input.value = ''
    input.remove()
    saveButton.remove()
    cancelButton.remove()
  }
  // originalValue = null
}

function addCloseListener (todo, project) {
  closePopupBtn.addEventListener('click', function () {
    popupModal.style.display = 'none'
    clearPopup()
    removeEditIcons()
    generateTable(project)
  })
}

function addCompletedListener (todo) {
  const input = document.createElement('input')
  input.type = 'checkbox'
  input.checked = todo.isCompleted
  input.setAttribute('class', 'edit')
  dispTodoCompleted.appendChild(input)
  // saveToLocalStorage(projectList)
  markAsCompleted(todo, input)
}

function handleSelect (element, todo) {
  const select = document.createElement('select')
  select.id = 'priority'
  select.setAttribute('type', 'select')
  const options = ['Yesterday', 'High', 'Low', 'No rush']
  for (let i = 0; i < options.length; i++) {
    const option = new Option(options[i], options[i])
    if (option.value === todo.priority) {
      option.selected = true
    }
    select.appendChild(option)
  }
  select.addEventListener('change', () => {
    todo.priority = select.value
    saveToLocalStorage(projectList)
  })
  element.textContent = ''
  element.appendChild(select)
  select.focus()
}

// delete todo and render table
function deleteTodo (todo) {
  if (confirm('Are you sure you want to delete this todo?')) {
    let todoProject
    console.log(projectList[todo.project])

    if (todo.isCompleted) {
      // eslint-disable-next-line dot-notation
      todoProject = projectList['Completed']
    } else {
      console.log(projectList[todo.project])
      todoProject = projectList[todo.project]
    }
    for (let i = todoProject.length - 1; i >= 0; i--) {
      const item = todoProject[i]
      if (item.toDelete) {
        todoProject.splice(i, 1)
        i--
        saveToLocalStorage(projectList)
      }
    }
    popupModal.style.display = 'none'
    console.log(todoProject)
    if (projectHeader.textContent === 'All Todos') {
      generateAll()
    } else if (projectHeader.textContent === 'Completed') {
      // eslint-disable-next-line dot-notation
      generateTable(projectList['Completed'])
    } else {
      generateTable(todoProject)
    }
  }
}

function addToProject (todo, project) {
  project.push(todo)
}
function removeFromProject (todo, project) {
  const index = project.indexOf(todo)
  project.splice(index, 1)
}

// view all todos from all projects
viewAllTodosBtn.addEventListener('click', () => {
  generateAll()
  projectHeader.textContent = 'All Todos'
})

function getAllTodos () {
  const allTodos = Object.values(projectList).flatMap((array) => array)
  return allTodos
}
function generateAll () {
  generateTable(getAllTodos())
}

clearAllBtn.addEventListener('click', () => {
  const confirmed = confirm('Are you sure you want to delete all todos?')
  if (confirmed) {
    removeAllTodos()
    location.reload()
  }
})
