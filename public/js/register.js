const loginLink = document.querySelector(".loginLink");
const loginImage = document.querySelector(".login-image");
const registerContent = document.querySelector(".register-content");

loginLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginImage.classList.toggle("move-left");
    registerContent.classList.toggle("fade-out");
    setTimeout(() => {
        window.location.href = "login.html";
    }, 500);
});

document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector(".register-content");
    element.classList.add("animated");
});