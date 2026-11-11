const container = document.getElementById("flashcards-container");

function displayFlashcards(flashcards) {
    container.innerHTML = "";

    flashcards.forEach((flashcard) => {
        const card = document.createElement("div");

        card.className = "col-md-6";

        card.innerHTML = `
            <div class="topic-card">
                <h2>${flashcard.question}</h2>
                <div class="flashcard-answer">
                    <p>${flashcard.answer}</p>
                    <p>${flashcard.explanation || ""}</p>
                </div>
                <button class="details-button">Reveal</button>
            </div>
        `;

        container.appendChild(card);
    });
}