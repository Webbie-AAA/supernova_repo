const buttons = document.querySelectorAll(".details-button");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        const answer = button.previousElementSibling;;

        answer.classList.toggle("show");

        if (answer.classList.contains("show")) {
            button.textContent = "Hide";
        } else {
            button.textContent = "Reveal";
        }
    });
});