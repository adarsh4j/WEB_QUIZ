const questions = [
    {
        question: "BORDER attributes specifies the?",
        answers: [
            { text:" thickness of the border around the table", correct: true},
            { text:" space between two borders", correct: false},
            { text:" space between two cells", correct: false},
            { text:" width of the table", correct: false}
        ]
    },
    {
        question: "The item present within the angled brackets in an HTML tag is?",
        answers: [
            { text:"identifier", correct: true},
            { text:"data", correct: false},
            { text:"tags", correct: false},
            { text:"text", correct: false}
        ]
    },
    {
        question: "The tag that creates the command button control is?",
        answers: [
            { text:"<FORM>", correct:false},
            { text:"<BUTTON>", correct: false},
            { text:"<INPUT>", correct: true},
            { text:"<HTML>", correct: false}
        ]
    },
    {
        question: "The tag used to create table in HTML is?",
        answers: [
            { text:"<TR>", correct:false},
            { text:"<TABLE>", correct: true},
            { text:" <TD>", correct: false},
            { text:"<DD>", correct: false}
        ]
    },
    {
        question: "When the mouse is clicked on a link, it is called as?",
        answers: [
            { text:"a default link", correct:false},
            { text:"an active link", correct: true},
            { text:"a link", correct: false},
            { text:" an event", correct: false}
        ]
    },
    {
        question: "To view the HTML code created by the Frontpage?",
        answers: [
            { text:"double click on HTML and select View", correct:false},
            { text:" double click on View and select HTML", correct: false},
            { text:" click on View and select HTML", correct: true},
            { text:"click on HTML and select View", correct: false}
        ]
    },
    {
        question: "Which HTML element is used to define the title of a document?",
        answers: [
            { text:"<meta>", correct:false},
            { text:" <head>", correct: false},
            { text:"<title>", correct: true},
            { text:"<header>", correct: false}
        ]
    },
    {
        question: "What does the 'float' property do in CSS?",
        answers: [
            { text:"Aligns elements side by side", correct:true},
            { text:"Changes the color of elements", correct: false},
            { text:"Centers elements vertically", correct: false},
            { text:" Removes elements from the document flow", correct: false}
        ]
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        answers: [
            { text:"pop()", correct:true},
            { text:"remove()", correct: false},
            { text:"delete()", correct:false},
            { text:"trim()", correct: false}
        ]
    },
    {
        question: "What is the default HTTP method used by HTML forms?",
        answers: [
            { text:"POST", correct:false},
            { text:"PUT", correct: false},
            { text:"GET", correct: true},
            { text:"DELETE", correct: false}
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("Next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + " . " + currentQuestion.question;

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerText = answers.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();