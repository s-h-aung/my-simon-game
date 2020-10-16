var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var clickPattern = [];
var level = 0;
var start = false;


$(document).on("keypress", function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    start = true;
    nextSequence();
  }
});

$(".btn").on("click", function() {
  if (start) {
    var chosenBtn = this.id;
    clickPattern.push(chosenBtn);
    animatePress(chosenBtn);
    makeSound(chosenBtn);

    if (checkAnswer(clickPattern.length - 1)) {
      if (clickPattern.length == gamePattern.length) {
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }
    }
    else
      gameOver();
  }
});

function restart() {
  start = false;
  gamePattern = [];
  clickPattern = [];
  level = 0;
}

function nextSequence() {
  var code = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[code];

  level++;
  $("#level-title").text("Level " + level);
  gamePattern.push(randomChosenColor);
  makeFlash(randomChosenColor);
  makeSound(randomChosenColor);
  clickPattern = [];
}

function checkAnswer(idx) {
  if (gamePattern[idx] == clickPattern[idx])
    return true;
  else
    return false;
}

function gameOver() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Game Over. Press Any Key to Restart");
  new Audio("sounds/wrong.mp3").play();
  restart();
}

function makeFlash(btn) {
  $("." + btn).fadeIn(100).fadeOut(100).fadeIn(100);
}

function makeSound(btn) {
  new Audio("sounds/" + btn + ".mp3").play();
}

function animatePress(btn) {
  $("." + btn).addClass("pressed");
  setTimeout(function() {
    $("." + btn).removeClass("pressed");
  }, 100);
}
