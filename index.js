
var buttonColors=["red","green","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(".btn").click(function(){
    if(started===true)
    {
        var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
    }
    else
    {
        nextSequence();
        started=true;
    }
});

function checkAnswer(index)
{
    if(gamePattern[index]===userClickedPattern[index])
    {
        if(gamePattern.length===userClickedPattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        $(".heading").text("Game Over, Press Any Key to Restart Or Click On Any Button...");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        level=0;
        started=false;
        gamePattern=[];
    }
}


function nextSequence()
{
    userClickedPattern=[];
    var randomNumber=Math.random();
    randomNumber=Math.floor(randomNumber*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("."+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    $(".heading").text("Level "+level);
    level++;
}

$(document).keypress(function(){
    if(started===false)
    {
        nextSequence();
        started=true;
    }
});
function playSound(color)
{
    var Sound="sounds/"+color+".mp3";
    var audio=new Audio(Sound);
    audio.play();
}

function animatePress(color)
{
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}

