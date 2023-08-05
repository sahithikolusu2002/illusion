// JavaScript code to handle the signup form and the overlay

// Get references to the elements
const loginForm = document.querySelector(".login-form");
const signupForm = document.querySelector(".signup-form");
const signupBtn = document.querySelector(".signup-btn");
const overlay = document.querySelector(".overlay");

// Add event listener to the signup button to show the signup form and blur the background
signupBtn.addEventListener("click", () => {
    signupForm.classList.add("visible");
    loginForm.classList.add("hidden");
    overlay.style.display = "block";
});

// Add event listener to the "LET'S GO" button in the signup form to hide the signup form and unblur the background
const letsGoBtn = signupForm.querySelector(".submit");
letsGoBtn.addEventListener("click", () => {
    signupForm.classList.remove("visible");
    loginForm.classList.remove("hidden");
    overlay.style.display = "none";
});
