const draggableList = document.getElementById('draggable-list')
const check = document.getElementById('check')

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page'
]

// Store the list items
const listItems = []

let dragStartIndex

createList()

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map(person => ({ value: person, sort: Math.random() }))
    .sort((person1, person2) => person1.sort - person2.sort)
    .map(person => person.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li')
      listItem.setAttribute('data-index', index)
      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
    `

      listItems.push(listItem)
      draggableList.appendChild(listItem)
    })
  console.log(listItems)
  addEventListeners()
}

function dragStart() {
  // console.log('Event: ', 'dragstart')
  dragStartIndex = +this.closest('li').dataset.index
}

function dragOver(e) {
  // console.log('Event: ', 'dragover')
  e.preventDefault()
}

function dragDrop() {
  // console.log('Event: ', 'drop')
  const dragEndIndex = +this.dataset.index

  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')
}
function dragEnter() {
  // console.log('Event: ', 'dragenter')
  this.classList.add('over')
}
function dragLeave() {
  // console.log('Event: ', 'dragleave')
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector('.draggable')
  const toItem = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(toItem)
  listItems[toIndex].appendChild(fromItem)
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim()
    if (personName !== richestPeople[index]) {
      listItem.classList.remove('right')
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

check.addEventListener('click', checkOrder)