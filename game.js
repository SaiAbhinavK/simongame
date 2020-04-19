// VARIABLES
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var notStarted = true;

// GENERATING SEQUENCE
function nextSequence() {
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  // console.log(gamePattern);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").html("Level " + level);

}
// USER INPUTS OR PATTERNS
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animateButton(userChosenColor);
  checkAnswer(userClickedPattern.length-1);

});

// PLAYING SOUND
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// BUTTON ANIMATION
function animateButton(currentColor) {
  $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
  }

// KEYBOARD EVENT

$(document).keydown(function(){
  if(notStarted){
      // $("#level-title").text("Level " + level);
  nextSequence();
notStarted=false;
}
});
// USERS ANSWERS

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    // console.log("success");
    if (userClickedPattern.length===gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{

      var wrong= new Audio("sounds/wrong.mp3");
      wrong.play();
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("#level-title").html("Game over , Press any key to restart");
      startOver();
  }
}

function startOver(){
level=0;
gamePattern=[];
notStarted=true;


}
