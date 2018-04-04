var player1;
var player2;
var choice;
var name;
var score;
var winScore = 20;
function Player(name){
  this.name = name;
  this.turnScore = 0;
  this.totalScore = 0;
  this.roll = 0
}
 Player.prototype.dieRoll = function(){
  this.roll = Math.floor(Math.random() * 6) + 1;
  return this.roll;
}
Player.prototype.storeRoll = function(){
  this.turnScore += this.roll;
  this.roll = 0
  return this.turnScore;
}
Player.prototype.checkRoll = function(){
  if (this.roll === 1) {
    this.turnScore = 0
    return false;
  }else{
    this.storeRoll();
    return true
  }
}
Player.prototype.endTurn = function(){
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  return this.totalScore;
}


function computerTurn (){
  for (var i = 0; i < 3; i++) {
    player2.dieRoll();
    console.log(player2.roll);
    var check = player2.checkRoll();
    if (!check) {
      i = 3;
    }

  }
  player2.endTurn();
  return player2.totalScore;
}

$(function() {
  $(".gameType").click(function() {
    // debugger;
    choice = $(this).val();
    if ( choice === "computer") {
      player2= new Player ("HAL 9000")
      $(".computer").show();
      name = "#name"
    }else {
      $(".human").show();
      name = "#name1"
    }
    $("#choices").hide();
    $("#game").show();
  })
  $(".playerName").submit(function(event) {
    event.preventDefault();
    player1 = new Player($(name).val());
    if ( choice !== "computer") {
      player2 = new Player($("#name2").val());
    }
    var activePlayer = player1;
    var passivePlayer = player2;
    $(".active").prepend(activePlayer.name);
    $("#passive").prepend(passivePlayer.name);
    $("#hidden-game").show();
    $(".playerName").hide();
    $("#totalScore1").text(activePlayer.totalScore);
    $("#totalScore2").text(passivePlayer.totalScore);
    $(".option").click(function(){
      if($(this).val()=== "roll") {
        activePlayer.dieRoll();
        $("#roll").text(activePlayer.roll);
        var check = activePlayer.checkRoll();
        $("#turnScore").text(activePlayer.turnScore);
        $("#firstRoll").show();
        if (!check) {
          activePlayer.endTurn();
          $("#totalScore1").text(activePlayer.totalScore);
          $("#roll1").show();
          $("#nextTurn").show();
          $("#turn").hide();
        }
      }else if ($(this).val()=== "hold") {
        activePlayer.endTurn();
        if (activePlayer.totalScore >= winScore) {
          $("#endGame").show();
          $("#game").hide();
        }
        $("#totalScore1").text(activePlayer.totalScore);
        $("#endTurn").show();
        $("#nextTurn").show();
        $("#turn").hide();
      }else if ($(this).val()=== "computer") {
        $("#nextTurn").show();
        $("#turn").hide();
        $("#hal").hide();
        computerTurn();
        $("#totalScore1").text(activePlayer.totalScore);
        if (activePlayer.totalScore >= winScore) {
          $("#endGame").show();
          $("#game").hide();
        }
      }

    });
    $("#nextTurn").click(function() {
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
      $("#passive").text(passivePlayer.name);
      $("#totalScore1").text(activePlayer.totalScore);
      $("#totalScore2").text(passivePlayer.totalScore);
    });
    $("#newGame").click(function(){
      location.reload();
    });
  });
});
