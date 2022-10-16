// asynchronous log out function
async function logout() {
  // send logout request
  const response = await fetch('/logout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' }
  });

  // if it went through okay, send to home page
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
}

// add event listener
document.querySelector('#logout').addEventListener('click', logout);