// rendering logic goes here

export default function generateTable (arr) {
  const main = document.querySelector('#main')
  const table = document.querySelector('table')
  const btnContainer = document.querySelector('#btnContainer')
  table.innerHTML = ''
  // table.style.display = 'block'
  // for (let i = rowCount - 1; i > 0; i--) {
  //   table.deleteRow(i)
  // }
  for (const entry of arr) {
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
  }

  main.appendChild(table)
  btnContainer.appendChild(deleteBtn)

  return table
}

const deleteBtn = document.createElement('button')
deleteBtn.setAttribute('id', 'btnDelete')
deleteBtn.textContent = 'Delete books'

deleteBtn.addEventListener('click', function () {
  for (let i = array.length - 1; i >= 0; --i) {
    if (array[i].delete === true) {
      array.splice(i, 1)
    }
  }
  generateTable()
})
