const container = document.getElementById('container')
const text = document.getElementById('text')
const settings = document.getElementById('settings')
const nav = document.getElementsByTagName('nav')[0]
const breathsPerMin = document.getElementById('breaths-per-min')
const setBtn = document.getElementById('set-btn')
const pointerContainer = document.getElementById('pointer-container')
console.log(pointerContainer)

let totalTime = 12000
let breatheTime = (totalTime / 5) * 2
let holdTime = totalTime / 5
let interval = null
let holdTimeout = null
let breatheOutTimeout = null

const root = document.documentElement
root.style.setProperty('--total-time', totalTime)
root.style.setProperty('--breathe', breatheTime)

function updateTimes(timeIn) {
  totalTime = timeIn
  breatheTime = (totalTime / 5) * 2
  holdTime = totalTime / 5
}

function breathAnimation() {
  text.innerText = 'Breathe in!'
  container.className = 'container grow'
  pointerContainer.className = 'pointer-container animate'

  holdTimeout = setTimeout(() => {
    text.innerText = 'Hold'

    breatheOutTimeout = setTimeout(() => {
      text.innerText = 'Breathe out'
      container.className = 'container shrink'
    }, holdTime)
  }, breatheTime)
}

function start() {
  breathAnimation()
  interval = setInterval(breathAnimation, totalTime)
}

function stop() {
  clearInterval(interval)
  clearTimeout(holdTimeout)
  clearTimeout(breatheOutTimeout)
  pointerContainer.classList.remove('animate')
  container.className = 'container'
  text.innerText = 'Breathe in!'
}

nav.addEventListener('click', () => {
  settings.classList.toggle('active')
  if (settings.classList.contains('active')) {
    stop()
  } else {
    start()
  }
})

setBtn.addEventListener('click', () => {
  stop()
  const bpm = +breathsPerMin.value
  if (typeof bpm === 'number') {
    updateTimes(60 / bpm * 1000)
    root.style.setProperty('--total-time', totalTime)
    root.style.setProperty('--breathe', breatheTime)

    settings.classList.remove('active')
    start()
  }
})

// start()