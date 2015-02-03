var TYPES = {
  O:'O',
  X:'X'
};
var Game = function(dimension){
  this.grid = new Grid(dimension || 3);
  var playerO = new Player(TYPES.O, this.grid);
  var playerX = new AIPlayer(TYPES.X, this.grid);
  this.players = new Players();
  this.players.addPlayer(playerO);
  this.players.addPlayer(playerX);
  this.currentPlayer = null;
  this.started = false;
  this.isOver = false;
  this.start();
};

Game.prototype.start = function(){
  var self = this;
  this.started = true;
  this.currentPlayer = this.players.next();
  var cb = function(x, y){
    if(self.isOver){
      alert('Game over');
      return;
    }
    var space = self.grid.select(x, y);
    if(space.isTaken){
      alert('This space is already taken');
      return;
    } else {
      space.takenBy(self.currentPlayer);
      $('#space_' + x + '_' +y).text(self.currentPlayer.type);
      if(self.grid.findMatch(space)){
        self.currentPlayer.win();
        self.gameOver();
        return;
      } else {
        if(!self.grid.hasMore()){
          alert("It's a draw. Game over");
          self.gameOver();
        } else {
          self.currentPlayer.notAllowToPlay();
          self.currentPlayer = self.players.next();
          self.currentPlayer.alowToPlay();
          self.currentPlayer.move(cb);
        }
      }
    }
  };
  this.currentPlayer.alowToPlay();
  this.currentPlayer.move(cb);
};

Game.prototype.gameOver = function(){
  this.isOver = true;
  this.currentPlayer = null;
};

Game.prototype.drawGrid = function(el){
  var self = this;
  var parentTable = $('<table>');
  for(var i=0;i<this.grid.dimension;i++){
    var tr = $('<tr>').addClass('row');
    for(var j=0;j<this.grid.dimension;j++){
      var td = $('<td>', {id:'space_'+i+'_'+j}).addClass('space').data({spacex:i, spacey:j});
      tr.append(td);
    }
    parentTable.append(tr);
  }
  el.html(parentTable);
};