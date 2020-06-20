const currencyEl_one = document.getElementById('currency-one')
const currencyEl_two = document.getElementById('currency-two')
const amountEl_one = document.getElementById('amount-one')
const amountEl_two = document.getElementById('amount-two')

const rateEl = document.getElementById('rate')
const swap = document.getElementById('swap')

// Fetch exchange rates and update the DOM
function calculate() {
  const currencyOne = currencyEl_one.value
  const currencyTwo = currencyEl_two.value
  const amountOne = amountEl_one.value
  const amountTwo = amountEl_two.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res => res.json())
    .then(data => {
      const rate = data['rates'][currencyTwo]
      // console.log(rate);
      rateEl.textContent = `1 ${currencyOne} = ${rate} ${currencyTwo}`
      amountEl_two.value = (amountOne * rate).toFixed(2)
    })
}

// Event listeners
currencyEl_one.addEventListener('change', calculate)
amountEl_one.addEventListener('input', calculate)
currencyEl_two.addEventListener('change', calculate)
amountEl_two.addEventListener('change', calculate)

swap.addEventListener('click', () => {
  const tempCurrency = currencyEl_two.value
  currencyEl_two.value = currencyEl_one.value
  currencyEl_one.value = tempCurrency
  calculate()
})

calculate()