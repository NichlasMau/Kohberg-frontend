document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();


        const username = document.getElementById('floatingInput').value;
        const password = document.getElementById('floatingPassword').value;

        const loginData = {
            username: username,
            password: password
        };

        fetch('https://kohberg-backend.azurewebsites.net/login', 
           {
                method: "POST",
                body: JSON.stringify(loginData),
                headers:{'content-type': 'application/json'}
            })
            .then(function (res) {
                return res.json();
            })
            .then(function (res) {
                if(res.token == "bad credentials") {
                    const existingErrorMessages = document.querySelectorAll('.error-message');
                    existingErrorMessages.forEach(errorMessage => {
                        errorMessage.remove();
                    });

                    const errorMessage = document.createElement('p');
                    errorMessage.textContent = 'Incorrect username or password. Please try again.';
                    errorMessage.classList.add('error-message');
                    errorMessage.style.color = 'red';
                    loginForm.appendChild(errorMessage);
                } else { 
                    localStorage.setItem('user', JSON.stringify(res));
                    window.location.href = 'index.html'
                }
            })
    });
});