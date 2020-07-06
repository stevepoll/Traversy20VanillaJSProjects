const days = document.getElementById('days')
const hours = document.getElementById('hours')
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const countdown = document.getElementById('countdown')
const year = document.getElementById('year')
const loading = document.getElementById('loading')

const currentYear = new Date().getFullYear()
const newYear = new Date(`January 01 ${currentYear + 1} 00:00:00`)

// Set background year
year.innerText = newYear.getFullYear()

function updateCountdown() {
  const currentTime = new Date()
  let secondsLeft = Math.floor((newYear - currentTime) / 1000) // Convert from milliseconds to seconds

  const d = Math.floor(secondsLeft / (60 * 60 * 24))
  secondsLeft = Math.floor(secondsLeft % (60 * 60 * 24))

  const h = Math.floor(secondsLeft / (60 * 60))
  secondsLeft = Math.floor(secondsLeft % (60 * 60))

  const m = Math.floor(secondsLeft / 60)
  secondsLeft = Math.floor(secondsLeft % 60)

  const s = secondsLeft

  days.innerText = d
  hours.innerText = h < 10 ? '0' + h : h
  minutes.innerText = m < 10 ? '0' + m : m
  seconds.innerText = s < 10 ? '0' + s : s
}

setTimeout(() => {
  loading.style.display = 'none'
  countdown.style.display = 'flex'
}, 1000)
setInterval(updateCountdown, 1000)
