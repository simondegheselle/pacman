import {
  WAITING,
  COUNTDOWN,
  PAUSE,
  PLAYING,
  EATEN_PAUSE,
  DYING,
  Pacman,
  KEY,
} from './constants.js';

import GameMechanics from './game-mechanics';

class Game extends GameMechanics {

  constructor(wrapper) {
    super(wrapper);
    this.ghosts = [];
    this.ghostColors = ['#00FFDE', '#FF0000', '#FFB8DE', '#FFB847'];
    this.eatenCount = 0;
    this.level = 0;
    this.ghostPos = null;
    this.playerPos = null;
    this.timerStart = null;
    this.map = null;
    this.player = null;
    this.init(wrapper);
    this.initialize();
  }

  keyDown(ev) {
    if (ev.keyCode === KEY.N) {
      this.startNewGame();
    } else if (ev.keyCode === KEY.P && this.state === STATES.PAUSE) {
      this.map.draw(this.ctx);
      this.setState(this.stored);
    } else if (ev.keyCode === KEY.P) {
      this.stored = this.state;
      this.setState(STATES.PAUSE);
      this.map.draw(this.ctx);
      this.dialog('Paused');
    } else if (this.state !== STATES.PAUSE) {
      return this.player.keyDown(ev);
    }
    return true;
  }

  collided(player, ghost) {
    return Math.sqrt(Math.pow(ghost.x - player.x, 2)
      + Math.pow(ghost.y - player.y, 2)) < 10;
  }

  drawMap() {
    this.map.initMap();
    this.map.draw(this.ctx);
  }

  mainLoop() {
    let diff;

    if (this.state !== PAUSE) {
      ++this.tick;
    }

    this.map.drawPills(this.ctx);

    if (this.state === PLAYING) {
      this.mainDraw();
    } else if (this.state === WAITING && this.stateChanged) {
      this.stateChanged = false;
      this.map.draw(this.ctx);
      this.dialog('Press N to start a New game');
    } else if (this.state === EATEN_PAUSE &&
      (this.tick - this.timerStart) > (Pacman.FPS / 3)) {
      this.map.draw(this.ctx);
      this.setState(PLAYING);
    } else if (this.state === DYING) {
      if (this.tick - this.timerStart > (Pacman.FPS * 2)) {
        this.loseLife();
      } else {
        this.redrawBlock(this.userPos);
        for (let i = 0; i < this.ghosts.length; i += 1) {
          this.redrawBlock(this.ghostPos[i].old);
          this.ghostPos.push(this.ghosts[i].draw(this.ctx));
        }
        this.player.drawDead(this.ctx, (this.tick - this.timerStart) / (Pacman.FPS * 2));
      }
    } else if (this.state === COUNTDOWN) {

      diff = 5 + Math.floor((this.timerStart - this.tick) / Pacman.FPS);

      if (diff === 0) {
        this.map.draw(this.ctx);
        this.setState(PLAYING);
      } else {
        if (diff !== this.lastTime) {
          this.lastTime = diff;
          this.map.draw(this.ctx);
          this.dialog('Starting in: ' + diff);
        }
      }
    }

    this.drawFooter();
  }

  eatenPill() {
    this.timerStart = this.tick;
    this.eatenCount = 0;
    for (let i = 0; i < this.ghosts.length; i += 1) {
      this.ghosts[i].makeEatable(this.ctx);
    }
  }
}

window.Game = Game;

export default Game;