// asynchronous delete post function
async function deleteFormHandler(event) {
  // prevents default form submission event
  event.preventDefault();

  // gets post id from url
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // deletes post using id
  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
  });

  // sends to dashboard if post was deleted
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

// add event listener
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);