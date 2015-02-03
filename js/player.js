var Player = function(type, grid){
  this.type = type;
  this.allowedToPlay = false;
  this.grid = grid;
};

Player.prototype.alowToPlay = function(){
  this.allowedToPlay = true;
};

Player.prototype.notAllowToPlay = function(){
  this.allowedToPlay = false;
};

Player.prototype.move = function(cb){
  if(this.allowedToPlay){
    $('#grid').on('click', 'td.space', function(e){
      e.preventDefault();
      $('#grid').off('click');
      var data = $(e.target).data();
      cb(data.spacex, data.spacey);
    });
  }
};

Player.prototype.win = function(){
  alert('Player ' + this.type + ' win');
};

AIPlayer.prototype = new Player();
AIPlayer.prototype.constructor = AIPlayer;

function AIPlayer(type, grid){
  this.type = type;
  this.grid = grid;
}

AIPlayer.prototype.move = function(cb){
  if(this.allowedToPlay){
    var x = 0; y=0;
    var space = this.grid.select(x, y);
    while(space.isTaken){
      x = getRandomInt(0, 2);
      y = getRandomInt(0, 2);
      space = this.grid.select(x, y);
    }
    return cb(x, y);
  }
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}