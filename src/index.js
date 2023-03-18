// task and project object logic goes here

import './style.css'
import openModal from './modal'
import generateTable from './dom_build'

const myTasks = []
// const myProjects = []

const taskActions = {
  changeContent (newContent) {
    return (this.content = newContent)
  },
  changeDetails (newDetails) {
    return (this.details = newDetails)
  },
  changeDueDate (newDate) {
    return (this.dueDate = newDate)
  },
  changePriority (newPriority) {
    return (this.priority = newPriority)
  }
}

export function createTask (content, details, dueDate, priority) {
  const task = Object.create(taskActions)
  task.content = document.getElementById('task').value
  task.details = document.getElementById('details').value
  task.dueDate = document.getElementById('dueDate').value
  task.priority = document.getElementById('priority').value
  myTasks.push(task)
}

openModal()

console.log(myTasks)

generateTable(myTasks)

console.log(myTasks)
