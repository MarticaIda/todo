// rendering logic goes here

export default function generateTable (myTasks) {
  const main = document.querySelector('#main')
  const table = document.querySelector('table')
  // table.style.display = 'block'
  for (let i = 0; i < myTasks.length; i++) {
    const row = table.insertRow(-1)
    const data = Object.values(myTasks[i])
    data.forEach((value) => (row.insertCell().textContent = value))
    // add dateAdded cell
    const dCell = row.insertCell(-1)
    const input = document.createElement('input')
    input.setAttribute('type', 'checkbox')
    dCell.appendChild(input)
    input.addEventListener('click', () => {
      myTasks[i].delete = true
    })
  }
  main.appendChild(table)
}
