window.$ = document.querySelector.bind(document)
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn)
}

const musicContainer = $('#music-container')
const playBtn = $('#play')
const prevBtn = $('#prev')
const nextBtn = $('#next')

const audio = $('#audio')
const progress = $('#progress')
const progressContainer = $('#progress-container')
const title = $('#title')
const cover = $('#cover')

// Song titles
const songs = ['hey', 'summer', 'ukulele']

// Keep track of song
let songIndex = 2

// Initially load song details into DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `./music/${song}.mp3`
  cover.src = `./images/${song}.jpg`
}

function playSong() {
  musicContainer.classList.add('play')
  const icon = playBtn.querySelector('i.fas')
  icon.classList.remove('fa-play')
  icon.classList.add('fa-pause')
  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  const icon = playBtn.querySelector('i.fas')
  icon.classList.remove('fa-pause')
  icon.classList.add('fa-play')
  audio.pause()
}

function prevSong() {
  songIndex -= 1
  songIndex = songIndex < 0 ? songs.length - 1 : songIndex
  loadSong(songs[songIndex])
  playSong()
}

function nextSong() {
  songIndex += 1
  songIndex = (songIndex >= songs.length) ? 0 : songIndex
  loadSong(songs[songIndex])
  playSong()
}

// Set progress bar
function setProgress(e) {
  const duration = audio.duration

}

// Event listeners
playBtn.on('click', () => {
  if (musicContainer.classList.contains('play')) {
    pauseSong()
  } else {
    playSong()
  }
})

prevBtn.on('click', () => {
  prevSong()
})

nextBtn.on('click', () => {
  nextSong()
})

audio.on('timeupdate', () => {
  const percentComplete = (audio.currentTime / audio.duration) * 100
  progress.style.width = `${percentComplete}%`
})

progressContainer.on('click', (e) => {
  const width = progressContainer.clientWidth
  const offset = e.offsetX
  const duration = audio.duration

  audio.currentTime = (offset / width) * duration
})

audio.on('ended', nextSong)