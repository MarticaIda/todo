// rendering logic goes here

import { myTasks } from './index'
import BinIcon from './recycle-bin.png'

export default function generateTable () {
  const main = document.querySelector('#main')
  const table = document.querySelector('table')
  table.textContent = ''
  for (const task of myTasks) {
    const row = document.createElement('tr')

    Object.keys(task).forEach((entry) => {
      const data = document.createElement('td')
      data.setAttribute('class', entry)
      data.textContent = task[entry]
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
          select.setAttribute('value', task[entry])
          data.appendChild(select)
        } else {
          input.setAttribute('type', 'text')
          input.setAttribute('value', task[entry])
          data.appendChild(input)
        }
      }

      function saveInput () {
        task[entry] = input.value
        data.textContent = task[entry]
      }
      function saveSelect () {
        task[entry] = select.value
        data.textContent = task[entry]
      }
    })
    table.appendChild(row)
  }

  const deleteCell = document.getElementsByClassName('toDelete')
  for (let i = 0; i < deleteCell.length; i++) {
    const deleteIcon = new Image()
    deleteIcon.src = BinIcon
    deleteCell[i].textContent = ''
    deleteCell[i].appendChild(deleteIcon)
    deleteCell[i].addEventListener('click', function () {
      myTasks.splice(i, 1)
      generateTable()
    })
  }

  main.appendChild(table)

  return table
}
