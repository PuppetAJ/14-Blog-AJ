// asynchronous sign up function
async function signupFormHandler(event) {
  // prevents default form submission event
  event.preventDefault();

  // sets variables equal to the values of selected elements
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // if there's both a username and password inputted, then send a post request
  if (username && password) {
    const response = await fetch ('/api/users', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    // if the request went through, send to home page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
      // otherwise clear sign up fields
      document.querySelector('#username-signup').value = "";
      document.querySelector('#password-signup').value = "";
    }
  }
}

// asynchronous log in function
async function loginFormHandler(event) {
  // prevent default form submission event
  event.preventDefault();

  // sets variables equal to the values of selected elements
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  
  // if there's both a username and password inputted, then send a post request with said values
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'post',
      body: JSON.stringify({
        username,
        password
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    // if the fetch request went through okay, send to home page
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}

// add event listeners
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);