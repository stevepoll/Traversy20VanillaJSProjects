const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value // '+' converts to number

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateTotals() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  const seatIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat))
  localStorage.setItem('selectedSeats', JSON.stringify(seatIndexes))

  const selectedSeatsCount = selectedSeats.length

  count.textContent = selectedSeatsCount
  total.textContent = selectedSeatsCount * ticketPrice
}

// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  const selectedMoviePrice = localStorage.getItem('selectedMoviePrice')

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }

  if (selectedSeats !== null && selectedSeats.length > 0) {
    count.textContent = selectedSeats.length
    total.textContent = selectedMoviePrice * selectedSeats.length
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add('selected')
      }
    })
  } else {
    count.textContent = 0
    total.textContent = 0
  }
}

// Movie select event
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  ticketIndex = e.target.selectedIndex

  updateTotals()
  setMovieData(ticketIndex, ticketPrice)
})

// Seat select event
container.addEventListener('click', (e) => {
  const classes = e.target.classList
  if (classes.contains('seat') && !classes.contains('occupied')) {
    e.target.classList.toggle('selected')

    updateTotals()
  }
})