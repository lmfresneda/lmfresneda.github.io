import moment from 'moment'
import data from './data'

import './assets/fontawesome/css/fa-svg-with-js.css'
import './assets/fontawesome/js/fontawesome-all.min.js'
import './scss/main.scss'

// calculate age
const { year, month, day } = data.personal.birthdate
const age = moment().diff(moment([year, (month - 1), day]), 'years')
data.personal.age = age

const template = require("./pugs/app.pug")
document.getElementById('app').innerHTML = template({ data })


// function setCss() {
//   document.querySelectorAll('.section').forEach((el) => {
//     el.style.height = window.innerHeight + 'px'
//   })
// }
// window.onresize = setCss
// setCss()

function goTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({
    behavior: 'smooth'
  })
}

document.querySelectorAll('.go-to').forEach((el) => {
  el.addEventListener('click', (ev) => {
    ev.stopPropagation()
    ev.preventDefault()
    let go = ev.target.dataset.href
    if (!go) {
      go = ev.target.parentElement.dataset.href
    }
    if (!go) {
      go = ev.target.parentElement.parentElement.dataset.href
    }
    goTo(go)
  })
})
