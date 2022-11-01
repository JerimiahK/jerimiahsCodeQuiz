var timeBox = document.querySelector(".timebox");
var secondsLeft = 3;
var gameOver = document.querySelector(".over");

function countDown() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeBox.textContent = "Time Left: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      displayMessage();
    }
  }, 1000);
}

function displayMessage() {
  timeBox.textContent = "Game Over";
  gameOver.style.display = "block";
}

countDown();
