/**
 * @jest-environment jsdom
 */

// Tests for result/result.js: the page shown after the quiz.
//
// Right now result.js has `const score = 0` at the top, so it always shows
// the "score 0" result. The tests below check what it does today, and the
// "Known gaps" section at the bottom describes what it should do once it
// reads the real score from the URL (game.js sends ?score=7&total=10).

// The parts of result.html that result.js uses
const pageHTML = `
    <h1 id="result-title">Game Complete!</h1>
    <h2 id="score-display">Score: 0/10</h2>
    <p id="result-message"></p>
    <div class="result-buttons" id="result-buttons"></div>
`;

function text(id) {
    return document.getElementById(id).textContent;
}

function buttonLabels() {
    return [...document.querySelectorAll("#result-buttons a")].map((a) => a.textContent.trim());
}

// Load result.js as if the browser opened result.html with this URL query
function loadPage(query = "") {
    document.body.innerHTML = pageHTML;
    window.history.replaceState({}, "", `/result.html${query}`);
    jest.resetModules();
    require("../result/result.js");
}


describe("Result page with a score of 0 (how it works today)", () => {
    beforeEach(() => loadPage());

    test("shows the score out of 10", () => {
        expect(text("score-display")).toBe("Score: 0/10");
    });

    test("the title says Game Over!", () => {
        expect(text("result-title")).toBe("Game Over!");
    });

    test("tells the student they are still trapped in 1066", () => {
        expect(text("result-message")).toMatch(/still trapped in 1066/);
    });

    test("offers Try Again and Go to Flashcards buttons", () => {
        expect(buttonLabels()).toEqual(["Try Again", "Go to Flashcards"]);
    });

    test("every button is styled as a result button", () => {
        document.querySelectorAll("#result-buttons a").forEach((a) => {
            expect(a.classList.contains("result-button")).toBe(true);
        });
    });
});


// These describe how the page SHOULD behave but doesn't yet.
// test.failing means "we expect this to fail right now".
// When someone fixes it, Jest will flag it - then change test.failing to test.
describe("Known gaps (not built yet)", () => {
    test.failing("reads the score from the URL", () => {
        loadPage("?score=7&total=10");
        expect(text("score-display")).toBe("Score: 7/10");
    });

    test.failing("a perfect score shows Congratulations!", () => {
        loadPage("?score=10&total=10");
        expect(text("result-title")).toBe("Congratulations!");
        expect(text("result-message")).toMatch(/escaped 1066/);
        expect(buttonLabels()).toEqual(["Play Again", "Back to Home"]);
    });

    test.failing("no score in the URL shows No Game Result", () => {
        loadPage("");
        expect(text("result-title")).toBe("No Game Result");
    });

    test.failing("the Go to Flashcards button links to the flashcards page", () => {
        loadPage("?score=3&total=10");
        const link = [...document.querySelectorAll("#result-buttons a")]
            .find((a) => a.textContent.includes("Flashcards"));
        expect(link.getAttribute("href")).toMatch(/flashcards\.html$/);
    });
});
