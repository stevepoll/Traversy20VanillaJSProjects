window.$ = document.querySelector.bind(document)
Node.prototype.on = window.on = function(name, fn) {
  this.addEventListener(name, fn)
}

const balance = $('#balance')
const moneyPlus = $('#money-plus')
const moneyMinus = $('#money-minus')
const list = $('#list')
const form = $('#form')
const text = $('#text')
const amount = $('#amount')

// const dummyTxns = [
//   { id: 1, text: 'Flower', amount: -20},
//   { id: 2, text: 'Salary', amount: 300},
//   { id: 3, text: 'Book', amount: -10},
//   { id: 4, text: 'Camera', amount: 150}
// ]

let txns = [];

function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount')
  } else {
    const txn = {
      id: generateId(),
      text: text.value,
      amount: +amount.value
    }

    txns.push(txn)
    addTxnDOM(txn)
    updateValues()

    localStorage.setItem('txns', JSON.stringify(txns))

    text.value = ''
    amount.value = ''
  }
}

// Generate a random ID
function generateId() {
  return Math.floor(Math.random() * 100000000)
}

// Add txns to DOM list
function addTxnDOM(txn) {
  const amt = txn.amount
  // Get the sign
  const sign = amt < 0 ? '-' : '+'
  
  const item = document.createElement('li')
  item.setAttribute('data-txn-id', txn.id)
  item.classList.add(amt < 0 ? 'minus' : 'plus')

  item.innerHTML = `${txn.text} <span>${sign}${Math.abs(amt)}</span> <button class="delete-btn">x</button>`

  list.appendChild(item)
}

// Update the balance, income and expense
function updateValues() {
  let total = 0, income = 0, expenses = 0

  txns.forEach((txn) => {
    const amt = txn.amount
    if (amt < 0) {
      expenses += amt
    } else {
      income += amt
    }
    total += amt
  })

  // console.log(total, income, expenses)
  balance.innerHTML = `$${total.toFixed(2)}`
  moneyPlus.innerHTML = `$${income.toFixed(2)}`
  moneyMinus.innerHTML = `$${expenses.toFixed(2)}`
}

// Delete transaction
function removeTxn(txnId) {
  txns = txns.filter(txn => txn.id !== txnId)
  localStorage.setItem('txns', JSON.stringify(txns))
  init()
}

// Init app
function init() {
  list.innerHTML = ''

  txns = JSON.parse(localStorage.getItem('txns'))
  txns === null ? [] : txns
  txns.forEach(addTxnDOM)
  updateValues()
}

init()

form.on('submit', addTransaction)

list.on('click', e => {
  if (e.target.classList && e.target.classList.contains('delete-btn')) {
    const txnId = +(e.target.parentNode.dataset.txnId)
    removeTxn(txnId)
  }
})