const signUpButton = document.getElementById('sign-up-submit');

const signUpForm = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-create').value.trim();
    const password = document.querySelector('#password-create').value.trim();

    console.log(username + password);

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
           const error =await response.json()
           console.log(error);
     
           alert(error.message);
     
        }

    }
}

signUpButton.addEventListener('click', signUpForm);