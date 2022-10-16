// asynchronouse comment adding function
async function commentFormHandler(event) {
  // prevents default form submission event
  event.preventDefault();

  // sets variable to selected elements value
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  // gets post id from url (window location)
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // if there's any comment text then send a post request
  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // if response is ok reload the page so comment appears
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }

}

// add event listener
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);