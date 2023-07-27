const host = window.location.host;



const body = document.querySelector('body');
const darkModeBtn = document.getElementById('dark-mode-btn');

darkModeBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
});

const postsList = document.querySelector(".post-list");
const addPostForm = document.querySelector(".add-post-form");

const idValue = document.getElementById("title-value");
const nameValue = document.getElementById("body-value");
const btnSubmit = document.querySelector(".btn");
const updatePostButton = document.getElementById("update-post-btn");
const cancelUpdateButton = document.getElementById("cancel-update-btn");

const url = "http://" +host+":8080/api/v1/player";

// Function to fetch posts from the server
const fetchPosts = () => {
  fetch(url)
    .then(res => res.json())
    .then(data => renderPosts(data))
    .catch(error => console.error('Error fetching posts:', error));
};

// Function to render the posts
const renderPosts = (posts) => {
  let output = "";
  posts.forEach(post => {
    output += `
      <div class="card mt-4 col-md-6 bg-light">
          <div class="card-body" data-id=${post.id}>
              <h5 class="card-title">${post.id}</h5>
              <h6 class="card-name mb-2 text-muted">${post.name}</h6>
              <a href="#" class="card-link edit-post">Edit</a>
              <a href="#" class="card-link delete-post">Delete</a>
          </div>
      </div>
      `;
  });
  postsList.innerHTML = output;
};

// Function to reset the form fields and show the Add Post button
const resetForm = () => {
  idValue.value = "";
  nameValue.value = "";
  showAddButton();
};

// Function to show the Update Post button and hide the Add Post button
const showUpdateButton = () => {
  updatePostButton.style.display = "block";
  btnSubmit.style.display = "none";
  cancelUpdateButton.style.display = "block";
};

// Function to show the Add Post button and hide the Update Post button
const showAddButton = () => {
  updatePostButton.style.display = "none";
  btnSubmit.style.display = "block";
  cancelUpdateButton.style.display = "none";
};

// Function to handle post updates
const updatePost = (postId, postData) => {
  fetch(`${url}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(() => {
      fetchPosts(); // After the update, fetch and render the updated posts
      resetForm(); // Reset the form and show the Add Post button again
    })
    .catch(error => console.error('Error updating post:', error));
};

// Event listener for Add Post form submission
addPostForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const postData = {
    id: idValue.value,
    name: nameValue.value
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(() => {
      fetchPosts(); // After adding a post, fetch and render the updated posts
      resetForm(); // Reset the form and show the Add Post button again
    })
    .catch(error => console.error('Error adding post:', error));
});

// Event listener for the Edit and Delete links in the post list
postsList.addEventListener('click', (e) => {
  e.preventDefault();
  const postId = e.target.parentElement.dataset.id;

  if (e.target.classList.contains("delete-post")) {
    // DELETE
    fetch(`${url}/${postId}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchPosts(); // After deleting a post, fetch and render the updated posts
      })
      .catch(error => console.error('Error deleting post:', error));
  } else if (e.target.classList.contains("edit-post")) {
    // EDIT
    const parent = e.target.parentElement;
    let idContent = parent.querySelector('.card-title').textContent;
    let nameContent = parent.querySelector('.card-name').textContent;

    idValue.value = idContent;
    nameValue.value = nameContent;
    showUpdateButton(); // Show the Update Post button

    // Update Post button click event listener for handling the update
    updatePostButton.addEventListener("click", (e) => {
      e.preventDefault();
      const updatedData = {
        id: idValue.value,
        name: nameValue.value
      };

      updatePost(postId, updatedData); // Call the updatePost function to handle the update
    });
  }
});

// Event listener for the Cancel Update button
cancelUpdateButton.addEventListener('click', () => {
  resetForm(); // Reset the form and show the Add Post button
});

// Fetch and render posts when the page loads
fetchPosts();