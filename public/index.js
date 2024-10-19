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
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
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
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
                postsDiv.appendChild(postElement);
                postForm.reset();
            })
            .catch(error => console.error('Error creating post:', error));
    });
});