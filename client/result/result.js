const score = 0

// Get HTML elements
const resultTitle = document.getElementById("result-title");
const scoreDisplay = document.getElementById("score-display");
const resultMessage = document.getElementById("result-message");
const resultButtons = document.getElementById("result-buttons");

// Check whether the score is valid
if (score === null || score < 0) {
    resultTitle.textContent = "No Game Result";

    scoreDisplay.textContent = "";

    resultMessage.textContent =
        "Please complete The Great Escape to see your score.";  
        
    resultButtons.innerHTML = `
            <a href="game.html" class="result-button">
                Play Again
            </a>

            <a href="dashboard.html" class="result-button">
                Back to Home
            </a>
        `;

} else {

    scoreDisplay.textContent = `Score: ${score}/10`;

    if (score === 10) {

        resultTitle.textContent = "Congratulations!";

        resultMessage.innerHTML = `
            You have answered all questions correctly
            and successfully escaped 1066!
            <br>
            You are now back in 2026.
        `;

        resultButtons.innerHTML = `
            <a href="" class="result-button">
                Play Again
            </a>

            <a href="../dashboard/dashboard.html" class="result-button">
                Back to Home
            </a>
        `;

    } else {

        resultTitle.textContent = "Game Over!";

        resultMessage.innerHTML = `
            You did not answer all the questions correctly.
            <br>
            You are still trapped in 1066!
        `;

        resultButtons.innerHTML = `
            <a href="" class="result-button">
                Try Again
            </a>

            <a href="" class="result-button">
                Go to Flashcards
            </a>
        `;
    }
}