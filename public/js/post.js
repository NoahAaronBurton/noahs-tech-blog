// create post in mysql server
const postButton = document.getElementById('create-post');

const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();

    console.log(title, text);

    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, text }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create post');
        }
    }
}

document
    .querySelector('#post-form')
    .addEventListener('submit', createPost);