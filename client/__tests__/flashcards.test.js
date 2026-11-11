/**
 * @jest-environment jsdom
 */

// Tests for flashcards/flashcards.js: turning flashcard data into cards on the page.

const { runScript } = require("./helpers");

let displayFlashcards;

const sampleCards = [
    {
        question: "When was the Battle of Hastings?",
        answer: "14 October 1066",
        explanation: "It was fought on Senlac Hill.",
    },
    {
        question: "What was the shield wall?",
        answer: "The English tactic of locking shields together in a line",
        explanation: "It held off the Normans for most of the day.",
    },
];

function container() {
    return document.getElementById("flashcards-container");
}

beforeEach(() => {
    document.body.innerHTML = `<div class="row g-4" id="flashcards-container"></div>`;
    ({ displayFlashcards } = runScript("flashcards/flashcards.js", {}, ["displayFlashcards"]));
});


describe("Loading flashcards.js", () => {
    test("does not add any cards by itself", () => {
        expect(container().children).toHaveLength(0);
    });
});

describe("displayFlashcards", () => {
    test("adds one card for each flashcard", () => {
        displayFlashcards(sampleCards);
        expect(container().querySelectorAll(".topic-card")).toHaveLength(2);
    });

    test("each card sits in a half-width Bootstrap column", () => {
        displayFlashcards(sampleCards);
        [...container().children].forEach((col) => {
            expect(col.className).toBe("col-md-6");
        });
    });

    test("shows the question as the card heading", () => {
        displayFlashcards(sampleCards);
        const headings = [...container().querySelectorAll("h2")].map((h) => h.textContent);
        expect(headings).toEqual([sampleCards[0].question, sampleCards[1].question]);
    });

    test("puts the answer and explanation in the answer section", () => {
        displayFlashcards(sampleCards);
        const firstAnswer = container().querySelectorAll(".flashcard-answer")[0];
        const paragraphs = firstAnswer.querySelectorAll("p");
        expect(paragraphs[0].textContent).toBe("14 October 1066");
        expect(paragraphs[1].textContent).toBe("It was fought on Senlac Hill.");
    });

    test("each card has a Reveal button", () => {
        displayFlashcards(sampleCards);
        const buttons = container().querySelectorAll("button.details-button");
        expect(buttons).toHaveLength(2);
        buttons.forEach((b) => expect(b.textContent).toBe("Reveal"));
    });

    test("leaves the explanation blank if a card doesn't have one", () => {
        displayFlashcards([{ question: "Q?", answer: "A" }]);
        const paragraphs = container().querySelectorAll(".flashcard-answer p");
        expect(paragraphs[1].textContent).toBe("");
        expect(container().textContent).not.toMatch(/undefined|null/);
    });

    test("clears old cards before showing new ones", () => {
        displayFlashcards(sampleCards);
        displayFlashcards([sampleCards[0]]);
        expect(container().querySelectorAll(".topic-card")).toHaveLength(1);
    });

    test("an empty list shows no cards", () => {
        displayFlashcards(sampleCards);
        displayFlashcards([]);
        expect(container().children).toHaveLength(0);
    });
});
