const registerLink = document.querySelector(".registerLink");
const loginImage = document.querySelector(".login-image");
const loginContent = document.querySelector(".login-content");

registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginImage.classList.toggle("move-right");
    loginContent.classList.toggle("fade-out");
    setTimeout(() => {
        window.location.href = "register.html";
    }, 500);
});

document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector(".login-content");
    element.classList.add("animated");
});