// asynchronous form handler function
async function newFormHandler(event) {
  // prevents default form submission event
  event.preventDefault();

  // selects value of specified elements on page
  const title = document.querySelector('#post-title').value;
  const post_text = document.querySelector('#post-text').value;

  console.log(title);
  console.log(post_text);

  // assigns fetch response to variable
  const response = await fetch(`/api/posts`, {
    method: 'POST',
    // data to be posted to database
    body: JSON.stringify({
      title,
      post_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // if response is ok then send to dashboard
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// add event listener
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);