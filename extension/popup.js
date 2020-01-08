const sites = {
  epicurious: true,
  foodnetwork: true,
  bonappetit: true,
  allrecipes: true
}
// chowhound: true,
// simplyrecipes: true

const savePageButton = document.getElementById('save-page-btn')
const savePageButtonDiv = document.getElementById('save-page-button-div')
const pageSavedMessage = document.getElementById('page-saved-message')

checkLoginStatus()
var url, site
chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  url = tabs[0].url
  const urlTail = url.split('www.')[1]
  if (urlTail) site = urlTail.split('.com')[0]
})

savePageButton.addEventListener('click', function(event) {
  event.preventDefault()
  fetch('https://appetized.herokuapp.com/api/recipes/', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url})
  })
    .then(response => {
      if (response.status >= 400 && response.status < 500)
        throw new Error('Sorry, this page cannot be scraped')
      else pageSavedMessage.innerText = 'Page saved successfully!'
    })
    .catch(error => {
      pageSavedMessage.innerText =
        "Sorry!  We're having trouble saving this page."
      console.log(error.message)
    })
})

const loginForm = document.getElementById('auth-form')
const usernameInput = document.getElementById('username')
const passwordInput = document.getElementById('password')
const loginErrorMessage = document.getElementById('login-error-message')
const logoutDiv = document.getElementById('logout-div')

loginForm.addEventListener('submit', function(event) {
  event.preventDefault()
  fetch('https://appetized.herokuapp.com/auth/login', {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: usernameInput.value,
      password: passwordInput.value
    })
  })
    .then(response => {
      if (response.status === 401) {
        loginErrorMessage.innerText = 'Wrong username and/or password'
      } else {
        checkLoginStatus()
      }
    })
    .catch(error => {
      loginErrorMessage.innerText = 'Login request failed: ' + error
    })
  loginForm.reset()
})

const loginInfo = document.getElementById('login-info')

function checkLoginStatus() {
  fetch('https://appetized.herokuapp.com/auth/me', {
    method: 'GET',
    mode: 'cors',
    credentials: 'include'
  })
    .then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          const logoutButton = document.createElement('button')
          logoutButton.id = 'logout-button'
          logoutButton.innerText = 'Logout'
          if (url && sites[site]) savePageButton.disabled = false
          logoutButton.onclick = function() {
            savePageButton.disabled = true
            fetch('https://appetized.herokuapp.com/auth/logout', {
              method: 'POST',
              mode: 'cors',
              credentials: 'include'
            })
              .then(() => {
                location.reload()
              })
              .catch(error => {
                console.error(error)
              })
          }
          loginInfo.innerHTML =
            '<p>Hello, ' +
            data.firstName +
            '!  Navigate to a recipe at one of our supported sites to activate the Add Recipe button below.<p>'
          savePageButtonDiv.style.display = 'block'
          logoutDiv.appendChild(logoutButton)
        })
      }
      savePageButton.disabled = true
    })
    .catch(error => {
      console.error(error)
    })
}
