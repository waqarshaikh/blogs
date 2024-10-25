document.addEventListener('DOMContentLoaded', () => {
    const postForm = document.getElementById('postForm');
    const postsDiv = document.getElementById('posts');

    // Fetch and display posts
    fetch('/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="editPost('${post._id}')">Edit</button>
                    <button onclick="deletePost('${post._id}')">Delete</button>
                `;
                postsDiv.appendChild(postElement);
            });
        })
        .catch(error => console.error('Error fetching posts:', error));

    // Handle form submission
    postForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(postForm);
        const postData = {
            title: formData.get('title'),
            content: formData.get('content')
        };

        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post-card';
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <button onclick="editPost('${post._id}')">Edit</button>
                    <button onclick="deletePost('${post._id}')">Delete</button>
                `;
                postsDiv.appendChild(postElement);
                postForm.reset();
            })
            .catch(error => console.error('Error creating post:', error));
    });
});

function editPost(id) {
    const title = prompt('Enter new title:');
    const content = prompt('Enter new content:');
    if (title && content) {
        fetch(`/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
            .then(response => response.json())
            .then(post => {
                location.reload();
            })
            .catch(error => console.error('Error updating post:', error));
    }
}

function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
        fetch(`/posts/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(result => {
                location.reload();
            })
            .catch(error => console.error('Error deleting post:', error));
    }
}