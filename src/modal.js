// modal logic goes here

import { createTask, myTasks } from './index'
import generateTable from './dom_build'

export default function openModal () {
  const form = document.querySelector('form')
  const openBtn = document.querySelector('#btnOpen')
  const modal = document.querySelector('#modal')
  const closeBtn = document.querySelector('#btnClose')
  modal.style.display = 'none'

  openBtn.addEventListener('click', function () {
    modal.style.display = 'block'
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    createTask()
    generateTable(myTasks)
    form.reset()
    modal.style.display = 'none'
  })
  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none'
    form.reset()
  })
}
