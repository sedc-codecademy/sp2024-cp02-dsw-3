document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("login-form");

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");

    const apiUrl = "https://api.json-generator.com/templates/vb7CIuRtdogD/data?access_token=pi1rmg2aimvoswzppnnyp322m4pm5xw7v9kj3fqq";

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (password.length < 8) {
            passwordError.textContent = "Password must be at least 8 characters long.";
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    }

    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            const userData = {
                email: emailInput.value,
                password: passwordInput.value
            };

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const user = data.find(user => user.email === userData.email && user.password === userData.password);

                    if (user) {
                        localStorage.setItem('user-creds', JSON.stringify({email: user.email, fullName: user.fullName}));
                        window.location.href="./salePage.html"
                    } else {
                        alert("Invalid email or password.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching API data:", error);
                });
        } else {
            alert("Please fix the errors in the form before submitting.");
        }
    });
});