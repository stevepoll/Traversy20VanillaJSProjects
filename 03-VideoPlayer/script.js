const video = document.getElementById('video')
const play = document.getElementById('play')
const stop = document.getElementById('stop')
const progress = document.getElementById('progress')
const timestamp = document.getElementById('timestamp')

// Play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

function updatePlayIcon() {
  const icon = play.querySelector('i')
  if (video.paused) {
    icon.className = 'fa fa-play fa-2x'
  } else {
    icon.className = 'fa fa-pause fa-2x'
  }
}

function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100

  timestamp.textContent = new Date(1000 * video.currentTime).toISOString().substr(11, 8)
}

function setVideoProgress() {
  const percent = +progress.value / 100
  video.currentTime = video.duration * percent
}

function stopVideo() {
  video.currentTime = 0
  video.pause()
}


// Event listeners
video.addEventListener('click', toggleVideoStatus)
video.addEventListener('pause', updatePlayIcon)
video.addEventListener('play', updatePlayIcon)
video.addEventListener('timeupdate', updateProgress)

play.addEventListener('click', toggleVideoStatus)

stop.addEventListener('click', stopVideo)

progress.addEventListener('change', setVideoProgress)