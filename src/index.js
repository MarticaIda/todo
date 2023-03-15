import './style.css'

const todosContainer = document.getElementById('todos')

const todo = document.createElement('span')
todo.setAttribute('class', 'item')
todo.textContent = 'lorem ipsum'
todosContainer.appendChild(todo)
