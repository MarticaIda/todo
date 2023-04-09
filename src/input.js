// import { createTodo, projectList } from './createTodo'
// import { generateProjectBar } from './index.js'

// const form = document.querySelector('form')
// const openBtn = document.querySelector('#btnOpen')
// const modal = document.querySelector('#modal')
// const closeBtn = document.querySelector('#btnClose')
// modal.style.display = 'none'
// const addProjectBtn = document.getElementById('addProject')
// const nameEl = document.getElementById('task')
// const detailsEl = document.getElementById('details')
// const dueDateEl = document.getElementById('dueDate')
// const priorityEl = document.getElementById('priority')

// export function getProjectName () {
//   const projectName = document.getElementById('project').value
//   return projectName
// }
// addProjectBtn.addEventListener('submit', (e) => {
//   e.preventDefault()
//   console.log('hello')
//   const projectName = getProjectName()
//   if (projectName === '') {
//     alert('Please enter a project name')
//     return
//   }
//   if (projectList[projectName]) {
//     alert('Project already exists')
//   } else {
//     projectList[projectName] = []
//   }
//   generateProjectBar()
// })

// export const getTodoInput = () => {
//   openBtn.addEventListener('click', function () {
//     modal.style.display = 'block'
//   })

//   form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const name = nameEl.value
//     const details = detailsEl.value
//     const dueDate = dueDateEl.value
//     const priority = priorityEl.value

//     if (name === '') {
//       alert('Please enter a task name')
//       return
//     }

//     createTodo(name, details, dueDate, priority)
//     form.reset()
//     modal.style.display = 'none'
//   })

//   closeBtn.addEventListener('click', function () {
//     modal.style.display = 'none'
//     form.reset()
//   })
// }
