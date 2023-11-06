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
        window.location.href = "/";
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

