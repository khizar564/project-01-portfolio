function showMessage() {
    alert("Project details coming soon!");
}


// ================= CONTACT FORM =================

const form = document.getElementById("contactForm");

form.addEventListener("submit", function() {

    const button = form.querySelector("button");

    button.textContent = "Sending...";
    button.disabled = true;

});


// ================= AI ASSISTANT =================

const aiButton = document.getElementById("aiButton");
const aiChat = document.getElementById("aiChat");
const closeAi = document.getElementById("closeAi");

const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");


// Open AI Chat

aiButton.addEventListener("click", function() {

    aiChat.classList.add("active");

    aiInput.focus();

});


// Close AI Chat

closeAi.addEventListener("click", function() {

    aiChat.classList.remove("active");

});


// Add message to chat

function addMessage(message, type) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
        "ai-message",
        type === "user" ? "user-message" : "bot-message"
    );

    messageElement.textContent = message;

    aiMessages.appendChild(messageElement);

    aiMessages.scrollTop = aiMessages.scrollHeight;
}


// AI Form Submit

aiForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const question = aiInput.value.trim();

    if (!question) {
        return;
    }


    // Show user's message

    addMessage(question, "user");

    aiInput.value = "";


    // Temporary loading message

    const loadingMessage = document.createElement("div");

    loadingMessage.classList.add(
        "ai-message",
        "bot-message"
    );

    loadingMessage.textContent = "Thinking...";

    aiMessages.appendChild(loadingMessage);

    aiMessages.scrollTop = aiMessages.scrollHeight;


    try {

        const response = await fetch("/api/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: question
            })

        });


        const data = await response.json();


        loadingMessage.remove();


        if (!response.ok) {

            addMessage(
                "Sorry, something went wrong. Please try again.",
                "bot"
            );

            return;
        }


        addMessage(
            data.reply,
            "bot"
        );


    } catch (error) {

        console.error(error);

        loadingMessage.remove();

        addMessage(
            "I couldn't connect to the AI right now. Please try again.",
            "bot"
        );

    }

});