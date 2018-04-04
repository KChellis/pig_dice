function Player(name){
  this.name = name;
  this.turnScore = 0;
  this.totalScore = 0;
  this.roll = 0
}
var player1= new Player("Kristen");
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
    console.log(this.turnScore);
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
