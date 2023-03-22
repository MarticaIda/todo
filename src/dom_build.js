// rendering logic goes here

import { myTasks } from './index'

export default function generateTable () {
  const main = document.querySelector('#main')
  const table = document.querySelector('table')
  const btnContainer = document.querySelector('#btnContainer')
  table.innerHTML = ''
  for (const entry of myTasks) {
    const row = document.createElement('tr')
    Object.values(entry).forEach(function (value) {
      const data = document.createElement('td')
      data.appendChild(document.createTextNode(value))
      row.appendChild(data)
    })
    table.appendChild(row)

    const dCell = row.insertCell(-1)
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    dCell.appendChild(input)
    input.addEventListener('click', () => {
      entry.delete = true
    })
    console.log(myTasks)
  }

  main.appendChild(table)
  btnContainer.appendChild(deleteBtn)

  return table
}

const deleteBtn = document.createElement('button')
deleteBtn.setAttribute('id', 'btnDelete')
deleteBtn.textContent = 'Delete task'

deleteBtn.addEventListener('click', function () {
  for (let i = 0; i < myTasks.length; i++) {
    if (myTasks[i].delete === true) {
      myTasks.splice(i, 1)
    }
  }
  generateTable()
})
