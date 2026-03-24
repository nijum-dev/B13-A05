const form = document.querySelector("form");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const username = document.getElementById("input-username").value;
    const password = document.getElementById("input-password").value;

    if (username === "admin" && password === "admin123") {

        window.location.href = "home.html";

    } else {

        alert("Invalid Username or Password");

    }

});