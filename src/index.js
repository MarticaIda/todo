// task and project object logic goes here

import './style.css'
import openModal from './modal'
// import generateTable from './dom_build'

export const myTasks = []
// const myProjects = []

export const taskActions = {
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
  },
  deleteTask () {
    this.toDelete = true
  }
}

export function createTask () {
  const task = Object.create(taskActions)
  const content = document.getElementById('task')
  const details = document.getElementById('details')
  const dueDate = document.getElementById('dueDate')
  const priority = document.getElementById('priority')
  task.content = content.value
  task.details = details.value
  task.dueDate = dueDate.value
  task.priority = priority.value
  task.toDelete = false
  myTasks.push(task)
}

openModal()
