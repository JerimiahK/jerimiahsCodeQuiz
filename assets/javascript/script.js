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
  {
    question: "What company makes the StarClassic line?",
    answers: [
      { text: "Mapex", correct: false },
      { text: "Rogers", correct: false },
      { text: "Tama", correct: true },
      { text: "Sonor", correct: false },
    ],
  },
  {
    question: "Who is the drummer for Metallica?",
    answers: [
      { text: "Dave Lombardo", correct: false },
      { text: "Mike Portnoy", correct: false },
      { text: "Nicko McBrain", correct: false },
      { text: "Lars Ulrich", correct: true },
    ],
  },
  {
    question: "What are the crashing metal disks that you hit called?",
    answers: [
      { text: "Toms", correct: false },
      { text: "Snare", correct: false },
      { text: "Cymbals", correct: true },
      { text: "Bass Drum", correct: false },
    ],
  },
  {
    question: "What cymbal company makes the AAX line?",
    answers: [
      { text: "Sabian", correct: true },
      { text: "Dream", correct: false },
      { text: "Meinl", correct: false },
      { text: "Zildjian", correct: false },
    ],
  },
  {
    question: "What is the typical diameter of a snare drum?",
    answers: [
      { text: "16 inces", correct: false },
      { text: "14 inches", correct: true },
      { text: "12 inches", correct: false },
      { text: "10 inches", correct: false },
    ],
  },
  {
    question: "Who is the drummer for Periphery?",
    answers: [
      { text: "Joey Jordison", correct: false },
      { text: "Mike Malyan", correct: false },
      { text: "Matt Halpern", correct: true },
      { text: "Jay Postones", correct: false },
    ],
  },
  {
    question: "What drum companies vintage kits featured a round badge??",
    answers: [
      { text: "Ludwig", correct: false },
      { text: "Rogers", correct: false },
      { text: "Yamaha", correct: false },
      { text: "Gretsch", correct: true },
    ],
  },
  {
    question: "What band features a drummer with only one arm?",
    answers: [
      { text: "Metallica", correct: false },
      { text: "Def Leppard", correct: true },
      { text: "Motley Crue", correct: false },
      { text: "Bon Jovi", correct: false },
    ],
  },
  {
    question: "What band is Travis Barker in?",
    answers: [
      { text: "Falling in Reverse", correct: false },
      { text: "My Chemical Romance", correct: false },
      { text: "Fall Out Boy", correct: false },
      { text: "Blink-182", correct: true },
    ],
  },
  {
    question:
      "What was the name of Phil Collins song with the famous drum roll?",
    answers: [
      { text: "You'll Be in My Heart", correct: false },
      { text: "Dont Stop Believin", correct: false },
      { text: "Sweet Caroline", correct: false },
      { text: "In The Air Tonight", correct: true },
    ],
  },
];
const welcome = document.querySelector("#welcome");
const startBtn = document.querySelector("#start-button");
const nextBtn = document.querySelector("#next-button");
const questionContainer = document.querySelector("#question-container");
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const endMessage = document.querySelector("#game-over");
const submitBtn = document.querySelector("#submit-button");
const highScoresPage = document.querySelector("#high-scores");
const timeBox = document.querySelector(".timebox");
const scoreBox = document.querySelector(".score-box");
const finalScore = document.querySelector("#final-score");
var userScore = 0;
var secondsLeft = 65;
var userScoreData = localStorage.getItem("score");
let randomQuestion, randomQuestionIndex;

//~~~~~~~~~~~~EVENT LISTENERS FOR BUTTONS~~~~~~~~~~~~~~~~~

// adds an Event Listener to the Start Quiz button to initiate the startGame function.
startBtn.addEventListener("click", startGame);

// adds an Event Listener to the Next Button to call the nextQuestion function and grabs the next question from the RandomQuestionIndex array.
nextBtn.addEventListener("click", () => {
  randomQuestionIndex++;
  nextQuestion();
});

// adds an Event Listener to the Submit Button to call the high score function.
submitBtn.addEventListener("click", highScore);

// ~~~~~~~~~~~~~FUNCTIONS TO CONTROL THE GAME~~~~~~~~~~~~~~~~~~
// starts the game and hides the start button and welcome screen, and kicks off the countDown and nextQuestion functions.
function startGame() {
  startBtn.classList.add("hide");
  welcome.classList.add("hide");
  questionContainer.classList.remove("hide");
  randomQuestion = questions.sort(() => Math.random() - 0.5);
  randomQuestionIndex = 0;
  countDown();
  nextQuestion();
}

// calls the showQuestion and resetState functions.
function nextQuestion() {
  while (questionContainer.children[2]) {
    questionContainer.removeChild(questionContainer.children[2]);
  }
  showQuestion(randomQuestion[randomQuestionIndex]);
  resetState();
}

// places the question text inside of the question container.
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

// resets the question container so the 'Next' button is hidden and removes the original buttons with the removeChild method.
function resetState() {
  nextBtn.classList.add("hide");
}

// initiates the 'Next' button, or decrements the time by 7 seconds.
function selectAnswer(event) {
  const pressedButton = event.target;
  const correct = pressedButton.dataset.correct;
  if (correct) {
    userScore++;
    score();
    nextBtn.classList.remove("hide");
    const displayCorrect = document.createElement("h3");
    displayCorrect.textContent = "You are Correct!";
    displayCorrect.classList.add("question");
    questionContainer.appendChild(displayCorrect);
  } else if (secondsLeft > 7) {
    secondsLeft -= 7;
  } else {
    secondsLeft -= 7;
    timeBox.textContent = "GAME OVER";
    gameOver();
  }
}

// controls displaying and updating the score.
function score() {
  scoreBox.textContent = "Score: " + userScore;
}

// controls counting down the time and displaying the time left as well as calling the gameOver function once the timer has reached 0.
function countDown() {
  var timerInterval = setInterval(function () {
    if (secondsLeft > 0) {
      secondsLeft--;
      timeBox.textContent = "Time Left: " + secondsLeft;
    }
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      gameOver();
      resetState();
    }
  }, 1000);
}
// game over functions. hides question element and answer buttons. grabs the endMessage out of hiding.
function gameOver() {
  finalScore.textContent = userScore;
  questionElement.classList.add("hide");
  endMessage.classList.remove("hide");
  while (questionContainer.children[2]) {
    questionContainer.removeChild(questionContainer.children[2]);
  }
}

// high score function to display the users name and highscore.
function highScore() {
  endMessage.classList.add("hide");
  highScoresPage.classList.remove("hide");
  var userName = document.querySelector("#input").value;
  var userScores = document.createElement("li");
  userScores.classList.add("li");
  userScores.textContent =
    "Name: " + userName + " " + "|" + " " + "Highscore:" + " " + userScore;
  highScoresPage.append(userScores);
  const userInfo = {
    name: userName,
    score: userScore,
  };
  localStorage.setItem("score", JSON.stringify(userInfo));
}
