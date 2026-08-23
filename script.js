function showMessage() {
    alert("Project details coming soon!");
}


const form = document.getElementById("contactForm");

form.addEventListener("submit", function() {

    const button = form.querySelector("button");

    button.textContent = "Sending...";
    button.disabled = true;

});