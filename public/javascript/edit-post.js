// edit post listener function, gets id from data variable of element clicked, and sends to edit page of that post
function editPostListener(event) {
  window.location.replace(`dashboard/edit/${event.target.dataset.id}`)
}

// asynchronous edit post function
async function editFormHandler(event) {
  // prevents default form submission event
  event.preventDefault();

  // gets id from url
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // sets variables equal to selected element's values
  const title = document.querySelector('#post-title').value.trim();
  const text = document.querySelector('#post-text').value.trim();

  // checks if fields are empty
  if (title === null || title === "") {
    alert("Field must not be empty!");
    return;
  }

  if (text === null || text === "") {
    alert("Field must not be empty!")
    return;
  }

  // if fields aren't empty then update the post
  const response = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  // reload page if update went through successfully
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }


}

// if elements exists, add event listener
if(document.querySelector('.edit-post-form')) {
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
}

// if element exists, add event listener
if(document.querySelector('.post-container')) {
  document.querySelector('.post-container').addEventListener('click', editPostListener);
  // remove href attribute from all elements containing the post-title class
  let els = document.querySelectorAll('.post-title');
  els.forEach(el => {
    el.removeAttribute("href");
  })
}
  