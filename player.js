Player.prototype.reset = function() {
  this.score = 0;
  this.lives = 3;
  this.eaten = 0;
  this.resetPlayerPosition();
};

Player.prototype.newLevel = function() {
  this.eaten = 0;
  this.resetPlayerPosition();
};

Player.prototype.resetPlayerPosition = function() {
  this.position = {
    x: 90,
    y: 120,
  };
  this.direction = DIRECTIONS.LEFT;
  this.due = DIRECTIONS.LEFT;
};

Player.prototype.loseLife = function (){
  this.lives -= 1;
}
