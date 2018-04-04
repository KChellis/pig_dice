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

var computer = new Player('Hal 9000');

function computerTurn (){
  for (var i = 0; i < 3; i++) {
    computer.dieRoll();
    var check = computer.checkRoll();
    if (!check) {
      i = 3;
    }

  }
  computer.endTurn();
  return computer.totalScore;
}

$(function() {
  $(".playerName").submit(function(event) {
    event.preventDefault();
    var player1 = new Player($(".name1").val());
    var player2 = new Player($("#name2").val());
    var activePlayer = player1;
    var passivePlayer = player2;
    $(".active").prepend(activePlayer.name);
    $("#passive").prepend(passivePlayer.name);
    $("#hidden-game").show();
    $("#playerName").hide();
    $("#totalScore").text(activePlayer.totalScore);
    $(".option").click(function(){
      if($(this).val()=== "roll") {
        activePlayer.dieRoll();
        $("#roll").text(activePlayer.roll);
        var check = activePlayer.checkRoll();
        $("#turnScore").text(activePlayer.turnScore);
        $("#firstRoll").show();
        if (!check) {
          activePlayer.endTurn();
          $("#totalScore").text(activePlayer.totalScore);
          $("#roll1").show();
          $("#nextTurn").show();
          $("#turn").hide();
        }
      }else if ($(this).val()=== "hold") {
        activePlayer.endTurn();
        if (activePlayer.totalScore >= 20) {
          $("#endGame").show();
          $("#game").hide();
        }
        $("#totalScore").text(activePlayer.totalScore);
        $("#endTurn").show();
        $("#nextTurn").show();
        $("#turn").hide();
      }
    });
    $("#nextTurn").click(function() {
      $("#endTurn").hide();
      $("#nextTurn").hide();
      $("#roll1").hide();
      $("#turn").show();
      $("#firstRoll").hide();
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
