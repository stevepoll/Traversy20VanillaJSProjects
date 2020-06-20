const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

const fieldNames = {
  username: 'User name',
  email: 'Email',
  password: 'Password',
  password2: 'Password Confirmation'
}

function showError(formControl, msg) {
  const small = formControl.querySelector('small')

  formControl.classList.add('error')
  formControl.classList.remove('success')
  small.textContent = msg
}

function showSuccess(formControl) {
  const small = formControl.querySelector('small')

  formControl.classList.add('success')
  formControl.classList.remove('error')
  small.textContent = ''
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function getFieldName(input) {
  return fieldNames[input.id]
}

function checkRequired(fcs) {
  fcs.forEach(fc => {
    const input = fc.querySelector('input')
    if (input.value.trim() === '') {
      showError(fc, `${getFieldName(input)} is required`)
    } else {
      showSuccess(fc)
    }
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  var inputsArr = Array.from(document.querySelectorAll('.form-control'));
  checkRequired(inputsArr)
})