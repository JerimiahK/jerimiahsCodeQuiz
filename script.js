const questions = [
  {
    question: "What company makes the Black Beauty snare drum?",
    answers: [
      { text: "Tama", correct: false },
      { text: "Ludwig", correct: true },
      { text: "DW", correct: false },
      { text: "Gretsch", correct: false },
    ],
  },
  {
    question: "Who was the drummer for Led Zeppelin?",
    answers: [
      { text: "John Bohnam", correct: true },
      { text: "Tommy Lee", correct: false },
      { text: "Neil Peart", correct: false },
      { text: "Keith Moon", correct: false },
    ],
  },
  {
    question: "What drum company was Neil Peart endorsed by?",
    answers: [
      { text: "Sonor", correct: false },
      { text: "Tama", correct: false },
      { text: "Yamaha", correct: false },
      { text: "DW", correct: true },
    ],
  },
  {
    question: "What cymbal company makes the Byzance line?",
    answers: [
      { text: "Sabian", correct: false },
      { text: "Zildjian", correct: false },
      { text: "Istanbul", correct: false },
      { text: "Meinl", correct: true },
    ],
  },
  {
    question: "Who invented the Purdie Shuffle?",
    answers: [
      { text: "Bernard Purdie", correct: true },
      { text: "Billy Cobham", correct: false },
      { text: "Jeff Porcaro", correct: false },
      { text: "Phil Collins", correct: false },
    ],
  },
];
const welcome = document.querySelector("#welcome");
const startBtn = document.querySelector("#start-button");
const nextBtn = document.querySelector("#next-button");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const timeBox = document.querySelector(".timebox");
var secondsLeft = 75;
let randomQuestion, randomQuestionIndex;

//~~~~~~~~~~~~~~~EVENT LISTENERS FOR BUTTONS~~~~~~~~~~~~~~~~~~~
//Adds an Event Listener to the Start Quiz button to initiate the startGame function.
startBtn.addEventListener("click", startGame);


nextBtn.addEventListener("click", () => {
  randomQuestionIndex++;
  
  nextQuestion();
});

// ~~~~~~~~~~~~~FUNCTIONS TO CONTROL THE GAME~~~~~~~~~~~~~~~~~~
// Starts the game and hides the start button and welcome screen, and kicks off the countDown and nextQuestion functions.
function startGame() {
  startBtn.classList.add("hide");
  welcome.classList.add("hide");
  questionContainer.classList.remove("hide");
  // nextBtn.classList.remove("hide");
  randomQuestion = questions.sort(() => Math.random() - 0.5);
  randomQuestionIndex = 0;
  countDown();
  nextQuestion();
}

// Calls the showQuestion and resetState functions
function nextQuestion() {
  showQuestion(randomQuestion[randomQuestionIndex]);
  resetState();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("button");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    questionContainer.appendChild(button);
  });
}

function resetState() {
  nextBtn.classList.add("hide");
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const pressedButton = event.target;
  const correct = pressedButton.dataset.correct;
  if (correct) {
    nextBtn.classList.remove("hide");
  } else {
    secondsLeft -= 7;
  }
}

//timer
function countDown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeBox.textContent = "Time Left: " + secondsLeft;
    console.log();
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      displayMessage();
    }
  }, 1000);
}
