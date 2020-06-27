window.$ = document.querySelector.bind(document);
window.$id = document.getElementById.bind(document);

const word = $id('word')
const text = $id('text')
const scoreEl = $id('score')
const timeEl = $id('time')
const endgameEl = $id('end-game-container')
const settingsBtn = $id('settings-btn')
const settings = $id('settings')
const settingsForm = $id('settings-form')
const difficultySelect = $id('difficulty')

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
]

// Init word, score, time
let randomWord
let score = 0
let time = 10
let increment = 5

let difficultyVals = {
  'easy': 5,
  'medium': 3,
  'hard': 2
}

let difficulty = localStorage.getItem('difficulty') || 'medium'
updateDifficulty()


// Focus on text on start
text.focus()
text.value = ''

// Start counting down
const timeInterval = setInterval(updateTime, 1000)

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)]
}

function updateDifficulty() {
  difficultySelect.value = difficulty
  increment = difficultyVals[difficulty]
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score
}

// Add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord()
  word.innerHTML = randomWord
}

// Update time
function updateTime() {
  time--
  timeEl.innerHTML = time + 's'

  if (time === 0) {
    clearInterval(timeInterval)
    gameOver()
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `

  endgameEl.style.display = 'flex'
}

addWordToDOM()

// Event listeners
text.addEventListener('input', e => {
  const insertedText = e.target.value
  if (insertedText === randomWord) {
    addWordToDOM()
    updateScore()

    e.target.value = ''
    time += increment
    updateTime()
  }
})

difficultySelect.addEventListener('change', e => {
  difficulty = e.target.value
  updateDifficulty()
  localStorage.setItem('difficulty', difficulty)
  
})

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide')
})