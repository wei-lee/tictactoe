var DIMENSION = 3;
$(document).ready(function(){
  var g = new Game(DIMENSION);
  g.drawGrid($('#grid'));
  $('#start').bind('click', function(){
    var d = new Game(DIMENSION);
    d.drawGrid($('#grid'));
  });
});