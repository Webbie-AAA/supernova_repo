/**
 * @jest-environment jsdom
 */

// Tests for gamePlay.js: what the student sees when the quiz first loads.
// Put this file in a __tests__ folder next to gamePlay.js.

// The parts of gamePlay.html that gamePlay.js uses
const pageHTML = `
    <section id="question-header">
        <h2></h2>
        <div class="progress-track"><div class="progress-fill"></div></div>
    </section>

    <section id="question-section"></section>

    <section id="multiple-choice-section">
        <form>
            <label class="option" for="option-A">
                <input type="radio" id="option-A" name="answer" value="A">
                <span class="option-text"></span>
            </label>
            <label class="option" for="option-B">
                <input type="radio" id="option-B" name="answer" value="B">
                <span class="option-text"></span>
            </label>
            <label class="option" for="option-C">
                <input type="radio" id="option-C" name="answer" value="C">
                <span class="option-text"></span>
            </label>
            <label class="option" for="option-D">
                <input type="radio" id="option-D" name="answer" value="D">
                <span class="option-text"></span>
            </label>
        </form>
    </section>

    <button id="next-btn" type="button">Next</button>
`;

// Helper: text of the label for option A, B, C or D
function optionText(letter) {
    return document.querySelector(`label[for="option-${letter}"] .option-text`).textContent;
}

// Build the page, then run gamePlay.js fresh before every test
beforeEach(() => {
    document.body.innerHTML = pageHTML;
    jest.resetModules();
    require("../game/game.js");
});


describe("When the quiz loads", () => {
    test("the header shows Question 1 of 10", () => {
        const header = document.querySelector("#question-header h2");
        expect(header.textContent).toBe("Question 1 of 10");
    });

    test("the progress bar is filled to 10%", () => {
        const progress = document.querySelector(".progress-fill");
        expect(progress.style.width).toBe("10%");
    });

    test("the first question is shown", () => {
        const question = document.querySelector("#question-section");
        expect(question.textContent).toBe("On what date was the Battle of Hastings fought?");
    });

    test("the four answers for question 1 are shown in the right order", () => {
        expect(optionText("A")).toBe("25 September 1066");
        expect(optionText("B")).toBe("14 October 1066");
        expect(optionText("C")).toBe("25 December 1066");
        expect(optionText("D")).toBe("5 January 1066");
    });

    test("no answer is selected yet", () => {
        const selected = document.querySelector('input[name="answer"]:checked');
        expect(selected).toBeNull();
    });

    test("the button says Next, not Finish", () => {
        const button = document.querySelector("#next-btn");
        expect(button.textContent).toBe("Next");
    });

    test("the score is not shown anywhere on the page", () => {
        expect(document.body.textContent).not.toMatch(/score/i);
    });
});