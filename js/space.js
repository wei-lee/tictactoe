var Space = function(x, y){
  this.posX = x;
  this.posY = y;
  this.isTaken = false;
  this.player = null;
};

Space.prototype.takenBy = function(player){
  if(!this.isTaken){
    this.isTaken = true;
    this.player = player;
  } else {
    alert('You can not take this space');
  }
};

Space.prototype.samePlayer = function(other){
  return this.player && other.player && this.player.type === other.player.type;
};