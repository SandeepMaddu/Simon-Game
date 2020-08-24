buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;
var start = true;
var fail = false;
var gameon = false;

$(document).keypress(function () {
  if (start || fail) {
    nextSequence();
    start = false;
    fail = false;
  }
});

function nextSequence() {
  level++;
  gameon = true;
  $("#level-title").text("Level " + level);
  // console.log(" next seq game : " + gamePattern);
  // console.log("next seq user : " + userClickedPattern);
  var number = Math.floor(Math.random() * 4);
  randomChoosenColor = buttonColors[number];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor)
    .fadeOut()
    .fadeIn();
  var audio = new Audio("sounds/" + randomChoosenColor + ".mp3");
  audio.play();

  userClickedPattern = [];
  // console.log(" next seq after push game : " + gamePattern);
  // console.log("next seq after push user : " + userClickedPattern);
}

$(".btn").on("click", function () {
  if (gameon) {
    var userChosenColor = this.id;
    $("#" + userChosenColor).addClass("pressed");
    setTimeout(function () {
      $("#" + userChosenColor).removeClass("pressed");
    }, 100);
    userClickedPattern.push(userChosenColor);
    // console.log(" on click game : " + gamePattern);
    // console.log("on click user : " + userClickedPattern);
    var l1 = userClickedPattern.length;
    var l2 = gamePattern.length;
    if (userClickedPattern[l1 - 1] === gamePattern[l1 - 1]) {
      var audio1 = new Audio("sounds/" + userClickedPattern[l1 - 1] + ".mp3");
      audio1.play();
      if (l1 === l2) {
        console.log("test");
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      var audio1 = new Audio("sounds/wrong.mp3");
      audio1.play();
      $("#level-title").text(
        "Oops! Game Over. your score : " +
          (level - 1) +
          " Try Again by pressing any Key"
      );
      $("#level-title").css("font-size", "1.5rem");
      level = 0;
      gamePattern = [];
      fail = true;
      return;
    }
  }
});
