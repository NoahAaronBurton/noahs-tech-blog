const submitButton = document.getElementById('submit');

const logInForm = async (event) =>{
    console.log('button clicked!')
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }), //* this is where req.body is defined on the front end
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('failed to log in')
        }
    }
};

document
    .querySelector('.form.ui.large.form')
    .addEventListener('submit', logInForm);

