import './style.css'
import {
  projectList,
  createTodo,
  getAllTodos,
  getProjectTodos
} from './createTodo'
// import BinIcon from './recycle-bin.png'

const todoList = getAllTodos()
const projectElement = document.getElementById('project')
export function getProjectName () {
  const project = projectElement.value
  return project
}
const projectBar = document.querySelector('ul')
const projectHeader = document.querySelector('h1')
const form = document.querySelector('form')
const openBtn = document.querySelector('#btnOpen')
const modal = document.querySelector('#modal')
const closeBtn = document.querySelector('#btnClose')
modal.style.display = 'none'
const addProjectBtn = document.getElementById('addProject')
const nameEl = document.getElementById('task')
const detailsEl = document.getElementById('details')
const dueDateEl = document.getElementById('dueDate')
const priorityEl = document.getElementById('priority')

addProjectBtn.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('add project button clicked')
  const project = getProjectName()
  console.log(project)
  if (project === '') {
    alert('Please enter a project name')
    return
  }
  if (projectList[project]) {
    alert('Project already exists')
  } else {
    projectList[project] = []
  }
  console.log(project)
  generateProjectBar(projectList)
  projectElement.value = ''
})

const getTodoInput = () => {
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

    createTodo(name, details, dueDate, priority)
    form.reset()
    modal.style.display = 'none'
  })

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none'
    form.reset()
  })
}
getTodoInput()

function generateProjectBar () {
  console.log('genetate project bar')
  projectBar.textContent = ''
  for (const project in projectList) {
    const listItem = document.createElement('li')
    listItem.textContent = project
    projectBar.appendChild(listItem)
    listItem.addEventListener('click', () => {
      projectHeader.textContent = project
      const currentProject = getProjectTodos(project)
      generateProject(currentProject)
    })
  }
}

const tbody = document.querySelector('tbody')

export function generateProject (currentProject) {
  tbody.textContent = ''
  for (const todo of currentProject) {
    domBuild(todo)
  }
  console.log(projectList)
}

export function generateAll () {
  tbody.textContent = ''
  for (const todo of todoList) {
    domBuild(todo)
  }
}

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
    data.addEventListener('click', addInput)
    input.addEventListener('change', saveInput)
    select.addEventListener('change', saveSelect)

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
// const deleteEntries = () => {
//   const deleteCell = document.getElementsByClassName('toDelete')
//   for (let i = 0; i < deleteCell.length; i++) {
//     const deleteIcon = new Image()
//     deleteIcon.src = BinIcon
//     deleteCell[i].textContent = ''
//     deleteCell[i].appendChild(deleteIcon)
//     deleteCell[i].addEventListener('click', function () {
//       x.splice(i, 1)
//       generateTable()
//     })
//   }
// }
