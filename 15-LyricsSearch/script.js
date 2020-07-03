const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')
const more = document.getElementById('more')

const apiURL = 'https://api.lyrics.ovh'

// Search by song or artist
async function getSongs(url, proxy = false) {
  const goUrl = proxy
    ? 'https://cors-anywhere.herokuapp.com/' + url
    : url

  // console.log(goUrl)
  const res = await fetch(goUrl)
  const data = await res.json()

  showSongs(data)
}

// Show song and artist in DOM
function showSongs(songs) {
  console.log(songs)
  result.innerHTML = `
  <ul class="songs">
  ${songs.data.map(song =>
    `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Get Lyrics</button>
      </li>
    `
  ).join('')}
    </ul>
  `

  if (songs.prev || songs.next) {
    more.innerHTML = `
      ${songs.prev ? `<button class="btn" onclick="getSongs('${songs.prev}', true)">Prev</button>` : ''}
      ${songs.next ? `<button class="btn" onclick="getSongs('${songs.next}', true)">Next</button>` : ''}
    `
  } else {
    more.innerHTML = ''
  }
}

// Show lyrics
function showLyrics(artist, title, lyrics) {
  // const lines = lyrics.split('\n')
  const lines = lyrics.replace(/(\r\n|\n|\r)/g, '<br>')
  // const lyricContent = lines.map(line => `
  //   ${line.length > 0 ? `${line}<br>` : `<br>`}
  // `).join('')
  result.innerHTML = `
    <h2><strong>${artist}</strong> - ${title}</h2>
    <span>${lines}</span>
  `
  more.innerHTML = ''
}

async function getLyrics(artist, title) {
  const url = `${apiURL}/v1/${artist}/${title}`
  console.log(url)
  const res = await fetch(url)
  const data = await res.json(res)

  showLyrics(artist, title, data.lyrics)
}

// Event listeners
form.addEventListener('submit', e => {
  e.preventDefault()

  const searchTerm = search.value.trim()
  console.log(searchTerm)
  if (searchTerm) {
    search.value = ''
    getSongs(`${apiURL}/suggest/${searchTerm}`)
  }
})

// Get lyrics button click
result.addEventListener('click', e => {
  const clickedEl = e.target

  if (clickedEl.tagName === 'BUTTON') {
    getLyrics(clickedEl.dataset.artist, clickedEl.dataset.songTitle)
  }
})