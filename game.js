var buttonColors = ['red','blue','green','yellow'];
var gamePatterns = [];
var userClickedPattern = [];

//2. Create a new variable called level and start at level 0.
var level =0;

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

$(".btn").click(function(){
    var userChosenColor =$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on("keydown",function(event){
    if (!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
})


function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePatterns[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePatterns.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound('wrong');

      $('body').addClass("game-over");

      setTimeout(function(){
          $('body').removeClass("game-over");
      },200);

      $('#level-title').text("Game Over, Press Any Key to Restart");
      startOver();

    }

}



function nextSequence(){
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePatterns.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}


function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function (){
        $("#"+color).removeClass("pressed")
    },100)
}



/**  External Function for click Event
function handler(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    console.log(userClickedPattern);
} */

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    gamePatterns=[];
    userClickedPattern=[];
    started = false;
    level=0;
}

// document.querySelector("h1").style.color='orange';
// $("h1").css('color','orange');

