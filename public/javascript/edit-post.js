function editPostListener(event) {
  window.location.replace(`dashboard/edit/${event.target.dataset.id}`)
}

async function editFormHandler(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();

    console.log(title);
    console.log(text);

    if (title === null || title === "") {
      alert("Field must not be empty!");
      return;
    }

    if (text === null || text === "") {
      alert("Field must not be empty!")
      return;
    }

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
    
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }

  
  }

  if(document.querySelector('.edit-post-form')) {
    document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  }
  
  if(document.querySelector('.post-container')) {
    document.querySelector('.post-container').addEventListener('click', editPostListener);
    let els = document.querySelectorAll('.post-title');
    els.forEach(el => {
      el.removeAttribute("href");
    })
  }
  