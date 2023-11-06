const registerLink = document.querySelector(".registerLink");
const loginImage = document.querySelector(".login-image");
const loginContent = document.querySelector(".login-content");

registerLink.addEventListener("click", (event) => {
    event.preventDefault();
    loginImage.classList.toggle("move-right");
    loginContent.classList.toggle("fade-out");
    setTimeout(() => {
        window.location.href = "/register";
    }, 500);
});

document.addEventListener("DOMContentLoaded", function() {
    const element = document.querySelector(".login-content");
    element.classList.add("animated");
});

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("error-message");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const loginUsername = document.getElementById("username").value;
        const loginPassword = document.getElementById("password").value;

        // Send a POST request to the login route
        fetch("/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: loginUsername, password: loginPassword }),
        })
        .then((response) => {
            if (response.status === 400) {
                // Handle the 400 error response
                return response.json().then((data) => {
                    message.innerText = "You enter wrong username or password";
                });
            } else if (response.ok) {
                // Handle successful login here
                
                return response.json().then((data) => {
                    if (data.usertype === "shipper") {
                        // Redirect to shipper page
                        message.innerText = "login successfully, redirect to shipper page";
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 500);
                    } else if (data.usertype === "seller") {
                        // Redirect to seller page
                        message.innerText = "login successfully, redirect to seller page";
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 500);
                    } else if (data.usertype === "custommer") {
                        // Redirect to custommer page
                        message.innerText = "login successfully, redirect to custommer page";
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 500);
                    }
    
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