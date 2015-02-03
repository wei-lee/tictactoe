var Grid = function(dimension){
  this.dimension = dimension;
  this.spaces = {};
  for(var i=0;i<this.dimension;i++){
    for(var j=0;j<this.dimension;j++){
      var idx = this.buildIdx(i,j);
      this.spaces[idx] = new Space(i, j);
    }
  }
};

Grid.prototype.buildIdx = function(x,y){
  return x+'_'+y;
};

Grid.prototype.select = function(x, y){
  var idx = this.buildIdx(x, y);
  var space = this.spaces[idx];
  return space;
};

Grid.prototype.hasMore = function(){
  var hasEmpty = false;
  for(var key in this.spaces){
    if(!this.spaces[key].isTaken){
      hasEmpty = true;
      break;
    }
  }
  return hasEmpty;
};

Grid.prototype.isAvailable = function(x, y){
  var space = this.select(x, y);
  return space.isTaken;
};

Grid.prototype.findMatch = function(space){
  var x = space.posX;
  var y = space.posY;
  var xMatch = true;
  var idx,tmp;
  for(var i=0;i<this.dimension;i++){
    idx = this.buildIdx(x, i);
    tmp = this.spaces[idx];
    if(!tmp.samePlayer(space)){
      xMatch = false;
      break;
    }
  }
  if(xMatch){
    return true;
  }

  if(!xMatch){
    var yMatch = true;
    for(var j=0;j<this.dimension;j++){
      idx = this.buildIdx(j, y);
      tmp = this.spaces[idx];
      if(!tmp.samePlayer(space)){
        yMatch = false;
        break;
      }
    }

    if(yMatch){
      return true;
    }

    if(x !== y && (x+y) !== this.dimension -1){
      return false;
    } else {
      var matchFound = true;
      for(var k=0;k<this.dimension;k++){
        idx = this.buildIdx(k, k);
        tmp = this.spaces[idx];
        if(!tmp.samePlayer(space)){
          matchFound = false;
          break;
        }
      }
      if(matchFound){
        return true;
      } else {
        matchFound = true;
        var s, e;
        for(s=0,e=this.dimension-1;s<this.dimension, e>=0;s++,e--){
          idx = this.buildIdx(s, e);
          tmp = this.spaces[idx];
          if(!tmp.samePlayer(space)){
            matchFound = false;
            break;
          }
        }
        if(matchFound){
          return true;
        } else {
          return false;
        }
      }
    }
  }
};