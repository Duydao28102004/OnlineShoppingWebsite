const loginLink = document.querySelector(".loginLink");
const loginImage = document.querySelector(".login-image");
const registerContent = document.querySelector(".register-content");
const usernameInput = document.getElementById("username");
const usernameError = document.getElementById("username-error");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password-error");


loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginImage.classList.toggle("move-left");
    registerContent.classList.toggle("fade-out");
    setTimeout(() => {
        window.location.href = "/login";
    }, 500);
});

document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector(".register-content");
    element.classList.add("animated");
});

usernameInput.addEventListener("input", () => {
    if (usernameInput.value.length < 9) {
        usernameError.textContent = "Username must be at least 9 characters long";
    } else {
        usernameError.textContent = "";
    }
});

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    if (!uppercaseRegex.test(password) && !numberRegex.test(password)) {
        passwordError.textContent = "Password must containt at least one uppercase letter and one number";
    } else {
        if (!uppercaseRegex.test(password)) {
            passwordError.textContent = "Password must contain at least one uppercase letter ";
        } else {
            if (!numberRegex.test(password)) {
                passwordError.textContent = "Password must containt at least one number";
            } else {
                passwordError.textContent = "";
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const message = document.getElementById("error-message");


    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const registerUsername = document.getElementById("username").value;
        const registerPassword = document.getElementById("password").value;
        const registerUsertype = document.getElementById("usertype").value;

        // Send a POST request to the register route
        fetch("/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: registerUsername, password: registerPassword, usertype: registerUsertype }),
        })
        .then((response) => {
            if (response.ok) {
                // Handle successful register here
                message.innerText = "register successfully";
                return response.json().then((data) => {
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1000);
                    // Redirect to a different page or display a success message
                });
            } else {
                // Handle other non-400 errors
                console.error("Error:", response.status);
            }
        })
        .catch((error) => {
            console.error("Network Error:", error);
        });
    });
});

