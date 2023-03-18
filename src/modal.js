// modal logic goes here

import { createTask } from './index'

export default function openModal () {
  const form = document.querySelector('form')
  const openBtn = document.querySelector('#btnOpen')
  const modal = document.querySelector('#modal')
  const closeForm = document.getElementById('close')

  openBtn.addEventListener('click', function () {
    modal.style.display = 'block'
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    createTask()
    modal.style.display = 'none'
    form.reset()
  })
  closeForm.addEventListener('click', function () {
    modal.style.display = 'none'
    form.reset()
  })
}
