function displayScores() {
  var scores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  scores.sort(function (a, b) {
    return b.score - a.score;
  });

  scores.forEach(function (score) {
    var li = document.createElement("li");
    li.textContent = score.initials + " - " + score.score;
    var ol = document.getElementById("highscores");
    ol.appendChild(li);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

displayScores();
