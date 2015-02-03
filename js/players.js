var Players = function(){
  this.players = [];
  this.currentPlayer = -1;
};

Players.prototype.addPlayer = function(player){
  if(this.players.length === 2){
    alert('Can not join the game');
  } else {
    this.players.push(player);
  }
};

Players.prototype.next = function(){
  if(this.currentPlayer === -1){
    this.currentPlayer = 0;
  } else {
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }
  return this.players[this.currentPlayer];
};