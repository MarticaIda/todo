import './style.css'
import renderPage from './dom_build'

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

function createTask (content, details, dueDate, priority) {
  const task = Object.create(taskActions)
  task.content = content
  task.details = details
  task.dueDate = dueDate
  task.priority = priority
  return task
}

const taskOne = createTask('do this', 'like so', 'on the 1st', 'high')

// taskOne.changeDueDate = taskActions.changeDueDate
console.log(taskOne)
taskOne.changeDueDate('new Date')
taskOne.changeContent('remember about this')
taskOne.changePriority('low')
console.log(taskOne)

renderPage(taskOne)
