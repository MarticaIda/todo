export default function (task) {
  const todosContainer = document.getElementById('todos')

  const taskElement = document.createElement('div')
  const content = document.createElement('div')
  const details = document.createElement('div')
  const dueDate = document.createElement('div')
  const priority = document.createElement('div')
  content.innerHTML = task.content
  details.innerHTML = task.details
  dueDate.innerHTML = task.dueDate
  priority.innerHTML = task.priority
  taskElement.appendChild(content)
  taskElement.appendChild(details)
  taskElement.appendChild(dueDate)
  taskElement.appendChild(priority)
  todosContainer.appendChild(taskElement)
}
