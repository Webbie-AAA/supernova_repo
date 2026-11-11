/**
 * @jest-environment jsdom
 */

// Tests for game/game.js: playing through the quiz.
// (game.test.js checks what the page looks like when it first loads.
//  This file checks what happens when the student answers questions.)

const { runScript } = require("./helpers");

// The parts of gamePlay.html that game.js uses
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

let fakeWindow;  // stands in for the real window, so we can see where the page tries to go
let questions;   // the questions array from inside game.js

beforeEach(() => {
    document.body.innerHTML = pageHTML;
    fakeWindow = { location: { href: "gamePlay.html" } };
    ({ questions } = runScript("game/game.js", { window: fakeWindow }, ["questions"]));
});

// ---------- small helpers to make the tests read like a student playing ----------

function header() {
    return document.querySelector("#question-header h2").textContent;
}

function questionShown() {
    return document.querySelector("#question-section").textContent;
}

function optionText(letter) {
    return document.querySelector(`label[for="option-${letter}"] .option-text`).textContent;
}

function nextButton() {
    return document.querySelector("#next-btn");
}

// Tick an answer (A, B, C or D) and press Next
function answer(letter) {
    document.querySelector(`#option-${letter}`).checked = true;
    nextButton().click();
}

// The letter of the correct / a wrong answer for question number i (0 = Q1)
function correctLetter(i) {
    return questions[i].answers.find((a) => a.correct).option;
}
function wrongLetter(i) {
    return questions[i].answers.find((a) => !a.correct).option;
}


// ---------- the quiz content itself ----------

describe("The quiz questions", () => {
    test("there are 10 questions", () => {
        expect(questions).toHaveLength(10);
    });

    test("every question has some text", () => {
        questions.forEach((q) => {
            expect(q.question.trim()).not.toBe("");
        });
    });

    test("no question is repeated", () => {
        const texts = questions.map((q) => q.question);
        expect(new Set(texts).size).toBe(texts.length);
    });

    test("every question has exactly four answers, labelled A, B, C, D in order", () => {
        questions.forEach((q) => {
            expect(q.answers.map((a) => a.option)).toEqual(["A", "B", "C", "D"]);
        });
    });

    test("every answer has some text", () => {
        questions.forEach((q) => {
            q.answers.forEach((a) => expect(a.answer.trim()).not.toBe(""));
        });
    });

    test("every question has exactly one correct answer", () => {
        questions.forEach((q) => {
            const correctOnes = q.answers.filter((a) => a.correct === true);
            expect(correctOnes).toHaveLength(1);
        });
    });

    test("the correct answer is not always the same letter", () => {
        const letters = questions.map((q, i) => correctLetter(i));
        expect(new Set(letters).size).toBeGreaterThan(1);
    });
});


// ---------- pressing Next ----------

describe("Pressing Next without picking an answer", () => {
    test("stays on question 1", () => {
        nextButton().click();
        expect(header()).toBe("Question 1 of 10");
        expect(questionShown()).toBe(questions[0].question);
    });

    test("does not leave the page", () => {
        nextButton().click();
        expect(fakeWindow.location.href).toBe("gamePlay.html");
    });
});

describe("Picking an answer and pressing Next", () => {
    beforeEach(() => {
        answer("A");
    });

    test("moves on to question 2", () => {
        expect(header()).toBe("Question 2 of 10");
        expect(questionShown()).toBe(questions[1].question);
    });

    test("fills the progress bar to 20%", () => {
        expect(document.querySelector(".progress-fill").style.width).toBe("20%");
    });

    test("shows the four answers for question 2", () => {
        expect(optionText("A")).toBe(questions[1].answers[0].answer);
        expect(optionText("B")).toBe(questions[1].answers[1].answer);
        expect(optionText("C")).toBe(questions[1].answers[2].answer);
        expect(optionText("D")).toBe(questions[1].answers[3].answer);
    });

    test("clears the previous answer, so nothing is ticked", () => {
        expect(document.querySelector('input[name="answer"]:checked')).toBeNull();
    });

    test("does not leave the page yet", () => {
        expect(fakeWindow.location.href).toBe("gamePlay.html");
    });

    test("does not show the score on the page", () => {
        expect(document.body.textContent).not.toMatch(/score/i);
    });
});

describe("Moving through the quiz", () => {
    test("the progress bar goes up by 10% for each question", () => {
        for (let i = 0; i < 9; i++) {
            expect(document.querySelector(".progress-fill").style.width).toBe(`${(i + 1) * 10}%`);
            answer("A");
        }
        expect(document.querySelector(".progress-fill").style.width).toBe("100%");
    });

    test("the button says Next on questions 1 to 9", () => {
        for (let i = 0; i < 9; i++) {
            expect(nextButton().textContent).toBe("Next");
            answer("A");
        }
    });

    test("the button says Finish on question 10", () => {
        for (let i = 0; i < 9; i++) answer("A");
        expect(header()).toBe("Question 10 of 10");
        expect(nextButton().textContent).toBe("Finish");
    });

    test("pressing Finish without picking an answer does nothing", () => {
        for (let i = 0; i < 9; i++) answer("A");
        nextButton().click();
        expect(fakeWindow.location.href).toBe("gamePlay.html");
        expect(header()).toBe("Question 10 of 10");
    });
});


// ---------- finishing and the score ----------

describe("Finishing the quiz", () => {
    test("all correct answers sends the student to the results page with 10/10", () => {
        questions.forEach((q, i) => answer(correctLetter(i)));
        expect(fakeWindow.location.href).toBe("results.html?score=10&total=10");
    });

    test("all wrong answers sends the student to the results page with 0/10", () => {
        questions.forEach((q, i) => answer(wrongLetter(i)));
        expect(fakeWindow.location.href).toBe("results.html?score=0&total=10");
    });

    test("7 right and 3 wrong gives a score of 7", () => {
        questions.forEach((q, i) => {
            answer(i < 7 ? correctLetter(i) : wrongLetter(i));
        });
        expect(fakeWindow.location.href).toBe("results.html?score=7&total=10");
    });

    test("only the last answer counts for each question (changing your mind is fine)", () => {
        // Tick a wrong answer, change to the right one, then press Next
        questions.forEach((q, i) => {
            document.querySelector(`#option-${wrongLetter(i)}`).checked = true;
            answer(correctLetter(i));
        });
        expect(fakeWindow.location.href).toBe("results.html?score=10&total=10");
    });

    test("pressing Next with nothing ticked does not add to the score", () => {
        questions.forEach((q, i) => {
            nextButton().click(); // ignored
            answer(wrongLetter(i));
        });
        expect(fakeWindow.location.href).toBe("results.html?score=0&total=10");
    });
});
