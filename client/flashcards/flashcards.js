const container = document.querySelector("#flashcards-container");

async function loadFlashcards() {
    container.textContent = "Loading flashcards...";

    try {
        const response = await fetch("http://localhost:3000/flashcards");

        if (!response.ok) {
            throw new Error("Failed to load flashcards");
        }

        const flashcards = await response.json();

        if (!Array.isArray(flashcards)) {
            throw new Error("Invalid flashcard data received");
        }

        container.replaceChildren();

        if (flashcards.length === 0) {
            container.textContent = "No flashcards available.";
            return;
        }

        flashcards.forEach(flashcard => {
            const column = document.createElement("div");
            column.classList.add("col-md-6");

            const card = document.createElement("div");
            card.classList.add("topic-card");

            const question = document.createElement("h2");
            question.textContent = flashcard.question;

            const answer = document.createElement("div");
            answer.classList.add("flashcard-answer");

            const answerHeading = document.createElement("h3");
            answerHeading.textContent = flashcard.answer;

            const explanation = document.createElement("p");
            explanation.textContent = flashcard.explanation || "";

            const button = document.createElement("button");
            button.classList.add("details-button");
            button.type = "button";
            button.textContent = "Reveal";
            button.setAttribute("aria-expanded", "false");

            answer.appendChild(answerHeading);
            answer.appendChild(explanation);

            card.appendChild(question);
            card.appendChild(answer);
            card.appendChild(button);

            column.appendChild(card);
            container.appendChild(column);
        });

    } catch (error) {
        console.error("Error loading flashcards:", error);
        container.textContent = "Unable to load flashcards. Please try again later.";
    }
}

container.addEventListener("click", event => {
    const button = event.target.closest(".details-button");

    if (!button) {
        return;
    }

    const answer = button.previousElementSibling;

    answer.classList.toggle("show");

    const isOpen = answer.classList.contains("show");

    button.textContent = isOpen ? "Hide" : "Reveal";
    button.setAttribute("aria-expanded", String(isOpen));
});

loadFlashcards();