const questions = [
    {
        question: "On what date was the Battle of Hastings fought?",
        answers: [
            { option: "A", answer: "25 September 1066", correct: false },
            { option: "B", answer: "14 October 1066", correct: true },
            { option: "C", answer: "25 December 1066", correct: false },
            { option: "D", answer: "5 January 1066", correct: false },
        ],
    },
    {
        question: "Why was there a succession crisis in 1066?",
        answers: [
            { option: "A", answer: "Harold Godwinson was overthrown", correct: false },
            { option: "B", answer: "The Pope removed the king", correct: false },
            { option: "C", answer: "Edward the Confessor died with no children", correct: true },
            { option: "D", answer: "The Vikings captured London", correct: false },
        ],
    },
    {
        question: "Which of these supported Harold Godwinson's claim to the throne?",
        answers: [
            { option: "A", answer: "He was chosen by the Witan", correct: true },
            { option: "B", answer: "The Pope sent him a banner", correct: false },
            { option: "C", answer: "He was Edward's closest blood relative", correct: false },
            { option: "D", answer: "He won the Battle of Hastings", correct: false },
        ],
    },
    {
        question: "William of Normandy said Harold had broken a promise. What was it?",
        answers: [
            { option: "A", answer: "To pay William gold", correct: false },
            { option: "B", answer: "To marry William's daughter", correct: false },
            { option: "C", answer: "To give William the city of York", correct: false },
            { option: "D", answer: "An oath, sworn on holy relics, to support William's claim", correct: true },
        ],
    },
    {
        question: "Who did Harold defeat at the Battle of Stamford Bridge?",
        answers: [
            { option: "A", answer: "William of Normandy", correct: false },
            { option: "B", answer: "Harald Hardrada", correct: true },
            { option: "C", answer: "Edgar Ætheling", correct: false },
            { option: "D", answer: "Earls Edwin and Morcar", correct: false },
        ],
    },
    {
        question: "Where did William's army land in England?",
        answers: [
            { option: "A", answer: "Dover", correct: false },
            { option: "B", answer: "York", correct: false },
            { option: "C", answer: "Pevensey", correct: true },
            { option: "D", answer: "London", correct: false },
        ],
    },
    {
        question: "What tactic did the English army use on Senlac Hill?",
        answers: [
            { option: "A", answer: "The shield wall", correct: true },
            { option: "B", answer: "Cavalry charges", correct: false },
            { option: "C", answer: "Building a castle", correct: false },
            { option: "D", answer: "A night attack", correct: false },
        ],
    },
    {
        question: "Who were the housecarls?",
        answers: [
            { option: "A", answer: "Part-time farmer soldiers", correct: false },
            { option: "B", answer: "Norman archers", correct: false },
            { option: "C", answer: "Monks who wrote chronicles", correct: false },
            { option: "D", answer: "Full-time, trained English soldiers", correct: true },
        ],
    },
    {
        question: "How did the Normans' feigned retreats help them win?",
        answers: [
            { option: "A", answer: "They gave the Normans time to rest", correct: false },
            { option: "B", answer: "They drew English soldiers away from the shield wall", correct: true },
            { option: "C", answer: "They made Harold surrender", correct: false },
            { option: "D", answer: "They let the Normans reach their ships", correct: false },
        ],
    },
    {
        question: "Why might historians treat the Bayeux Tapestry with caution?",
        answers: [
            { option: "A", answer: "It was made hundreds of years later", correct: false },
            { option: "B", answer: "It was made in Norway", correct: false },
            { option: "C", answer: "It was probably commissioned by William's half-brother, so it shows a Norman view", correct: true },
            { option: "D", answer: "It contains no pictures of the battle", correct: false },
        ],
    },
];


const headerTitle = document.querySelector("#question-header h2");
const progressFill = document.querySelector(".progress-fill");
const questionText = document.querySelector("#question-section");
const form = document.querySelector("#multiple-choice-section form");
const nextBtn = document.querySelector("#next-btn");

const RESULTS_PAGE = "../result/result.html";

let currentIndex = 0;  // which question is showing (0 = question 1)
let score = 0;         // kept in the background, not shown on this page

function showQuestion() {
    const current = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;

    headerTitle.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    progressFill.style.width = `${((currentIndex + 1) / questions.length) * 100}%`;
    questionText.textContent = current.question;

    current.answers.forEach((ans) => {
        const label = document.querySelector(`label[for="option-${ans.option}"] .option-text`);
        label.textContent = ans.answer;
    });

    form.reset();

    nextBtn.textContent = isLastQuestion ? "Finish" : "Next";
}


nextBtn.addEventListener("click", () => {
    // Find the ticked radio in the "answer" group
    const selected = form.querySelector('input[name="answer"]:checked');
    if (!selected) return; // no answer picked yet, so do nothing

    // Add 1 to the score if the picked option is the correct one
    const current = questions[currentIndex];
    const chosen = current.answers.find((ans) => ans.option === selected.value);
    if (chosen.correct) score++;

    if (currentIndex < questions.length - 1) {
        // Not the last question: show the next one
        currentIndex++;
        showQuestion();
    } else {
        // Finish: go to the results page, passing the score in the URL
        // e.g. results.html?score=7&total=10
        window.location.href = `${RESULTS_PAGE}?score=${score}&total=${questions.length}`;
    }
});


// Start the quiz
showQuestion();

module.exports = score;