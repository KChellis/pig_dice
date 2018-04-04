//set global variables
var player1;
var player2;
var choice;
var name;
var totalScore;
var winScore = 20;
var apTotal = activePlayer.totalScore;
var apTurn = activePlayer.turnScore;
function Player(name){ //player object constructor
  this.name = name;
  this.turnScore = 0;
  this.totalScore = 0;
  this.roll = 0
}
 Player.prototype.dieRoll = function(){ //player die roll, rolls a value from 1 to 6
  this.roll = Math.floor(Math.random() * 6) + 1;
  return this.roll;
} //end of die roll
Player.prototype.storeRoll = function(){ //add the roll to the current turn score
  this.turnScore += this.roll;
  this.roll = 0 //set the roll back to 0 so it doesn't accumulate
  return this.turnScore;
} //end of storeRoll
Player.prototype.checkRoll = function(){ //checks to see if the player rolled a 1 and sets the turn score to 0 if so
  if (this.roll === 1) {
    this.turnScore = 0
    return false;
  }else{
    this.storeRoll();
    return true
  }
} //end of checkRoll
Player.prototype.endTurn = function(){ //ends the player's turn by adding the turn score to the total score
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  return this.totalScore;
} //end of end turn


function computerTurn (){ //simple AI that will roll the die 3 times, unless one of those rolls is a one
  for (var i = 0; i < 3; i++) {
    activePlayer.dieRoll();
    var check = activePlayer.checkRoll();
    if (!check) {
      i = 3;
    }

  }
  activePlayer.endTurn();
  return apTotal;
} //end of computerTurn

function computerTurnHard () {
  var rollAgain;
  for (var i = 0; i < 100; i++) {

    activePlayer.dieRoll();
    var check = activePlayer.checkRoll();

    if (apTotal < 70 && apTurn >= 20) {
      i = 100;
    } else if (passivePlayer.totalScore < 50 && apTurn >= 10) {
      i = 100;
    }  else if (apTotal + apTurn >= winScore){
      i = 100;
    }
  }
}

//front end
$(function() {
  $(".gameType").click(function() { //choose to play with a friend or the computer
    choice = $(this).val();
    if ( choice === "computer") {
      player2= new Player ("HAL 9000") //create a new player object for the computer
      $(".computer").show();
      name = "#name"
    }else {
      $(".human").show();
      name = "#name1"
    }
    $("#choices").hide();
    $("#game").show();
  })
  $(".playerName").submit(function(event) { //submit the player names
    event.preventDefault();
    player1 = new Player($(name).val()); //create a player object for player1
    if ( choice !== "computer") {
      player2 = new Player($("#name2").val()); //create a player object for player2 if they are not s computer
    }
    var activePlayer = player1;
    var passivePlayer = player2;
    $(".p1").prepend(activePlayer.name);
    $(".p2").prepend(passivePlayer.name);
    $("#hidden-game").show();
    $(".playerName").hide();
    $("#totalScore1").text(apTotal);
    $("#totalScore2").text(passivePlayer.totalScore);
    $(".active").text(activePlayer.name);
    $(".option").click(function(){ //handles the choice of rolling or holding player score
      if (activePlayer === player1) {
        totalScore = "#totalScore1";
      } else {
        totalScore = "#totalScore2";
      }
      if($(this).val()=== "roll") { //handles if the player chooses to roll
        activePlayer.dieRoll();
        $("#runningScore").prepend("<li>" + activePlayer.roll + "</li>");
        $("#roll").text(activePlayer.roll);
        var check = activePlayer.checkRoll();
        $(".turnScore").text(apTurn);
        $("#firstRoll").show();
        if (!check) {
          activePlayer.endTurn();
          $("#runningScore").text("");
          $("#runningScore").prepend("<li>Total: <span class ='turnScore'></span></li>");
          $(totalScore).text(apTotal);
          $("#roll1").show();
          $("#nextTurn").show();
          $("#turn").hide();
        }
      }else if ($(this).val()=== "hold") { //handles if the player chooses to hold
        activePlayer.endTurn();
        if (apTotal >= winScore) { //checks active player's score to see if they win
          $("#endGame").show();
          $("#game").hide();
        }
        $(totalScore).text(apTotal);
        $("#endTurn").show();
        $("#nextTurn").show();
        $("#turn").hide();
      }else if ($(this).val()=== "computer") { //handles computer's turn
        $("#nextTurn").show();
        $("#turn").hide();
        $("#hal").hide();
        computerTurn();
        $(totalScore).text(apTotal);
        if (apTotal >= winScore) { //checks active player's score to see if they win
          $("#endGame").show();
          $("#game").hide();
        }
      }

    });
    $("#nextTurn").click(function() { //changes the active player
      if (choice === "computer" && activePlayer === player1) {
        $("#endTurn").hide();
        $("#nextTurn").hide();
        $("#roll1").hide();
        $("#turn").hide();
        $("#firstRoll").hide();
        $("#hal").show();
      }else {
        $("#endTurn").hide();
        $("#nextTurn").hide();
        $("#roll1").hide();
        $("#turn").show();
        $("#firstRoll").hide();
      }
      var temp =activePlayer;
      activePlayer=passivePlayer;
      passivePlayer = temp;
      $(".active").text(activePlayer.name);
    });
    $("#newGame").click(function(){ //starts a new game
      location.reload();
    });
  });
});
