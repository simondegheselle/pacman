/*
  GAME API
  setState: een state instellen: WAITING, COUNTDOWN, PAUSE, PLAYING, EATEN_PAUSE, DYING
  startLevel: start een nieuw level
*/

/*
  de state van het game wordt op WAITING gezet
  het level van het game wordt geïnitialiseerd op level 1
  het player object van het game wordt gereset (terug op de begin positie plaatsen)
  de map wordt geïnitialiseerd
  de map wordt getekend
  het level van het spel wordt gestart
*/
Game.startNewGame = function() {
  this.setState(STATES.WAITING);
  this.level = 1;
  this.player.reset();
  this.map.initMap();
  this.map.draw(this.ctx);
  this.startLevel();
}

/*
  player moet een nieuw level starten, hierdoor wordt de player terug op zijn begin positie gezet
  ook elke ghost die tot het game behoort moet gereset worden, we moeten hiervoor de array van ghosts overlopen (for loop of while loop)
  de state van het game mag op COUNTDOWN gezet worden --> we gaan beginnen aftellen
*/
Game.startLevel = function() {
  this.player.newLevel();
  for (let i = 0; i < this.ghosts.length; i++) {
    this.ghosts[i].reset();
  }
  this.timerStart = this.tick;
  this.setState(STATES.COUNTDOWN);
}

/*
  loseLife: je verliest een leven, je bent opgegeten door een ghost
  laat aan de speler weten dat hij een leven moet verliezen (attribuut leven van speler moet met 1 verminderen)
  als de speler nog levens heeft mag er een nieuw level gestart worden
*/
Game.loseLife = function() {
  this.setState(STATES.WAITING);
  this.player.loseLife();
  if (this.player.getLives() > 0) {
    this.startLevel();
  }
}

/*
  completedLevel()
  de waiting state wordt opnieuw getoond
  het spel stijgt naar het volgend level
  de map wordt opnieuw gereset
  en de speler wordt gereset door newLevel aan te roepen
  het level wordt gestart door de methode startLevel op te roepen
*/
Game.completedLevel = function() {
  this.setState(STATES.WAITING);
  this.level += 1;
  this.map.reset();
  this.player.newLevel();
  this.startLevel();
}