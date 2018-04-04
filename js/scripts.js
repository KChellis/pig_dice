function Player(name){
  this.name = name
  this.turnScore = 0
  this.totalScore = 0
}
function dieRoll(){
  var roll = Math.floor(Math.random() * 6) + 1;
  return roll;
}
