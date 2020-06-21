const wordEl = document.getElementById('word')
const wrongLetterEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')

const figureParts = document.querySelectorAll('.figure-part')

const words = ['application', 'programming', 'interface', 'wizard', 'codemonkey', 'propeller', 'beanie']
let selectedWord = getRandomWord()

let correctLetters = []
let wrongLetters = []

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

// Show notification
function showNotification() {
  notification.classList.add('show')
  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

// Update wrong letters
function updateWrongLetters() {
  // Display wrong letter guesses
  wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong guesses</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `

  // Display figure parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length

    if (index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost. 😟'
    popup.style.display = 'flex'
  } 
}

// Show the hidden word
function displayWord() {
  const wordArr = selectedWord.split('')
  wordEl.innerHTML = `
    ${wordArr.map(
      letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ''}
        </span>
      `
    ).join('')}
  `

  const innerWord = wordEl.innerText.replace(/\n/g, '')
  
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won! 🙂'
    popup.style.display = 'flex'
  }
}

// Keydown letter press
window.addEventListener('keydown', e => {
  // console.log(e.keyCode)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter)
        displayWord()
      } else {
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)
        updateWrongLetters()
      } else {
        showNotification()
      }
    }
  }
})

// Restart the game and play again
playAgainBtn.addEventListener('click', () => {
  correctLetters = []
  wrongLetters = []

  selectedWord = getRandomWord()

  displayWord()

  updateWrongLetters()

  popup.style.display = 'none'
})

displayWord()