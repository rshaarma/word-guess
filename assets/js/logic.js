var totalTime = 75;
var currentQuestion = 0;
var timerState;
var timer = document.querySelector("#time");
var startButton = document.querySelector("#start");
var questionsDiv = document.querySelector("#questions");
var choicesDiv = document.querySelector("#choices");
var submitButton = document.querySelector("#submit");
var nameInitials = document.querySelector("#initials");
var feedbackDiv = document.querySelector("#feedback");

function startQuiz() {
  var startScreenDiv = document.getElementById("start-screen");
  startScreenDiv.setAttribute("class", "hide");
  questionsDiv.removeAttribute("class");
  timerState = setInterval(clock, 1000);
  timer.textContent = totalTime;
  displayQuestions();
}

function displayQuestions() {
  var question = questions[currentQuestion];
  var questionTitleH2 = document.getElementById("question-title");
  questionTitleH2.textContent = question.title;
  choicesDiv.innerHTML = "";
  question.choices.forEach(function (choice, index) {
    var choices = document.createElement("button");
    choices.setAttribute("class", "choice");
    choices.setAttribute("value", choice);
    choices.textContent = index + 1 + ". " + choice;
    choices.onclick = choicePicked;
    choicesDiv.appendChild(choices);
  });
}
function clock() {
  totalTime--;
  timer.textContent = totalTime;
  if (totalTime <= 0) {
    endQuiz();
  }
}

function choicePicked() {
  if (this.value !== questions[currentQuestion].answer) {
    totalTime -= 10;
    if (totalTime < 0) {
      totalTime = 0;
    }
    timer.textContent = totalTime;
    feedbackDiv.textContent = "Wrong!";
  } else {
    feedbackDiv.textContent = "Correct!";
  }

  feedbackDiv.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackDiv.setAttribute("class", "feedback hide");
  }, 1000);
  currentQuestion++;
  if (currentQuestion === questions.length) {
    endQuiz();
  } else {
    displayQuestions();
  }
}

function endQuiz() {
  clearInterval(timerState);
  var endScreenDiv = document.getElementById("end-screen");
  endScreenDiv.removeAttribute("class");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = totalTime;
  questionsDiv.setAttribute("class", "hide");
}

function saveScores() {
  var name = nameInitials.value.trim();
  if (name !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: totalTime,
      initials: name,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}

function captureEnterKey(event) {
  if (event.key === "Enter") {
    saveScores();
  }
}

nameInitials.onkeyup = captureEnterKey;
submitButton.onclick = saveScores;
startButton.onclick = startQuiz;
