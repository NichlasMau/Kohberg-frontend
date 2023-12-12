document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('floatingInput').value;
        const password = document.getElementById('floatingPassword').value;

        const loginData = {
            email: email,
            password: password
        };

        fetch('https://kohberg-backend.azurewebsites.net/leader/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = 'index.html';
            } else {
                const existingErrorMessages = document.querySelectorAll('.error-message');
                existingErrorMessages.forEach(errorMessage => {
                    errorMessage.remove();
                });

                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Incorrect email or password. Please try again.';
                errorMessage.classList.add('error-message');
                errorMessage.style.color = 'red';
                loginForm.appendChild(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});