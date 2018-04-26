// ADD FUCNTIONS TO IMPLEMENT

Player.reset = function() {
  this.score = 0;
  this.lives = 3;
  this.eaten = 0;
  this.resetPlayerPosition();
};

Player.newLevel = function() {
  this.eaten = 0;
  this.resetPlayerPosition();
};

Player.resetPlayerPosition = function() {
  this.position = {
    x: 90,
    y: 120,
  };
  this.direction = DIRECTIONS.LEFT;
  this.due = DIRECTIONS.LEFT;
};

Player.loseLife() = function (){
  this.lives -= 1;
}
