// rendering logic goes here

import { myTasks } from './index'
import BinIcon from './recycle-bin.png'

export default function generateTable () {
  const main = document.querySelector('#main')
  const table = document.querySelector('table')
  table.innerHTML = ''
  for (const task of myTasks) {
    const row = document.createElement('tr')
    Object.entries(task).forEach((entry) => {
      const [key, value] = entry
      const data = document.createElement('td')
      data.textContent = value
      data.setAttribute('class', key)
      row.appendChild(data)
      // const input = document.createElement('input')
      // input.setAttribute('type', 'text')
      // data.appendChild(input)
      // input.addEventListener('click', function () {
      //   dataValue = input.value
      // })
      // console.log(dataValue)
    })
    table.appendChild(row)
  }
  const deleteCell = document.getElementsByClassName('toDelete')
  for (let i = 0; i < deleteCell.length; i++) {
    const deleteIcon = new Image()
    deleteIcon.src = BinIcon
    deleteCell[i].textContent = ''
    deleteCell[i].appendChild(deleteIcon)
  }

  main.appendChild(table)

  return table
}
